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
  read: toodoRead,
  finish: toodoFinish
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
     * 1. sup   [X]
     * 2. hello [ ]
     */
    var itemData = dumpData[i];
    var status = itemData.finished ? 'X' : ' ';
    console.log((i + 1) + '. ' + itemData.name +
      ' [' + status + ']');
  }
  if (dumpData.length === 0) {
    console.log("You're done here, have a good day!\n" +
                "Enter 'toodo add <item>' to add items.");
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
    created: time_now.toISOString(),
    finished: false
  };
  dump.add(itemData);

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
 * @param {Integer} item number on list
 * @param {Function} callback
 * @api public
 */
function toodoRemove(itemNumber, callback) {
  // Delete file at Desktop
  var dumpData = dump.get();
  var itemIndex = itemNumber - 1;
  var itemName = dumpData[itemIndex].name;
  dump.remove(itemIndex);  // This must come after all usage of dumpData

  // Delete from Desktop
  var itemPath = path.join(DESKTOP_PATH, itemName);
  fs.unlink(itemPath, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      callback(itemName);
    }
  });
}

/**
 * Finishes item on list aka Desktop.
 *
 * @param {Integer} item number on list
 * @param {Function} callback
 * @api public
 */
function toodoFinish(itemNumber, callback) {
  var dumpData = dump.get();
  var itemIndex = itemNumber - 1;
  dumpData[itemIndex].finished = true;
  dump.set(dumpData);
  callback();
}