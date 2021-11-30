/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const { expect } = require('chai');
const rewire = require('rewire');
const { select } = require('../index');

describe('select.js', () => {
  const testData = require('./dataset/in/select');
  const expected = require('./dataset/expected/select');

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

  it('Success: default prorities and Hal without a fulltext', () => {
    expectSuccess(testData.defaultPrioritiesAndHalWithoutFulltext, expected.defaultPrioritiesAndHalWithoutFulltext);
  });

  it('Success: default prorities and Hal with a fulltext', () => {
    expectSuccess(testData.defaultPrioritiesAndHalWithFulltext, expected.defaultPrioritiesAndHalWithFulltext);
  });

  it('Success: merge duplicates with idConditor', () => {
    expectSuccess(testData.mergeDuplicates, expected.mergeDuplicates);
  });

  it('Success: merge duplicates with idConditor (one empty duplicate)', () => {
    expectSuccess(testData.mergeDuplicatesWithOneEmptyDuplicate, expected.mergeDuplicatesWithOneEmptyDuplicate);
  });

  it('Success: merge duplicates with idConditor (identical duplicates)', () => {
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
});

describe('generateHalTEI.js', () => {
  const generateHalTEIModule = rewire('../src/generateHalTEI.js');
  const testData = require('./dataset/in/generateHalTEI');
  const biblFull = {};

  function callPrivateFunction (name, ...args) {
    const func = generateHalTEIModule.__get__(name);
    func(...args);
  }

  it('Success: identifiers', () => {
    callPrivateFunction('insertIdentifiers', biblFull, testData.correctRecord);

    expect(biblFull.sourceDesc.biblStruct.idno).to.deep.include({ '@type': 'doi', '#': '10.1039/c8nr07898j' });
    expect(biblFull.sourceDesc.biblStruct.monogr.idno).to.deep.include({ '@type': 'issn', '#': '2040-3364' });
    expect(biblFull.sourceDesc.biblStruct.monogr.idno).to.deep.include({ '@type': 'eissn', '#': '2040-3372' });
  });

  it('Success: abstract', () => {
    callPrivateFunction('insertAbstract', biblFull, testData.correctRecord);

    expect(biblFull.profileDesc.abstract['@xml:lang']).to.be.equal('en');
    expect(biblFull.profileDesc.abstract.p.length).to.be.greaterThan(0);
  });

  it('Success: language', () => {
    callPrivateFunction('insertLanguage', biblFull, testData.correctRecord);

    expect(biblFull.profileDesc.langUsage.language).to.deep.include({ '@ident': 'en', '#': 'English' });
  });

  it('Success: titles', () => {
    callPrivateFunction('insertTitles', biblFull, testData.correctRecord);

    expect(biblFull.titleStmt.title).to.deep.include({ '@xml:lang': 'en', '#': 'Unexpected redox behaviour of large surface alumina containing highly dispersed ceria nanoclusters.' });
    expect(biblFull.sourceDesc.biblStruct.analytic.title).to.eql(biblFull.titleStmt.title);
    expect(biblFull.sourceDesc.biblStruct.monogr.title).to.deep.include({ '@level': 'j', '#': 'Nanoscale' });
    expect(biblFull.sourceDesc.biblStruct.monogr.title).to.deep.include({ '@level': 'm', '#': 'My Conference' });
  });

  it('Success: authors', () => {
    callPrivateFunction('insertAuthors', biblFull, testData.correctRecord);

    expect(biblFull.titleStmt.author.length).to.be.equal(7);
    expect(biblFull.titleStmt.author).to.deep.include({
      '@role': 'aut',
      persName: {
        forename: { '@type': 'first', '#': 'Juliana' },
        surname: 'Fonseca',
      },
    });
    expect(biblFull.sourceDesc.biblStruct.analytic.author).to.eql(biblFull.titleStmt.author);
  });

  it('Success: catalog data', () => {
    callPrivateFunction('insertCatalogData', biblFull, testData.correctRecord);

    expect(biblFull.sourceDesc.biblStruct.monogr.imprint.biblScope).to.deep.include({ '@unit': 'issue', '#': '3' });
    expect(biblFull.sourceDesc.biblStruct.monogr.imprint.biblScope).to.deep.include({ '@unit': 'pp', '#': '1273-1285' });
    expect(biblFull.sourceDesc.biblStruct.monogr.imprint.biblScope).to.deep.include({ '@unit': 'volume', '#': '11' });
    expect(biblFull.sourceDesc.biblStruct.monogr.imprint.date).to.deep.include({ '@type': 'datePub', '#': '2019-01-17' });
    expect(biblFull.sourceDesc.biblStruct.monogr.imprint.date).to.deep.include({ '@type': 'dateEpub', '#': '2019' });
    expect(biblFull.sourceDesc.biblStruct.monogr.imprint.publisher).to.be.equal('My Publisher');
  });

  it('Success: meeting data', () => {
    callPrivateFunction('insertMeetingData', biblFull, testData.correctRecord);

    expect(biblFull.sourceDesc.biblStruct.monogr.meeting.title).to.equal('My Conference');
  });
});

/**
 * Runs tests for success cases.
 * @param {object} inputData The input data.
 * @param {object} expectedResult The expect result.
 */
function expectSuccess (inputData, expectedResult) {
  const result = select(inputData.docObjects, inputData.rules);
  expect(result).to.eql(expectedResult);
}

/**
 * Runs tests for error cases.
 * @param {object} inputData The input data.
 * @param {string} expectedErrorMessage The expect error message.
 */
function expectError (inputData, expectedErrorMessage) {
  expect(() => select(inputData.docObjects, inputData.rules)).to.throw(expectedErrorMessage);
}
