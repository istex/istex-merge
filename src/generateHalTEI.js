const fs = require('fs-extra');
const { create } = require('xmlbuilder2');
const _ = require('lodash');

/**
 * Generates a Hal TEI from a reference record.
 * @param {object} referenceRecord The reference record generated by `select`.
 * @param {string} path The path to write the TEI file to.
 * @returns {Promise} A Promise.
 */
function generateHalTEI (referenceRecord, path) {
  const xmlDoc = {};
  xmlDoc.TEI = {};

  // Set the root TEI node attributes
  xmlDoc.TEI['@xmlns'] = 'http://www.tei-c.org/ns/1.0';
  xmlDoc.TEI['@xmlns:xsi'] = 'http://www.w3.org/2001/XMLSchema-instance';
  xmlDoc.TEI['@xmlns:hal'] = 'http://hal.archives-ouvertes.fr/';
  xmlDoc.TEI['@version'] = '1.1';
  xmlDoc.TEI['@xsi:schemaLocation'] = 'http://www.tei-c.org/ns/1.0 http://api.archives-ouvertes.fr/documents/aofr-sword.xsd';

  // Create the base <text> structure
  _.set(xmlDoc.TEI, 'text.body.listBibl.biblFull', {});
  const biblFull = xmlDoc.TEI.text.body.listBibl.biblFull;

  // Language
  if (_.isArray(referenceRecord.language) && !_.isEmpty(referenceRecord.language)) {
    _.set(biblFull, 'profileDesc.langUsage.language', []);

    for (const languageName of referenceRecord.language) {
      const currentLanguageNode = {};

      // Records should only be in either English or French
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

  // Abstract
  if (_.isObject(referenceRecord.abstract)) {
    let language;
    if (referenceRecord.abstract.en) language = 'en';
    else if (referenceRecord.abstract.fr) language = 'fr';

    // Create the abstract node
    _.set(xmlDoc, 'TEI.text.body.listBibl.biblFull.profileDesc.abstract', {});
    const { abstract } = xmlDoc.TEI.text.body.listBibl.biblFull.profileDesc;

    // Set the language attribute
    abstract['@xml:lang'] = language;

    // Insert the abstract text
    abstract.p = referenceRecord.abstract[language];
  }

  const fileContent = create(xmlDoc).end();

  return fs.outputFile(path, fileContent, 'utf-8');
}

module.exports = generateHalTEI;
