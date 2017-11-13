/*jshint esversion: 6 */

function isValidUrl(url) {
  // Must comply to this format () means optional:
  // http(s)://(www.)domain.ext(/)(whatever follows)
  let regEx = /^https?:\/\/(\S+\.)?(\S+\.)(\S+)\S*/;
  return regEx.test(url);
}

function containshttp(url) {
  // Checks if the last url has the beginning http:// or https://
  // If it has return without change.
  if(url.substr(0,7)=="http://") return url;
  else if (url.substr(0,8)=="https://") return url;
  // Not finding, returns the url added http: //
  return "http://" + url;
}

module.exports.isvalidurl = isValidUrl;
module.exports.containshttp = containshttp;
