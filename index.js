#! /c/nodejs/node

/**
 * Module dependencies.
 */
var fs = require('fs');
var path = require('path');
var program = require('commander');

/**
 * Standard way of getting user's home directory.
 *
 * @return {String} home directory
 * @api private
 */
function getUserHome() {
  return process.env[(process.platform === 'win32') ?
    'USERPROFILE' : 'HOME'];
}

// Normalized paths
var dumpPath = path.join(getUserHome(), '.toodo');
var desktopPath = path.join(getUserHome(), 'Desktop');

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

var NO_COMMAND = program.args.length === 0;

if (NO_COMMAND) {
  // something here
}


/**
 * Add item to list aka Desktop.
 *
 * @api private
 */
function toodoAdd(item) {
  var itemPath = path.join(desktopPath, item);
  fs.writeFile(itemPath, '', function(err) {
    if (err) {
      console.log(err);
    }
    else if (program.verbose) {
      console.log("'%s' added.", item);
    }
  });
}

/**
 * Remove item from list aka Desktop.
 *
 * @api private
 */
function toodoRemove(item) {
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

