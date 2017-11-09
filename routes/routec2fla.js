/*jshint esversion: 6 */
module.exports = function(app,dbcrud,parameter,base58)
{

  app.get('/', function(req, res){
    	res.render('index.ejs');
	});

  app.post('/api/shorten', function(req, res){
    var longUrl = req.body.url;
    var shortUrl = '';

    // check if url already exists in database
    dbcrud.urllongfind(longUrl, function (err, done){

      if (done){
        shortUrl = parameter.webhost + base58.encode(done._id);
        // the document exists, so we return it without creating a new entry
      } else {
        // since it doesn't exist, let's go ahead and create it:
        dbcrud.urlshortnew(longUrl, function (err, done){
          shortUrl = parameter.webhost + base58.encode(done._id);
        });
      }
      res.send({'shortUrl': shortUrl});

    });
  });

  app.get('/:encoded_id', function(req, res){
    var base58Id = req.params.encoded_id;
    var id = base58.decode(base58Id);
    // check if url already exists in database
    dbcrud.urlidfind(id, function(err,done){
      if(done) {
        res.redirect(done.long_url);
        console.log(done.long_url);
        // res.writeHead(301,{Location: done.long_url});
        // res.end();
      }
      else res.redirect(parameter.webhost);
    });

  });

};
