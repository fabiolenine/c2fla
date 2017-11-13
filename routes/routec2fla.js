/*jshint esversion: 6 */
module.exports = function(app,dbcrud,parameter,base58,utils)
{

  // app.get('/', function(req, res){
  //   	res.render('index.ejs');
	// });
  //
  // app.post('/api/shorten', function(req, res){
  //   var longUrl = utils.containshttp(req.body.url);
  //   var shortUrl = '';
  //
  //   if(utils.isvalidurl(longUrl)){
  //     // check if url already exists in database
  //     dbcrud.urllongfind(longUrl, function (err, done){
  //
  //       if (done){
  //         shortUrl = parameter.webhost + base58.encode(done._id);
  //         res.send({'shortUrl': shortUrl});
  //         // the document exists, so we return it without creating a new entry
  //       } else {
  //         // since it doesn't exist, let's go ahead and create it:
  //         dbcrud.urlshortnew(longUrl, function (err, done){
  //           shortUrl = parameter.webhost + base58.encode(done._id);
  //           res.send({'shortUrl': shortUrl});
  //         });
  //       }
  //     });
  //   }
  //   else res.send({'shortUrl': 'Invalid URL format. Input URL must comply to the following: http(s)://(www.)domain.ext(/)(path)'});
  //
  // });

  app.get('/urls/:encoded_id', function(req, res){
    var base58Id = req.params.encoded_id;
    var id = base58.decode(base58Id);
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
    var id = base58.decode(base58Id);
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
          shortUrl = parameter.webhost + base58.encode(done._id);
          res.status(200).send({ 'id': done._id, // ID da url
                            'hits': done.hits, // Quantidade de hits nela
                            'url': done.url, // A url original
                            'shortUrl': done.shortUrl // A url curta formada
                          });
          // the document exists, so we return it without creating a new entry
        } else {
          // since it doesn't exist, let's go ahead and create it:
          dbcrud.urlshortnew(longUrl, user, function (err, done){
            // shortUrl = parameter.webhost + base58.encode(done._id);
            res.status(201).send({ 'id': done._id, // ID da url
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
    dbcrud.urlstats(function(result){
      res.json(result);
    });
  });

};
