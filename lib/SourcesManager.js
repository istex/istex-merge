/* eslint-disable no-labels */

const _ = require('lodash');

class SourceManager {
  constructor () {
    this.docObjects = {};
    this.priorities = [];
  }

  setPriorities (priorities) {
    this.priorities = priorities;
  }

  getSources () {
    return Object.keys(this.docObjects);
  }

  getSourcesOrderedByPriority () {
    const sourcesOrderedByPriority = [];

    if (SourceManager.isNonEmptyArray(this.priorities)) {
      for (const priority of this.priorities) {
        if (this.getSources().includes(priority)) sourcesOrderedByPriority.push(priority);
      }
    }

    return sourcesOrderedByPriority;
  }

  hasSources () {
    return !_.isEmpty(this.getSources());
  }

  hasSource (source) {
    return SourceManager.isNonEmptyArray(this.docObjects[source]);
  }

  addSource (source, docObject) {
    if (!this.docObjects[source]) this.docObjects[source] = [];
    this.docObjects[source].push(docObject);
  }

  hasDocObjects (source) {
    return SourceManager.isNonEmptyArray(this.docObjects[source]);
  }

  getDocObjects (source) {
    if (!_.isArray(this.docObjects[source])) {
      return [];
    }

    return this.docObjects[source];
  }

  getPropertyOf (source, property) {
    for (const docObject of this.getDocObjects(source)) {
      const result = _.get(docObject, property);
      if (!_.isEmpty(result) || _.isBoolean(result) || _.isNumber(result)) return result;
    }
  }

  getProperty (property) {
    let result = [];

    for (const source in this.docObjects) {
      for (const docObject of this.getDocObjects(source)) {
        const data = _.get(docObject, property);
        if (_.isArray(data)) result = result.concat(data);
        else if (data) result.push(data);
      }
    }

    return result;
  }

  addOrcIdInAuthors (authors) {
    for (const currentAuthor of authors) {
      // If the current author already has an orcId or has no forename or no surname, go to the next author
      if (currentAuthor.orcId || _.get(currentAuthor, 'enrichments.orcId') || !currentAuthor.forename || !currentAuthor.surname) continue;
      sourcesLoop:
      for (const otherSource of this.getSourcesOrderedByPriority()) {
        for (const docObjectFromOtherSource of this.docObjects[otherSource]) {
          const authorsFromOtherSource = docObjectFromOtherSource.authors;
          // If there is no author in this source, go to the next source
          if (!authorsFromOtherSource) continue;
          // Get the authors from this source that have an orcId (the orcId can come from an enrichment)
          const authorsFromOtherSourceWithOrcId = _.filter(authorsFromOtherSource, author => author.orcId || _.get(author, 'enrichments.orcId'));
          // If the authors from this source don't have an orcId, go to the next source
          if (_.isEmpty(authorsFromOtherSourceWithOrcId)) continue;
          for (const authorFromOtherSourceWithOrcId of authorsFromOtherSourceWithOrcId) {
            // If the one of the authors from another source with an orcId is the same as our current author,
            // we inject the orcId of the author from the other source into the current author
            if (SourceManager.authorsEqual(authorFromOtherSourceWithOrcId, currentAuthor)) {
              // The orcId of the author from the other source can come from an enrichment
              currentAuthor.orcId = authorFromOtherSourceWithOrcId.orcId || authorFromOtherSourceWithOrcId.enrichments.orcId;
              break sourcesLoop;
            }
          }
        }
      }
    }
  }

  addRnsrInAuthors (authors) {
    for (const currentAuthor of authors) {
      // If the current author has no forename or no surname, go to the next author
      if (!currentAuthor.forename || !currentAuthor.surname) continue;

      for (const otherSource of this.getSourcesOrderedByPriority()) {
        for (const docObjectFromOtherSource of this.docObjects[otherSource]) {
          const authorsFromOtherSource = docObjectFromOtherSource.authors;
          // If there is no author in this source, go to the next source
          if (!authorsFromOtherSource) continue;
          // Get the authors from this source that have at least one affiliation with an RNSR
          const authorsFromOtherSourceThatHaveAffiliationsWithRnsr = _.filter(authorsFromOtherSource, author => {
            // Make sure the author has affiliations
            if (!SourceManager.isNonEmptyArray(author.affiliations)) return false;
            // Look for affiliations with an RNSR (the RNSR can come from an enrichment)
            for (const affiliation of author.affiliations) {
              if (SourceManager.isNonEmptyArray(affiliation.rnsr) || SourceManager.isNonEmptyArray(_.get(affiliation, 'enrichments.rnsr'))) {
                return true;
              }
            }
          });
          // If the authors from this source don't have affiliations with an RNSR, go to the next source
          if (_.isEmpty(authorsFromOtherSourceThatHaveAffiliationsWithRnsr)) continue;
          for (const authorFromOtherSourceThatHaveAffiliationsWithRnsr of authorsFromOtherSourceThatHaveAffiliationsWithRnsr) {
            // If the current author from the other source is not our current author, go to the next one
            if (!SourceManager.authorsEqual(authorFromOtherSourceThatHaveAffiliationsWithRnsr, currentAuthor)) continue;

            if (!currentAuthor.rnsr) currentAuthor.rnsr = [];
            for (const affiliation of authorFromOtherSourceThatHaveAffiliationsWithRnsr.affiliations) {
              if (SourceManager.isNonEmptyArray(affiliation.rnsr)) {
                currentAuthor.rnsr = currentAuthor.rnsr.concat(affiliation.rnsr);
              }
              const rnsrFromEnrichments = _.get(affiliation, 'enrichments.rnsr');
              if (SourceManager.isNonEmptyArray(rnsrFromEnrichments)) {
                currentAuthor.rnsr = currentAuthor.rnsr.concat(rnsrFromEnrichments);
              }
            }
            // If multiple sources give the same RNSR multiple times we want to remove the potential duplicates
            currentAuthor.rnsr = _.uniq(currentAuthor.rnsr);
          }
        }
      }
    }
  }

  merge (source, mapping) {
    const result = {
      data: {},
      properties: {},
    };
    let hasMergedData = false;

    for (const key in mapping) {
      if (mapping[key] === true) {
        const value = this.getPropertyOf(source, key);
        if (value != null) {
          // Special treatment for the authors
          if (key === 'authors') {
            this.addOrcIdInAuthors(value);
            this.addRnsrInAuthors(value);
          }
          result.properties[key] = source;
          _.set(result.data, key, value);
        }
      } else if (_.get(mapping[key], 'action') && _.isFunction(SourceManager.property[mapping[key].action])) {
        const value = SourceManager.property[mapping[key].action](this, key, mapping[key].id);
        if (value != null && !_.isEmpty(value)) {
          hasMergedData = true;
          _.set(result.data, mapping[key].path ? mapping[key].path : key, value);
          result.properties[key] = this.getSources();
        }
      } else {
        if (_.has(result, key)) _.set(result.data, key);
      }
    }
    if (hasMergedData) result.properties.sources = this.getSources();

    return result;
  }

  static authorsEqual (firstAuthor, secondAuthor) {
    const sanitizeName = (author) => {
      return (_.trim(author.forename) + _.trim(author.surname))
        .normalize('NFD') // We decompose combined graphemes into the combination of simple ones (è becomes e + `)
        .replace(/[\u0300-\u036f]/g, ''); // We remove every diacritic
    };

    return sanitizeName(firstAuthor) === sanitizeName(secondAuthor);
  }

  static isNonEmptyArray (array) {
    return _.isArray(array) && !_.isEmpty(array);
  }
}

SourceManager.property = {
  merge: (sourceManager, property, id) => {
    const data = sourceManager.getProperty(property);
    const check = {};
    const result = [];

    for (const d of data) {
      if (!id) {
        if (!_.isObject(d) && !result.includes(d)) result.push(d);
      } else if (_.isObject(d) && d[id] && !check[d[id]]) {
        check[d[id]] = true;
        result.push(d);
      }
    }

    return result;
  },
};

module.exports = SourceManager;
