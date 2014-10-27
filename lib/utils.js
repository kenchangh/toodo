/**
 * Exposing useful utilities.
 */
 module.exports.getDateString = getDateString;
 module.exports.getUserHome = getUserHome;

/**
 * Formatting date into a better form.
 *
 * @return {String} date string
 * @api public
 */
function getDateString() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
      dd = '0' + dd;
  }
  if (mm < 10) {
      mm = '0' + mm;
  }

  today = mm+'/'+dd+'/'+yyyy;
  return today;
}

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
