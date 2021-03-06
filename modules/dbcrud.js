/*jshint esversion: 6 */

module.exports = function(mongoose)
{
  const Url   = require('./modelc2fla');
  const User  = require('./modelusers');

  let urllongfind = function(urllong, callback){
    Url.model.findOne({url: urllong}, function(err,result){
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
    Url.model.findOneAndUpdate({id: id}, { $inc: {hits: 1}}).exec(function(err,result){
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
    Url.model.remove({id: id},function(err, result){
      if(err) callback(handleErros(err),null);
      callback(null, result);
    });
  };

  let urlstats = function(callback){
    Url.model.find({},{_id:0, id: 1, hits: 1, url: 1, shortUrl: 1}).sort({'hits': -1}).limit(10).exec(function(err, result) {
      if (err) callback(err,null);
      else {
        Url.model.aggregate([{$group: {
            _id: null,
            hits: {$sum: "$hits"},
            urlCount: {$sum: 1}
           }},
          {$project:{_id:0,hits:1,urlCount:1}}],function(err, done){
            if(done){
              let doneJson = {
                'hits': done[0].hits,
                'urlCount': done[0].urlCount,
                'topUrls': result
              };

              callback(null, doneJson);
            } else callback(err, null);
          });
      }
    });
  };

  let urlstatsid = function(id, callback){
    Url.model.findOne({id: id},{_id:0, id: 1, hits: 1, url: 1, shortUrl: 1}).exec(function(err, result) {
      if (err) callback(err,null);
      else callback(null, result);
    });
  };

  let usersstats = function(user, callback){
    Url.model.find({username: user},{_id:0, id: 1, hits: 1, url: 1, shortUrl: 1}).sort({'hits': -1}).limit(10).exec(function(err, result) {
      if (err) callback(err,null);
      else if(result.length > 0){
        Url.model.aggregate([{$match:{username: user}},
          {$group: {
            _id: null,
            hits: {$sum: "$hits"},
            urlCount: {$sum: 1}
           }},
          {$project:{_id:0,hits:1,urlCount:1}}],function(err, done){
            if(done){
              let doneJson = {
                'hits': done[0].hits,
                'urlCount': done[0].urlCount,
                'topUrls': result
              };

              callback(null, doneJson);
            } else callback(err, null);
          });
      } else callback('User not Found...', null);
    });
  };

  let regress = {
                  "urllongfind"    : urllongfind,
                  "urlshortnew"    : urlshortnew,
                  "urlidfind"      : urlidfind,
                  "urldelete"      : urldelete,
                  "usersave"       : usersave,
                  "userfind"       : userfind,
                  "userdelete"     : userdelete,
                  "urlstats"       : urlstats,
                  "urlstatsid"     : urlstatsid,
                  "usersstats"     : usersstats
                };

  return regress;
};
