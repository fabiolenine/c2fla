var mongoose = require('mongoose');

var urlSchema = new mongoose.Schema({ //_id: {type: Number, index: true},
                                      long_url: String,
                                      short_url: String,
                                      created_at: Date,
                                      reused: Date,
                                      seq: {type: Number, default:0}
                                    });

exports.model = mongoose.model('urlshort',urlSchema);
