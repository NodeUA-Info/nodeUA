const queryRoot = require('./root');
const chapter = require('./chapter');
const user = require('./user');
const test = require('./test')

const schemaArray = [queryRoot, chapter, user];

module.exports = schemaArray;