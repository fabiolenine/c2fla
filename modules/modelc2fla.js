var mongoose = require('mongoose');

var CounterSchema = mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var counter = mongoose.model('counter', CounterSchema);

// create a schema for our links
var urlSchema = new mongoose.Schema({ _id: Number,
                                      long_url: {type: String, index:true, unique: true},
                                      created_at: Date
                                    });

urlSchema.pre('save', function(next){ var doc = this;
                                      counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
                                          if (error)
                                              return next(error);
                                          doc.created_at = new Date();
                                          doc._id = counter.seq;
                                          next();
                                      });
                                    });

exports.model = mongoose.model('urlshort',urlSchema);
