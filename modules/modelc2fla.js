var mongoose  = require('mongoose');
var base58    = require('./base58');
var parameter = require('./parameters');

var CounterSchema = mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counter = mongoose.model('counter', CounterSchema);

// create a schema for our links
var urlSchema = new mongoose.Schema({ id: {type:String, index:true, unique:true},
                                      url: {type: String, index:true, unique: true},
                                      created_at: Date,
                                      hits: {type: Number, default: 0},
                                      shortUrl: String,
                                      username: String
                                    });

urlSchema.pre('save', function(next){ var doc = this;
                                      counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
                                          if (error)
                                              return next(error);
                                          doc.created_at = new Date();
                                          doc.id = counter.seq.toString();
                                          doc.shortUrl = parameter.webhost + base58.encode(counter.seq);
                                          next();
                                      });
                                    });

exports.model = mongoose.model('urlshort',urlSchema);
