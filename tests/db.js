// const mongoose = require('mongoose');
// const { MongoMemoryServer } = require('mongodb-memory-server');

// const mongo = new MongoMemoryServer();

// // connect to db
// module.exports.connect = async () => {
//   const uri = await mongo.getUri();
//   const mongooseOpts = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     poolSize: 10
//   };
//   await mongoose.connect(uri, mongooseOpts);
// };

// // disconnect and close connection
// module.exports.closeDB = async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.closer();
//   await mongo.stop();
// };

// // clear the db, remove all data
// module.exports.clearDB = async () => {
//   const collections = mongoose.connection.collections;
//   for (const key in collections) {
//     const collection = collections[key];
//     await collection.deleteMany();
//   }
// };

