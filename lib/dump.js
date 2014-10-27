/**
 * Module dependencies
 */
var fs = require('fs');
var dumpPath = require('../index').dumpPath;

/**
 * Module exports
 */
var exports = module.exports;
exports.make = makeDump;
exports.get = getDump;
exports.set = setDump;

/**
 * Creates empty dump file at dumpPath.
 *
 * @api private
 */
function makeDump() {
  fs.writeFile(dumpPath, '[]', function(err) {
    if (err) {
      console.log(err);
    }
  });
}

/**
 * Gets dump file's data.
 *
 * @return {Object} data
 * @api private
 */
function getDump() {
  return JSON.parse(fs.readFileSync(dumpPath));
}

/**
 * Updates dump file with new data.
 *
 * @param {Object} data
 * @api private
 */
function setDump(data) {
  fs.writeFile(dumpPath, JSON.stringify(data), function(err){
    if (err) {
      console.log(err);
    }
  });
}
