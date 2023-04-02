const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://m001-student:Ibtisam@sandbox.xuwkkn8.mongodb.net/Property?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true
});

module.exports = mongoose.connection;
