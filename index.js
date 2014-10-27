#! /c/nodejs/node

/**
 * Module dependencies.
 */
var fs = require('fs');
var path = require('path');
var program = require('commander');
var utils = require('./lib/utils');
var exports = module.exports;

// Normalized paths
var dumpPath = path.join(utils.getUserHome(), '.toodo');
var desktopPath = path.join(utils.getUserHome(), 'Desktop');

/**
 * Module exports.
 */
exports.dumpPath = dumpPath;
exports.desktopPath = desktopPath;
var dump = require('./lib/dump');

/**
 * Self-calling function to check if dump file present.
 * If not, call makeConfig.
 *
 * @api private
 */
(function startupCheck() {
  // Add more checks here
  if (!fs.existsSync(dumpPath)) {
    dump.make();
  }
})();

/**
 * Program options and metadata.
 */
program
  .version('0.0.1')
  .option('-v, --verbose', 'Provides more information.')
  .option('-i, --interactive', 'Interactive prompts for inserting more details.');

/**
 * Program commands.
 */
program
  .command('add <item>')
  .action(function (item) {
    toodoAdd(item);
  });

/**
 * Finally parsing the argv.
 */
program.parse(process.argv);

// MUST be behind program.parse
var NO_COMMAND = program.args.length === 0;

/**
 * When toodo is called without any command.
 *
 * @prints toodo list
 */
if (NO_COMMAND) {
  toodoRead();
}


function toodoRead() {
  // Read from dump file .toodo
  var dumpData = dump.get();
  console.log(dumpData);
}

/**
 * Add item to list aka Desktop.
 *
 * @api private
 */
function toodoAdd(item) {
  // Update dump file .toodo
  var dumpData = dump.get();
  var itemData = {
    name: item,
    created: utils.getDateString()
  };
  dumpData.push(itemData);
  dump.set(dumpData);

  // Write to Desktop
  var itemPath = path.join(desktopPath, item);
  fs.writeFile(itemPath, '', function(err) {
    if (err) {
      console.log(err);
    }
    else if (program.verbose) {
      console.log("'%s' added to toodo.", item);
    }
  });
}

/**
 * Remove item from list aka Desktop.
 *
 * @api private
 */
function toodoRemove(item) {
  // Delete file at Desktop
  var itemPath = path.join(desktopPath, item);
  fs.unlink(itemPath, function(err) {
    if (err) {
      console.log(err);
    }
    else if (program.verbose) {
      console.log("'%s' removed.", item);
    }
  });
}
