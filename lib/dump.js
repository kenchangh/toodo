/**
 * Module dependencies
 */
var fs = require('fs');
var utils = require('./utils');
var DUMP_PATH = require('../index').DUMP_PATH;

// Shortcut variable for checking existence
var dumpExists = fs.existsSync(DUMP_PATH);

/**
 * Module exports
 */
var exports = module.exports;
exports.extend({
  exists: dumpExists,
  make: makeDump,
  get: getDump,
  set: setDump,
  add: addToDump,
  remove: removeFromDump,
  delete: deleteDump
});

/**
 * Creates empty dump file at DUMP_PATH.
 *
 * @api public
 */
function makeDump() {
  fs.writeFileSync(DUMP_PATH, '[]');
}

/**
 * Deletes dump file at DUMP_PATH. Only used in testing.
 *
 * @api public
 */
function deleteDump() {
  fs.unlinkSync(DUMP_PATH);
}

/**
 * Gets dump file's data.
 *
 * @return {Object} data
 * @api public
 */
function getDump() {
  return JSON.parse(fs.readFileSync(DUMP_PATH));
}

/**
 * Updates dump file with new data.
 *
 * @param {Object} data
 * @api public
 */
function setDump(data) {
  fs.writeFile(DUMP_PATH, JSON.stringify(data), function(err){
    if (err) {
      console.log(err);
    }
  });
}

/**
 * Pushes to dumpData and sets it.
 * A combination of getDump and setDump.
 *
 * @param {Object} new item
 * @api public
 */
function addToDump(item) {
  var dumpData = getDump();
  // Prepends to array
  dumpData.unshift(item);
  setDump(dumpData);
}

/**
 * Removes from dumpDate.
 *
 * @param {Integer} index
 * @api public
 */
function removeFromDump(index) {
  var dumpData = getDump();
  // Remove from array
  dumpData.splice(index, 1);
  setDump(dumpData);
}
