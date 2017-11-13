/*jshint esversion: 6 */
module.exports = function(app,dbcrud,base58,utils)
{

  app.get('/urls/:encoded_id', function(req, res){
    var base58Id = req.params.encoded_id;
    var id = base58.decode(base58Id).toString();
    // check if url already exists in database
    dbcrud.urlidfind(id, function(err,done){
      if(done) { //res.redirect(301,done.url);
        res.writeHead(301, {'Location' : done.url});
	      res.end();
      } else res.status(404).send('Sorry cant find that!');
    });

  });

  app.post('/users', function(req, res){
    var user = req.body.id;

    dbcrud.userfind(user, function(err, done){
      if (done) res.status(409).send({'id': done.name});
      else {
        dbcrud.usersave(user,function (err, done){
            if(done) res.status(201).send({'id': done.name});
            else res.send('Error trying to save');
        });
      }
    });
  });

  app.delete('/user/:userId', function(req, res){
    var user = req.params.userId;
    dbcrud.userdelete(user,function(err, done){
      if (done) res.send('');
      else res.send('Error');
    });
  });

  app.delete('/urls/:encoded_id', function(req, res){
    var base58Id = req.params.encoded_id;
    var id = base58.decode(base58Id).toString();
    dbcrud.urldelete(id,function(err, done){
      if (done) res.send('');
      else res.send('Error');
    });
  });

  app.post('/users/:userid/urls', function(req, res){
    var user = req.params.userid;
    var longUrl = utils.containshttp(req.body.url);
    var shortUrl = '';

    if(utils.isvalidurl(longUrl)){
      // check if url already exists in database
      dbcrud.urllongfind(longUrl, function (err, done){
        if (done){
          res.status(200).send({ 'id': done.id, // ID da url
                            'hits': done.hits, // Quantidade de hits nela
                            'url': done.url, // A url original
                            'shortUrl': done.shortUrl // A url curta formada
                          });
          // the document exists, so we return it without creating a new entry
        } else {
          // since it doesn't exist, let's go ahead and create it:
          dbcrud.urlshortnew(longUrl, user, function (err, done){
            res.status(201).send({ 'id': done.id, // ID da url
                              'hits': done.hits, // Quantidade de hits nela
                              'url': done.url, // A url original
                              'shortUrl': done.shortUrl // A url curta formada
                            });
          });
        }
      });
    }
    else res.send({'shortUrl': 'Invalid URL format. Input URL must comply to the following: http(s)://(www.)domain.ext(/)(path)'});
  });

  app.get('/stats', function(req, res){
    dbcrud.urlstats(function(err, done){
      if (err) res.status(404).send('error:',err);
      else res.json(done);
    });
  });

  app.get('/stats/:encoded_id', function(req, res){
    var base58Id = req.params.encoded_id;
    var id = base58.decode(base58Id).toString();
    dbcrud.urlstatsid(id, function(err, done){
      if (err) res.status(404).send('Not Found');
      else res.json(done);
    });
  });

  app.get('/users/:userId/stats', function(req, res){
    var user = req.params.userId;
    dbcrud.usersstats(user, function(err, done){
      if (err) res.status(404).send(err);
      else res.json(done);
    });
  });

};
