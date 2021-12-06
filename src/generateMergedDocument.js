const _ = require('lodash');
const SourceManager = require('../lib/SourcesManager.js');

const defaultMapping = require('../mapping/default.json');
const defaultRules = require('../rules/default.json');
const halWithoutFulltextRules = require('../rules/halWithoutFulltext.json');

/**
 * Creates a merged document from documents of various sources.
 * @param {[]} docObjects The array of `docObject`s.
 * @param {object} rules The object defining the rules.
 * @param  {object} mappping The object defining the mapping.
 * @returns {object} An object with the result and potentially an error message.
 */
function generateMergedDocument (docObjects, rules = defaultRules, mapping = defaultMapping) {
  // This allows to pass null or undefined to rules to use the default rules
  // instead of requiring them before passing them. You can use the function
  // like so: generateMergedDocument(docObjects, null, customMapping)
  if (rules == null) rules = defaultRules;

  const sourceManager = new SourceManager();
  const sources = {};
  let properties;
  let result;

  if (!_.isObject(mapping)) throw new Error('Mapping not found');

  if (!SourceManager.isNonEmptyArray(docObjects)) throw new Error('docObjects not found');

  for (const docObject of docObjects) {
    if (!_.isObject(docObject) || !docObject.source) continue;

    sourceManager.addSource(docObject.source, docObject);
  }

  if (!sourceManager.hasSources()) throw new Error('docObjects with source not found');

  if (sourceManager.hasSource('hal') && !sourceManager.getPropertyOf('hal', '_business.hasFulltext')) {
    rules = halWithoutFulltextRules;
  }

  if (!SourceManager.isNonEmptyArray(rules.priorities)) {
    throw new Error('Priorities not found');
  }

  sourceManager.setPriorities(rules.priorities);

  for (const priority of rules.priorities) {
    if (!sourceManager.hasDocObjects(priority)) continue;

    const merging = sourceManager.merge(priority, mapping);
    result = merging.data;
    properties = merging.properties;
    sources[priority] = true;

    break;
  }

  if (!result) throw new Error('docObject corresponding to one of given sources not found');

  if (!_.isObject(rules.keys)) throw new Error('Rules not found');

  for (const key in rules.keys) {
    let currentRules = rules.priorities; // default value
    if (SourceManager.isNonEmptyArray(rules.keys[key])) currentRules = rules.keys[key]; // custom value

    for (const source of currentRules) {
      if (mapping[key] !== true || !sourceManager.hasSource(source)) continue;

      const value = sourceManager.getPropertyOf(source, key);
      if (value == null) continue;

      _.set(result, key, value);
      sources[source] = true;
      properties[key] = source;

      break;
    }
  }

  properties.sources = properties.sources ? properties.sources : Object.keys(sources);
  result.origins = properties;

  return result;
}

module.exports = generateMergedDocument;
