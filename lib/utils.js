/**
 * Useful native prototype functions.
 */
Object.prototype.extend = function (object) {
  for (var property in object) {
    this[property] = object[property];
  }
};

/**
 * Exposing useful utilities.
 */
var exports = module.exports;
exports.extend({
  getUserHome: getUserHome
});

/**
 * Standard way of getting user's home directory.
 *
 * @return {String} home directory
 * @api public
 */
function getUserHome() {
  return process.env[(process.platform === 'win32') ?
    'USERPROFILE' : 'HOME'];
}
