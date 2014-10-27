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
 * Self-calling function to check if dump file present.
 * If not, call makeConfig.
 *
 * @api private
 */
(function startupCheck() {
  // Add more checks here
  if (!fs.existsSync(dumpPath)) {
    makeDump();
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

var NO_COMMAND = program.args.length === 0;

/**
 * When toodo is called without any command.
 *
 * @prints toodo list
 */
if (NO_COMMAND) {
  toodoRead();
}

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

function toodoRead() {
  // Read from dump file .toodo
  var dumpData = getDump();
  console.log(dumpData);
}

/**
 * Add item to list aka Desktop.
 *
 * @api private
 */
function toodoAdd(item) {
  // Update dump file .toodo
  var dumpData = getDump();
  var itemData = {
    name: item,
    created: new Date()
  };
  dumpData.push(itemData);
  setDump(dumpData);

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
