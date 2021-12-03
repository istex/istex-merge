const generateMergedDocument = require('./src/generateMergedDocument');
const defaultMapping = require('./mapping/default.json');
const defaultRules = require('./rules/default.json');
const generateHalTEI = require('./src/generateHalTEI');

module.exports = {
  generateMergedDocument,
  defaultMapping,
  defaultRules,
  generateHalTEI,
};
