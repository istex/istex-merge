/* eslint-env mocha */

const fs = require('fs-extra');
const path = require('path');
const { expect } = require('chai');
const rewire = require('rewire');
const { generateMergedDocument, generateHalTei } = require('../index');

describe('generateMergedDocument.js', () => {
  const testData = require('./dataset/in/generateMergedDocument');
  const expected = require('./dataset/expected/generateMergedDocument');

  // Here we make sure all the mapping fields have corresponding rules and vice-versa
  before(() => {
    const defaultMapping = require('../mapping/default.json');
    const defaultRules = require('../rules/default.json').keys;
    const halRules = require('../rules/halWithoutFulltext.json').keys;
    const defaultMappingKeysSetToTrue = Object.keys(Object.fromEntries(Object.entries(defaultMapping).filter(([key, value]) => value !== false)));
    const defaultRulesKeys = Object.keys(defaultRules);
    const halRulesKeys = Object.keys(halRules);

    expect(defaultMappingKeysSetToTrue).to.eql(defaultRulesKeys);
    expect(defaultRulesKeys).to.eql(halRulesKeys);
  });

  it('Fail: no docObjects were found', () => {
    expectError(testData.noDocObjects, 'docObjects not found');
  });

  it('Fail: no docObjects with a source were found', () => {
    expectError(testData.noDocObjectsWithSource, 'docObjects with source not found');
  });

  it('Fail: no docObjects with a known source were found', () => {
    expectError(testData.noDocObjectsWithKnownSource, 'docObject corresponding to one of given sources not found');
  });

  it('Fail: no priorities were found', () => {
    expectError(testData.noPriorities, 'Priorities not found');
  });

  it('Success: global priorities', () => {
    expectSuccess(testData.globalPriorities, expected.globalPriorities);
  });

  it('Success: global and custom priorities', () => {
    expectSuccess(testData.globalAndCustomPriorities, expected.globalAndCustomPriorities);
  });

  it('Success: global and custom priorities but no data', () => {
    expectSuccess(testData.globalAndCustomPrioritiesButNoData, expected.globalAndCustomPrioritiesButNoData);
  });

  it('Success: global priorities for 2 identical sources and and delete unwanted data', () => {
    expectSuccess(testData.globalPrioritiesAndDeleteUnwantedData, expected.globalPrioritiesAndDeleteUnwantedData);
  });

  it('Success: default priorities and Hal without a fulltext', () => {
    expectSuccess(testData.defaultPrioritiesAndHalWithoutFulltext, expected.defaultPrioritiesAndHalWithoutFulltext);
  });

  it('Success: default priorities and Hal with a fulltext', () => {
    expectSuccess(testData.defaultPrioritiesAndHalWithFulltext, expected.defaultPrioritiesAndHalWithFulltext);
  });

  it('Success: merge duplicates with sourceUid', () => {
    expectSuccess(testData.mergeDuplicates, expected.mergeDuplicates);
  });

  it('Success: merge duplicates with sourceUid (one empty duplicate)', () => {
    expectSuccess(testData.mergeDuplicatesWithOneEmptyDuplicate, expected.mergeDuplicatesWithOneEmptyDuplicate);
  });

  it('Success: merge duplicates with sourceUid (identical duplicates)', () => {
    expectSuccess(testData.mergeDuplicatesWithSameDuplicates, expected.mergeDuplicatesWithSameDuplicates);
  });

  it('Success: merge sourceUid', () => {
    expectSuccess(testData.mergeSourceUid, expected.mergeSourceUid);
  });

  it('Success: merge sourceUid (same sourceUid)', () => {
    expectSuccess(testData.mergeSourceUidButSameSourceUid, expected.mergeSourceUidButSameSourceUid);
  });

  it('Success: merge enrichments', () => {
    expectSuccess(testData.mergeEnrichments, expected.mergeEnrichments);
  });

  it('Success: merge keywords', () => {
    expectSuccess(testData.mergeKeywords, expected.mergeKeywords);
  });

  it('Success: merge orcId', () => {
    expectSuccess(testData.mergeOrcId, expected.mergeOrcId);
  });

  it('Success: merge RNSR', () => {
    expectSuccess(testData.mergeRnsr, expected.mergeRnsr);
  });

  it('Success: merge authors with strange cases', () => {
    expectSuccess(testData.mergeAuthors, expected.mergeAuthors);
  });

  it('Success: identifiers', () => {
    expectSuccess(testData.identifiers, expected.identifiers);
  });

  // This test makes sure the missing subfields from the primary source are not taken from the
  // secondary source when not declared explicitely in the mapping
  it('Success: missing subfields from primary source', () => {
    expectSuccess(testData.missingSubfieldsInPrimarySource, expected.missingSubfieldsInPrimarySource);
  });

  it('Success: business', () => {
    expectSuccess(testData.business, expected.business);
  });
});

describe('generateHalTei.js', () => {
  const generateHalTeiModule = rewire('../src/generateHalTei.js');
  const testData = require('./dataset/in/generateHalTei');
  const biblFull = {};
  const back = {};

  function callPrivateFunction (name, ...args) {
    const func = generateHalTeiModule.__get__(name);
    func(...args);
  }

  it('Success: identifiers', () => {
    callPrivateFunction('insertIdentifiers', biblFull, testData.correctDocument);

    expect(biblFull.sourceDesc.biblStruct.idno).to.deep.include({ '@type': 'doi', '#': '10.1039/c8nr07898j' });
    expect(biblFull.sourceDesc.biblStruct.monogr.idno).to.deep.include({ '@type': 'issn', '#': '2040-3364' });
    expect(biblFull.sourceDesc.biblStruct.monogr.idno).to.deep.include({ '@type': 'eissn', '#': '2040-3372' });
  });

  it('Success: abstract', () => {
    callPrivateFunction('insertAbstract', biblFull, testData.correctDocument);

    expect(biblFull.profileDesc.abstract['@xml:lang']).to.be.equal('en');
    expect(biblFull.profileDesc.abstract.p.length).to.be.greaterThan(0);
  });

  it('Success: language', () => {
    callPrivateFunction('insertLanguage', biblFull, testData.correctDocument);

    expect(biblFull.profileDesc.langUsage.language).to.deep.include({ '@ident': 'en', '#': 'English' });
  });

  it('Success: titles', () => {
    callPrivateFunction('insertTitles', biblFull, testData.correctDocument);

    expect(biblFull.titleStmt.title).to.deep.include({ '@xml:lang': 'en', '#': 'Unexpected redox behaviour of large surface alumina containing highly dispersed ceria nanoclusters.' });
    expect(biblFull.sourceDesc.biblStruct.analytic.title).to.eql(biblFull.titleStmt.title);
    expect(biblFull.sourceDesc.biblStruct.monogr.title).to.deep.include({ '@level': 'j', '#': 'Nanoscale' });
    expect(biblFull.sourceDesc.biblStruct.monogr.title).to.deep.include({ '@level': 'm', '#': 'My Conference' });
  });

  it('Success: authors and their affiliations', () => {
    callPrivateFunction('insertAuthors', biblFull, back, testData.correctDocument);

    expect(biblFull.titleStmt.author.length).to.be.equal(7);
    expect(biblFull.titleStmt.author).to.deep.include({
      '@role': 'aut',
      persName: {
        forename: { '@type': 'first', '#': 'Juliana' },
        surname: 'Fonseca',
      },
      affiliation: [
        { '@ref': '#localStruct-0' },
        { '@ref': '#localStruct-1' },
        { '@ref': '#localStruct-2' },
      ],
    });
    expect(biblFull.sourceDesc.biblStruct.analytic.author).to.eql(biblFull.titleStmt.author);

    expect(back.listOrg.org).to.deep.include({
      '@type': 'laboratory',
      '@xml:id': 'localStruct-0',
      idno: {
        '@type': 'RNSR',
        '#': '200412801A',
      },
    });
  });

  it('Success: catalog data', () => {
    callPrivateFunction('insertCatalogData', biblFull, testData.correctDocument);

    expect(biblFull.sourceDesc.biblStruct.monogr.imprint.biblScope).to.deep.include({ '@unit': 'issue', '#': '3' });
    expect(biblFull.sourceDesc.biblStruct.monogr.imprint.biblScope).to.deep.include({ '@unit': 'pp', '#': '1273-1285' });
    expect(biblFull.sourceDesc.biblStruct.monogr.imprint.biblScope).to.deep.include({ '@unit': 'volume', '#': '11' });
    expect(biblFull.sourceDesc.biblStruct.monogr.imprint.date).to.deep.include({ '@type': 'datePub', '#': '2019-01-17' });
    expect(biblFull.sourceDesc.biblStruct.monogr.imprint.date).to.deep.include({ '@type': 'dateEpub', '#': '2019' });
    expect(biblFull.sourceDesc.biblStruct.monogr.imprint.publisher).to.be.equal('My Publisher');
  });

  it('Success: meeting data', () => {
    callPrivateFunction('insertMeetingData', biblFull, testData.correctDocument);

    expect(biblFull.sourceDesc.biblStruct.monogr.meeting.title).to.equal('My Conference');
  });

  it('Success: classifications', () => {
    callPrivateFunction('insertClassifications', biblFull, testData.correctDocument);

    expect(biblFull.profileDesc.textClass.classCode).to.deep.include({ '@scheme': 'halDomain', '@n': 'phys', '#': 'Physics [physics]' });
    expect(biblFull.profileDesc.textClass.classCode).to.deep.include({ '@scheme': 'halTypology', '@n': 'ART' });
  });

  after(() => {
    const outputPath = path.join(__dirname, 'output', 'correct.tei.xml');

    return fs.outputFile(outputPath, generateHalTei(testData.correctDocument, { prettyPrint: true }), 'utf-8');
  });
});

/**
 * Runs tests for success cases.
 * @param {object} inputData The input data.
 * @param {object} expectedResult The expect result.
 */
function expectSuccess (inputData, expectedResult) {
  const result = generateMergedDocument(inputData.docObjects, { rules: inputData.rules });
  expect(result).to.eql(expectedResult);
}

/**
 * Runs tests for error cases.
 * @param {object} inputData The input data.
 * @param {string} expectedErrorMessage The expect error message.
 */
function expectError (inputData, expectedErrorMessage) {
  expect(() => generateMergedDocument(inputData.docObjects, { rules: inputData.rules })).to.throw(expectedErrorMessage);
}
