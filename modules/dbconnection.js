/*jshint esversion: 6 */

module.exports = function(mongoose, config){

  const dbPath    = "mongodb://" +   config.USER     + ":" +
                                     config.PASS     + "@"+
                                     config.HOST     + ":"+
                                     config.PORT     + "/"+
                                     config.DATABASE;

  console.log('\nAttempting to connect to the mongoDB on the instance ' + config.HOST);

  mongoose.Promise = global.Promise;
  const db = mongoose.connect(dbPath,{useMongoClient: true}).then(
    () => { console.log('Connected to MongoDB');
                    return mongoose.connection;},
    err => {console.log(`Database connection error: ${err.message}`);}
  );

};
