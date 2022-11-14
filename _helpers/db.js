const mongoose = require('mongoose');
const config = require('../config.json');

mongoose.connect(config.connectionString);
mongoose.Promise = global.Promise;
module.exports = {
    Home: require('../home/home.model'),
};