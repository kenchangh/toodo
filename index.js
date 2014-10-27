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
 * Creates empty config file at configPath.
 *
 * @api private
 */
function makeDump() {
  fs.writeFile(configPath, '', function(err) {
    if (err) {
      console.log(err);
    }
  });
}

/**
 * Self-calling function to check if config file present.
 * If not, call makeConfig.
 *
 * @api private
 */
(function startupCheck() {
  // Add more checks here
  if (!fs.existsSync(configPath)) {
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

/**
 * Initiates directory to contain toodos.
 *
 * @param {String} [dir]
 * @api public
 */
function init() {
  var data = getDump();
}


