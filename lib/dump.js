/**
 * Module dependencies
 */
var fs = require('fs');
var utils = require('./utils');
var DUMP_PATH = require('../index').DUMP_PATH;

/**
 * Module exports
 */
var exports = module.exports;
exports.extend({
  make: makeDump,
  get: getDump,
  set: setDump
});

/**
 * Creates empty dump file at DUMP_PATH.
 *
 * @api private
 */
function makeDump() {
  fs.writeFile(DUMP_PATH, '[]', function(err) {
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
  return JSON.parse(fs.readFileSync(DUMP_PATH));
}

/**
 * Updates dump file with new data.
 *
 * @param {Object} data
 * @api private
 */
function setDump(data) {
  fs.writeFile(DUMP_PATH, JSON.stringify(data), function(err){
    if (err) {
      console.log(err);
    }
  });
}
