/*jshint esversion: 6 */

module.exports = function(mongoose)
{
  const Url   = require('./modelc2fla');
  const User  = require('./modelusers');

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

  let usersave = function(user, callback){
    let newUser = new User.model({
      id: user
    });
    newUser.save(function(err, result){
      if(!err) callback(null, result);
      else callback(err, null);
    });
  };

  let userfind = function(user, callback){
    User.model.findOne({id: user}, function(err, result){
      if(result) callback(null,result);
      else callback(err,null);
    });
  };

  let userdelete = function(user, callback){
    User.model.remove({id: user},function(err){
      if(err) callback(handleErros(err));
      callback('Removed');
    });
  };

  let regress = {
                  "urllongfind"    : urllongfind,
                  "urlshortnew"    : urlshortnew,
                  "urlidfind"      : urlidfind,
                  "usersave"       : usersave,
                  "userfind"       : userfind,
                  "userdelete"     : userdelete
                };

  return regress;
};
