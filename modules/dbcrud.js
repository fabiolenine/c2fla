/*jshint esversion: 6 */

module.exports = function(mongoose)
{
  const Url   = require('./modelc2fla');
  const User  = require('./modelusers');

  let urllongfind = function(urllong, callback){
    Url.model.findOneAndUpdate({url: urllong},{$inc:{hits: 1}}, function(err,result){
      if(!err) callback(null, result);
      else callback(err, null);
    });
  };

  let urlshortnew = function(urllong, userid, callback){
    let newUrl = new Url.model({
                   url: urllong,
                   username: userid
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
      name: user
    });
    newUser.save(function(err, result){
      if(!err) callback(null, result);
      else callback(err, null);
    });
  };

  let userfind = function(user, callback){
    User.model.findOne({name: user}, function(err, result){
      if(result) callback(null,result);
      else callback(err,null);
    });
  };

  let userdelete = function(user, callback){
    User.model.remove({name: user},function(err, result){
      if(err) callback(handleErros(err),null);
      callback(null, result);
    });
  };

  let urldelete = function(id, callback){
    Url.model.remove({_id: id},function(err, result){
      if(err) callback(handleErros(err),null);
      callback(null, result);
    });
  };

  let regress = {
                  "urllongfind"    : urllongfind,
                  "urlshortnew"    : urlshortnew,
                  "urlidfind"      : urlidfind,
                  "urldelete"      : urldelete,
                  "usersave"       : usersave,
                  "userfind"       : userfind,
                  "userdelete"     : userdelete
                };

  return regress;
};
