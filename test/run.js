/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */

const fs = require('fs-extra');
const { expect } = require('chai');
const { create } = require('xmlbuilder2');
const { select, generateHalTEI } = require('../index');

describe('index.js', () => {
  describe('#select()', () => {
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
      expectError(testData.noPriorities, 'priorities not found');
    });

    it('Success: global priorities)', () => {
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

  describe('#generateHalTEI()', () => {
    const testData = require('./dataset/in/generateHalTEI');
    let xmlDoc;
    let biblFull;

    before(() => {
      const { record, path } = testData.correctRecord;

      return generateHalTEI(record, path)
        .then(() => fs.readFile(path, 'utf-8'))
        .then(xmlContent => {
          xmlDoc = create(xmlContent).end({ format: 'object' });
          biblFull = xmlDoc.TEI.text.body.listBibl.biblFull;
        });
    });

    it('Success: identifiers', () => {
      expect(biblFull.sourceDesc.biblStruct.idno).to.be.not.undefined;
      expect(biblFull.sourceDesc.biblStruct.idno).to.include({ '@type': 'doi', '#': '10.1039/c8nr07898j' });
    });

    it('Success: abstract', () => {
      expect(biblFull.profileDesc.abstract.p.length).to.be.greaterThan(0);
    });

    it('Success: language', () => {
      expect(biblFull.profileDesc.langUsage.language['@ident']).to.be.equal('en');
      expect(biblFull.profileDesc.langUsage.language['#']).to.be.equal('English');
    });

    it('Success: titles', () => {
      expect(biblFull.titleStmt.title['@xml:lang']).to.be.equal('en');
      expect(biblFull.titleStmt.title['#']).to.be.equal('Unexpected redox behaviour of large surface alumina containing highly dispersed ceria nanoclusters.');
      expect(biblFull.sourceDesc.biblStruct.analytic.title).to.eql(biblFull.titleStmt.title);
    });

    it('Success: authors', () => {
      expect(biblFull.titleStmt.author.length).to.be.equal(7);
      expect(biblFull.titleStmt.author[0]['@role']).to.be.equal('aut');
      expect(biblFull.titleStmt.author[0].persName.forename['@type']).to.be.equal('first');
      expect(biblFull.titleStmt.author[0].persName.forename['#']).to.be.equal('Juliana');
      expect(biblFull.titleStmt.author[0].persName.surname).to.be.equal('Fonseca');
      expect(biblFull.sourceDesc.biblStruct.analytic.author).to.eql(biblFull.titleStmt.author);
    });
  });
});

/**
 * Runs tests for success cases.
 * @param {object} inputData The input data
 * @param {object} expectedResult The expect result
 */
function expectSuccess (inputData, expectedResult) {
  const result = select(inputData.docObjects, inputData.rules, inputData.isConditor);
  expect(result.err).to.be.false;
  expect(result.msg).to.be.equal('success');
  expect(result.res).to.eql(expectedResult);
}

/**
 * Runs tests for error cases.
 * @param {object} inputData The input data
 * @param {string} expectedErrorMessage The expect error message
 */
function expectError (inputData, expectedErrorMessage) {
  const result = select(inputData.docObjects, inputData.rules, inputData.isConditor);
  expect(result.err).to.be.true;
  expect(result.msg).to.be.equal(expectedErrorMessage);
  expect(result.res).to.be.undefined;
}
