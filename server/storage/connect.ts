var mongoose = require('mongoose');

var url = 'mongodb://localhost:27017/admin';

mongoose.connect(url);
const connection = mongoose.connection;

connection.on('connected', () => {
  console.log('Connected to MongoDB!');
});

connection.on('error', err => {
  console.log('Connection got error: ' + err.message);
});

connection.on('disconnected', () => {
  console.log('Disconnected');
});

module.exports = mongoose;
