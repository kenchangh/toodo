#! /c/Program\ Files/nodejs/node

var fs = require('fs');
var path = require('path');

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

// Normalized dump path
var dumpPath = path.join(getUserHome(), '.toodo');

/**
 * Creates empty dump file at dumpPath.
 *
 * @api private
 */
function makeDump() {
  fs.writeFile(dumpPath, '{}', function(err) {
    if (err) {
      console.log(err);
    }
  });
}

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
function updateDump(data) {
  fs.writeFile(dumpPath, JSON.stringify(data), function(err){
    if (err) {
      console.log(err);
    }
  });
}

/**test
 * Initiates directory to contain toodos.
 *
 * @param {String} [dir]
 * @api public
 */
function init(dir) {
  if (typeof dir === undefined) {
    dir = process.cwd();
  }
  var data = getDump();
  data.dirs = [dir];
}
