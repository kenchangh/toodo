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
 * Self-calling function to check if dump file present.
 * If not, call makeConfig.
 *
 * @api private
 */
(function startupCheck() {
  // Add more checks here
  if (!fs.existsSync(DUMP_PATH)) {
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
    toodo.add(item);
  });

/**
 * Finally parsing the argv. No extending program after this.
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
  toodo.read();
}
