const path = require('path');

const outputDir = path.join(__dirname, '..', '..', 'output');

const correctRecord = {
  record: {},
  path: path.join(outputDir, 'correctRecord.tei.xml'),
};

module.exports = {
  correctRecord,
};
