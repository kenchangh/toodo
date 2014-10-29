#! /c/nodejs/node

/**
 * Module dependencies.
 */
var fs = require('fs');
var path = require('path');
var program = require('commander');
var utils = require('./lib/utils');

// Normalized paths
var DUMP_PATH = path.join(utils.getUserHome(), '.toodo');
var DESKTOP_PATH = path.join(utils.getUserHome(), 'Desktop');

/**
 * Module exports.
 */
var exports = module.exports;
exports.extend({
  DUMP_PATH: DUMP_PATH,
  DESKTOP_PATH: DESKTOP_PATH
});

/**
 * Dependencies that require this module's exports,
 * therefore placed below exports.
 */
var dump = require('./lib/dump');
var toodo = require('./lib/toodo');

/**
 * Program options and metadata.
 */
program
  .version('0.0.1')
  .option('-v, --verbose', 'provides more information')
  .option('-i, --interactive', 'interactive prompts for inserting more details');

/**
 * Program commands.
 */
program
  .command('add <item>')
  .description('adds new item to toodo list')
  .action(function (item) {
    toodo.add(item, function () {
      if (program.verbose) {
        console.log("'%s' added to toodo.", item);
        toodo.read();
      }
    });
  });

program
  .command('remove <itemNumber>')//, 'Cross that off your list.')
  .description('check that thing off the list')
  .action(function (itemNumber) {
    toodo.remove(itemNumber, function (itemName) {
      if (program.verbose) {
        console.log("'%s' removed from toodo.", itemName);
        toodo.read();
      }
    });
  });

/**
 * Finally parsing the argv. No extending program after this.
 */
program.parse(process.argv);

// MUST be behind program.parse
var NO_COMMAND = program.args.length === 0;

/**
 * Self-calling function to check if dump file present.
 * If not, call makeConfig.
 *
 * @api private
 */
(function startupCheck() {
  // Add more checks here
  if (!dump.exists) {
    dump.make();
    if (program.verbose) {
      console.log('.toodo created in home directory.');
    }
  }
  else if (program.verbose) {
    console.log('.toodo already present, reading toodo...');
  }
})();

/**
 * When toodo is called without any command.
 *
 * @prints toodo list
 */
if (NO_COMMAND) {
  toodo.read();
}
