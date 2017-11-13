var mongoose = require('mongoose');

// create a schema for our links
var userSchema = new mongoose.Schema({
                                      name: {type: String, index:true, unique: true}
                                    });

exports.model = mongoose.model('user',userSchema);
