// The file server/config/database.js
// #1 Import mongoose
const mongoose = require('mongoose');

// #2 Connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

// #3 Add basic event listeners on the mongoose.connection object
mongoose.connection.once('open', () => console.log('Connected to a MongoDB instance'));
mongoose.connection.on('error', error => console.error(error));

// #4 Export mongoose. You’ll use it in server/server.js file
module.exports = mongoose;