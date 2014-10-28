/**
 * Module dependencies.
 */
var fs = require('fs');
var path = require('path');
var utils = require('./utils');
var dump = require('./dump');
var index = require('../index');

/**
 * Important constants.
 */
var DESKTOP_PATH = index.DESKTOP_PATH;
var DUMP_PATH = index.DUMP_PATH;

/**
 * Module exports.
 */
var exports = module.exports;
exports.extend({
  add: toodoAdd,
  remove: toodoRemove,
  read: toodoRead
});

/**
 * Read from dump file.
 *
 * @prints dump data
 * @api public
 */
function toodoRead() {
  // Read from dump file .toodo
  var dumpData = dump.get();
  dumpData.sort(function (a, b) {
    // Turn strings into date, then subtract them
    // to get value which is either, -ve, +ve or zero.
    return new Date(a) - new Date(b);
  });
  for (var i = 0; i < dumpData.length; i++) {
    /**
     * Example:
     * 1. sup
     * 2. hello
     */
    console.log((i + 1) + '. ' + dumpData[i].name);
  }
}

/**
 * Add item to list aka Desktop.
 *
 * @param {String} item
 * @param {Function} callback
 * @api public
 */
function toodoAdd(item, callback) {
  // Update dump file .toodo
  var time_now = new Date();
  var itemData = {
    name: item,
    created: time_now.toISOString()
  };
  dump.update(itemData);

  // Write to Desktop
  var itemPath = path.join(DESKTOP_PATH, item);
  fs.writeFile(itemPath, '', function(err) {
    if (err) {
      console.log(err);
    }
    else {
      callback();
    }
  });
}

/**
 * Remove item from list aka Desktop.
 *
 * @param {Integer} item number
 * @param {Function} callback
 * @api public
 */
function toodoRemove(item, callback) {
  // Delete file at Desktop
  var itemPath = path.join(DESKTOP_PATH, item);
  fs.unlink(itemPath, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      callback();
    }
  });
}
