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
  console.log(dumpData);
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
  var dumpData = dump.get();
  var itemData = {
    name: item,
    created: utils.getDateString()
  };
  dumpData.push(itemData);
  dump.set(dumpData);

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