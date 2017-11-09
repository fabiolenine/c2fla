/*jshint esversion: 6 */

module.exports = function(mongoose)
{
  const Url = require('./modelc2fla');

  let urllongfind = function(urllong, callback){
    Url.model.findOne({long_url: urllong}, function(err,result){
      if(!err) callback(null, result);
      else callback(err, null);
    });
  };

  let urlshortnew = function(urllong, callback){
    let newUrl = new Url.model({
                   long_url: urllong
                 });
    // save the new link
    newUrl.save(function(err,result) {
      if(!err) callback(null, result);
      else callback(err, null);
    });
  };

  let urlidfind = function(id, callback){
    Url.model.findOne({_id: id}, function(err,result){
      if(result) callback(null,result);
      else callback(err,null);
    });
  };

  let regress = {
                  "urllongfind"    : urllongfind,
                  "urlshortnew"    : urlshortnew,
                  "urlidfind"      : urlidfind
                };

  return regress;
};
