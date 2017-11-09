/*jshint esversion: 6 */

module.exports = function(mongoose, config){

  const dbPath    = "mongodb://" +   //config.USER     + ":" +
                                     //config.PASS     + "@"+
                                     config.HOST     + ":"+
                                     config.PORT     + "/"+
                                     config.DATABASE;

  console.log('\nAttempting to connect to the mongoDB on the instance ' + config.HOST);

  mongoose.Promise = global.Promise;
  const db = mongoose.connect(dbPath,{useMongoClient: true})
      .then(() => { console.log('Connected to MongoDB');
                    return mongoose.connection;})
      .catch(err => {console.log(`Database connection error: ${err.message}`);});

  // if ( !(db) ) console.log('Unable to connect to mongoDB');
  // else console.log('Connected to mongoDB');

  // connection failed event handler
  // mongoose.connection.on('error: ', function(err){console.log('Database connection error: '+err);}); // mongoose.connection.on()

  // connection successful event handler:
  // check if the db already contains a greeting. if not, create one and save it to the db
  // mongoose.connection.once('open', function(){console.log('Database '+config.DATABASE+' is now available in '+config.HOST );});


};
