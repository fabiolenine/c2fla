/*jshint esversion: 6 */
module.exports = function(app,dbcrud)
{

  app.get('/', function(req, res){
    	res.render('index.ejs');
	});

  app.post('/api/shorten', function(req, res){
    var longUrl = req.body.url;
    var shortUrl = '';

    // check if url already exists in database
    dbcrud.findOne({long_url: longUrl}, function (err, doc){
      if (doc){
        shortUrl = config.webhost + base58.encode(doc._id);

        // the document exists, so we return it without creating a new entry
        res.send({'shortUrl': shortUrl});
      } else {
        // since it doesn't exist, let's go ahead and create it:
        var newUrl = Url({
          long_url: longUrl
        });

        // save the new link
        newUrl.save(function(err) {
          if (err){
            console.log(err);
          }

          shortUrl = config.webhost + base58.encode(newUrl._id);

          res.send({'shortUrl': shortUrl});
        });
      }

    });

  });

};
