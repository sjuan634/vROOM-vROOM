const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vroom-vroom', {
    useUnifiedTopology: true,
    useFindAndModify: false
});

module.exports = mongoose.connection;
