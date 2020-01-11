const mongoose = require('mongoose');
/**
* Set to Node.js native promises
* Per https://mongoosejs.com/docs/promises.html
*/
mongoose.Promise = global.Promise;

//const env = require('./env/environment');

// eslint-disable-next-line max-len
//const mongoUri = `mongodb://${env.accountName}:${env.key}@${env.accountName}.documents.azure.com:${env.port}/${env.databaseName}?ssl=true`;

const mongoUri = 'mongodb+srv://CheckoutAppRW:MihirParkar123@cluster0-waktx.azure.mongodb.net/CheckoutAppDB?retryWrites=true&w=majority';


function connect() {
mongoose.set('debug', true);
return mongoose.connect(mongoUri, { useMongoClient: true });
}

module.exports = {
connect,
mongoose
};