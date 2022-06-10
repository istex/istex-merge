const { create } = require('xmlbuilder2');
const _ = require('lodash');
const { metadata } = require('corhal-config');

/**
 * Generates a Hal TEI from a merged document.
 * @param {object} mergedDocument The merged document generated by `generateMergedDocument`.
 * @param {object} options The options object passed to `xmlbuilder2`.
 * @returns {string} The XML string.
 */
function generateHalTei (mergedDocument, options) {
  // Throw an error if mergedDocument is not an object
  if (!_.isObject(mergedDocument)) throw new Error('mergedDocument needs to be an object');

  const xmlDoc = {};
  xmlDoc.TEI = {};

  // Set the root TEI node attributes
  xmlDoc.TEI['@xmlns'] = 'http://www.tei-c.org/ns/1.0';
  xmlDoc.TEI['@xmlns:hal'] = 'http://hal.archives-ouvertes.fr/';

  // Create the base <text> structure
  _.set(xmlDoc.TEI, 'text.body.listBibl.biblFull', {});
  const { biblFull } = xmlDoc.TEI.text.body.listBibl;

  // Create the <back> node
  xmlDoc.TEI.text.back = {};
  const { back } = xmlDoc.TEI.text;

  // Authors and their affiliations
  if (isNonEmptyArray(mergedDocument.authors)) {
    insertAuthors(biblFull, back, mergedDocument);
  }

  // Identifiers
  insertIdentifiers(biblFull, mergedDocument);

  // Titles
  if (_.isObject(mergedDocument.title)) {
    insertTitles(biblFull, mergedDocument);
  }

  // Language
  if (isNonEmptyArray(mergedDocument.language)) {
    insertLanguage(biblFull, mergedDocument);
  }

  // Classifications
  insertClassifications(biblFull, mergedDocument);

  // Abstract
  if (_.isObject(mergedDocument.abstract)) {
    insertAbstract(biblFull, mergedDocument);
  }

  // Catalog data
  insertCatalogData(biblFull, mergedDocument);

  // Meeting data
  if (_.get(mergedDocument, 'host.conference.name')) {
    insertMeetingData(biblFull, mergedDocument);
  }

  return create(xmlDoc).end(options);
}

/**
 * Inserts the titles from `mergedDocument` into `biblFull`.
 * @param {object} biblFull The <biblFull> node to insert the titles in.
 * @param {object} mergedDocument The merged document to get the titles from.
 */
function insertTitles (biblFull, mergedDocument) {
  // Initialize the title container
  setIfNotExists(biblFull, 'titleStmt.title', []);
  setIfNotExists(biblFull, 'sourceDesc.biblStruct.monogr.title', []);

  const titles = biblFull.titleStmt.title;
  const monogrTitles = biblFull.sourceDesc.biblStruct.monogr.title;

  // English title
  if (_.get(mergedDocument, 'title.en')) {
    titles.push({ '@xml:lang': 'en', '#': mergedDocument.title.en });
  }

  // French title
  if (_.get(mergedDocument, 'title.fr')) {
    titles.push({ '@xml:lang': 'fr', '#': mergedDocument.title.fr });
  }

  // Host title
  if (_.get(mergedDocument, 'host.title')) {
    const genre = mergedDocument.genre || _.get(mergedDocument, 'business.duplicateGenre');

    if (genre) {
      const genreLowerCase = genre.toLowerCase();

      let level; // Hal identifers for genres
      if (genreLowerCase === 'article') level = 'j';
      else if (genreLowerCase === 'ouvrage' || genreLowerCase === 'chapitre') level = 'm';

      if (level) monogrTitles.push({ '@level': level, '#': mergedDocument.host.title });
    }
  }

  // Meeting title
  if (_.get(mergedDocument, 'host.conference.name')) {
    monogrTitles.push({ '@level': 'm', '#': mergedDocument.host.conference.name });
  }

  // The title is repeated under <sourceDesc>
  _.set(biblFull, 'sourceDesc.biblStruct.analytic.title', titles);
}

/**
 * Inserts the affiliations from `mergedDocument` into `back`.
 * @param {object} back The <back> node to insert the affiliations in.
 * @param {object} mergedDocument The merged document to get the affiliations from.
 */
function insertAffiliations (back, mergedDocument) {
  setIfNotExists(back, 'listOrg', { '@type': 'structures' });
  setIfNotExists(back.listOrg, 'org', []);

  // Combine the RNSR codes of all authors in an array
  let rnsrCodesFromAllAuthors = [];
  mergedDocument.authors.forEach(author => {
    if (!isNonEmptyArray(author.rnsr)) return;

    rnsrCodesFromAllAuthors = rnsrCodesFromAllAuthors.concat(author.rnsr);
  });

  // Remove the potential duplicates (happens if multiple authors have the same affiliation)
  rnsrCodesFromAllAuthors = _.uniq(rnsrCodesFromAllAuthors);

  // Insert an affiliation for each RNSR code in the <listOrg> node
  rnsrCodesFromAllAuthors.forEach((rnsr, index) => {
    back.listOrg.org.push({
      '@type': 'laboratory',
      '@xml:id': `localStruct-${index}`,
      idno: {
        '@type': 'RNSR',
        '#': rnsr,
      },
    });
  });
}

/**
 * Inserts the authors from `mergedDocument` into `biblFull`.
 * @param {object} biblFull The <biblFull> node to insert the authors in.
 * @param {object} back The <back> node to get the affiliations from.
 * @param {object} mergedDocument The merged document to get the authors from.
 */
function insertAuthors (biblFull, back, mergedDocument) {
  // Insert the affiliations in the <back> node first to later reference them in each author
  insertAffiliations(back, mergedDocument);

  // Initialize the author container
  setIfNotExists(biblFull, 'titleStmt.author', []);

  const authors = mergedDocument.authors;

  authors.forEach(author => {
    const halAuthor = {};

    // An author must have surname+forename, or a halId or a halAuthorId
    // cf page 10 of https://github.com/CCSDForge/HAL/blob/master/Sword/SWORD_import_HAL.pdf
    if (_.isEmpty(author.forename) && _.isEmpty(author.surname) && _.isEmpty(author.halAuthorId) && _.isEmpty(author.idHal)) return;

    // Role
    halAuthor['@role'] = 'aut';

    // Name
    if (!_.isEmpty(author.forename) && !_.isEmpty(author.surname)) {
      halAuthor.persName = {
        forename: { '@type': 'first', '#': author.forename },
        surname: author.surname,
      };
    }

    // idRef
    if (!_.isEmpty(author.idRef) || !_.isEmpty(_.get(author, 'enrichments.idRef'))) {
      setIfNotExists(halAuthor, 'idno', []);

      const idRef = _.get(author, 'idRef[0]') || _.get(author, 'enrichments.idRef[0]');

      halAuthor.idno.push({ '@type': 'http://www.idref.fr/', '#': idRef });
    }

    // Affiliations
    if (isNonEmptyArray(author.rnsr)) {
      setIfNotExists(halAuthor, 'affiliation', []);

      author.rnsr.forEach(rnsr => {
        // Find the affiliation for the current RNSR code in the <back> node
        const affiliation = back.listOrg.org.find(affiliation => affiliation.idno['#'] === rnsr);

        if (!affiliation) return;

        halAuthor.affiliation.push({
          '@ref': '#' + affiliation['@xml:id'],
        });
      });
    }

    biblFull.titleStmt.author.push(halAuthor);
  });

  // The authors are repeated under <sourceDesc>
  _.set(biblFull, 'sourceDesc.biblStruct.analytic.author', biblFull.titleStmt.author);
}

/**
 * Inserts the identifiers from `mergedDocument` into `biblFull`.
 * @param {object} biblFull The <biblFull> node to insert the identifiers in.
 * @param {object} mergedDocument The merged document to get the identifiers from.
 */
function insertIdentifiers (biblFull, mergedDocument) {
  // Initialize the identifier containers
  setIfNotExists(biblFull, 'sourceDesc.biblStruct.monogr.idno', []);
  setIfNotExists(biblFull, 'sourceDesc.biblStruct.idno', []);

  // DOI
  if (mergedDocument.doi) {
    biblFull.sourceDesc.biblStruct.idno.push({ '@type': 'doi', '#': mergedDocument.doi });
  }

  // PMID
  if (mergedDocument.pmId) {
    biblFull.sourceDesc.biblStruct.idno.push({ '@type': 'pubmed', '#': mergedDocument.pmId });
  }

  // ISSN
  if (_.get(mergedDocument, 'host.issn')) {
    biblFull.sourceDesc.biblStruct.monogr.idno.push({ '@type': 'issn', '#': mergedDocument.host.issn });
  }

  // EISSN
  if (_.get(mergedDocument, 'host.eissn')) {
    biblFull.sourceDesc.biblStruct.monogr.idno.push({ '@type': 'eissn', '#': mergedDocument.host.eissn });
  }
}

/**
 * Inserts the language from `mergedDocument` into `biblFull`.
 * @param {object} biblFull The <biblFull> node to insert the language in.
 * @param {object} mergedDocument The merged document to get the language from.
 */
function insertLanguage (biblFull, mergedDocument) {
  // Initialize the language container
  setIfNotExists(biblFull, 'profileDesc.langUsage.language', []);

  for (const languageName of mergedDocument.language) {
    const currentLanguageNode = {};

    // Documents should only be in either English or French
    const languageNameLower = languageName.toLowerCase();
    if (languageNameLower.includes('english')) {
      currentLanguageNode['@ident'] = 'en';
    } else if (languageNameLower.includes('french')) {
      currentLanguageNode['@ident'] = 'fr';
    } else {
      currentLanguageNode['@ident'] = 'und';
    }

    // The text content of a node is under the '#' key with xmlbuilder2
    currentLanguageNode['#'] = languageName;

    biblFull.profileDesc.langUsage.language.push(currentLanguageNode);
  }
}

/**
 * Inserts the abstract from `mergedDocument` into `biblFull`.
 * @param {object} biblFull The <biblFull> node to insert the abstract in.
 * @param {object} mergedDocument The merged document to get the abstract from.
 */
function insertAbstract (biblFull, mergedDocument) {
  let language;
  if (_.get(mergedDocument, 'abstract.en')) language = 'en';
  else if (_.get(mergedDocument, 'abstract.fr')) language = 'fr';

  // Create the abstract node
  setIfNotExists(biblFull, 'profileDesc.abstract', { '@xml:lang': language, p: mergedDocument.abstract[language] });
}

/**
 * Inserts the catalog data from `mergedDocument` into `biblFull`.
 * @param {object} biblFull The <biblFull> node to insert the catalog data in.
 * @param {object} mergedDocument The merged document to get the catalog data from.
 */
function insertCatalogData (biblFull, mergedDocument) {
  // Initialize the catalog data container
  setIfNotExists(biblFull, 'sourceDesc.biblStruct.monogr.imprint.biblScope', []);
  setIfNotExists(biblFull, 'sourceDesc.biblStruct.monogr.imprint.date', []);

  const biblScopes = biblFull.sourceDesc.biblStruct.monogr.imprint.biblScope;
  const dates = biblFull.sourceDesc.biblStruct.monogr.imprint.date;

  // Issue
  if (_.get(mergedDocument, 'host.issue')) {
    biblScopes.push({ '@unit': 'issue', '#': mergedDocument.host.issue });
  }

  // Page range
  if (_.get(mergedDocument, 'host.pages[0].range')) {
    biblScopes.push({ '@unit': 'pp', '#': mergedDocument.host.pages[0].range });
  }

  // Volume
  if (_.get(mergedDocument, 'host.volume')) {
    biblScopes.push({ '@unit': 'volume', '#': mergedDocument.host.volume });
  }

  // Publication date
  if (_.get(mergedDocument, 'host.publicationDate')) {
    dates.push({ '@type': 'datePub', '#': mergedDocument.host.publicationDate });
  }

  // Electronic publication date
  if (_.get(mergedDocument, 'host.electronicPublicationDate')) {
    dates.push({ '@type': 'dateEpub', '#': mergedDocument.host.electronicPublicationDate });
  }

  // Publisher
  if (_.get(mergedDocument, 'host.publisher')) {
    _.set(biblFull, 'sourceDesc.biblStruct.monogr.imprint.publisher', mergedDocument.host.publisher);
  }
}

/**
 * Inserts the meeting data from `mergedDocument` into `biblFull`.
 * @param {object} biblFull The <biblFull> node to insert the meeting data in.
 * @param {object} mergedDocument The merged document to get the meeting data from.
 */
function insertMeetingData (biblFull, mergedDocument) {
  // Initialize the meeting data container
  setIfNotExists(biblFull, 'sourceDesc.biblStruct.monogr.meeting', {});

  const { meeting } = biblFull.sourceDesc.biblStruct.monogr;

  // Name
  if (_.get(mergedDocument, 'host.conference.name')) {
    meeting.title = mergedDocument.host.conference.name;
  }

  // Date (there is no end date in the Corhal data format)
  if (_.get(mergedDocument, 'host.conference.date')) {
    meeting.date = { '@type': 'start', '#': mergedDocument.host.conference.date };
  }

  // City
  if (_.get(mergedDocument, 'host.conference.place')) {
    meeting.settlement = mergedDocument.host.conference.place;
  }

  // Country
  if (_.get(mergedDocument, 'host.conference.country')) {
    meeting.country = mergedDocument.host.conference.country;
  }
}

/**
 * Inserts the classifications from `mergedDocument` into `biblFull`.
 * @param {object} biblFull The <biblFull> node to insert the classifications in.
 * @param {object} mergedDocument The merged document to get the classifiactions from.
 */
function insertClassifications (biblFull, mergedDocument) {
  setIfNotExists(biblFull, 'profileDesc.textClass.classCode', []);

  const classCodes = biblFull.profileDesc.textClass.classCode;

  // HAL classification
  const classification = _.get(mergedDocument, 'classifications.hal');
  const enrichedClassification = _.get(mergedDocument, 'classifications.enrichments.hal');

  // If a native classification is present, use it, otherwise use the enriched one if it is present,
  // if no classification is present, don't do anything
  let finalClassification;
  if (_.get(classification, 'code')) {
    finalClassification = classification;
  } else if (_.get(enrichedClassification, 'code')) {
    finalClassification = enrichedClassification;
  }

  if (finalClassification) {
    classCodes.push({
      '@scheme': 'halDomain',
      '@n': finalClassification.code,
      '#': finalClassification.en,
    });
  }

  // HAL typology
  if (mergedDocument.originalGenre) {
    const typologyMappingForCurrentSource = metadata.halTypologies.find(sourceMapping => sourceMapping.source === mergedDocument.origins.originalGenre);

    const halTypology = _.get(typologyMappingForCurrentSource, `mapping.${mergedDocument.originalGenre}`);
    if (halTypology) {
      classCodes.push({
        '@scheme': 'halTypology',
        '@n': halTypology,
      });
    }
  }
}

/**
 * Sets `value` at `path` in `object` only if `path` does not exist in `object`.
 * @param {object} object The object to modify.
 * @param {string} path The path of the property to set.
 * @param {any} value The value to set.
 */
function setIfNotExists (object, path, value) {
  if (!_.has(object, path)) {
    _.set(object, path, value);
  }
}

/**
 * Checks whether `value` is a non-empty array.
 * @param {object} value The object to test.
 * @returns `true` if `value` is a non-empty array, `false` otherwise.
 */
function isNonEmptyArray (value) {
  return _.isArray(value) && !_.isEmpty(value);
}

module.exports = generateHalTei;
