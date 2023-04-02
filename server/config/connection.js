const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vroom-vroom', {
    useUnifiedTopology: true,
    useFindAndModify: false,
    useNewUrlParser: true
});

module.exports = mongoose.connection;
