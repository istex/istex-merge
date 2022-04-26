const generateMergedDocument = require('./src/generateMergedDocument');
const defaultMapping = require('./mapping/default.json');
const defaultRules = require('./rules/default.json');
const generateHalTei = require('./src/generateHalTei');

module.exports = {
  generateMergedDocument,
  defaultMapping,
  defaultRules,
  generateHalTei,
};
