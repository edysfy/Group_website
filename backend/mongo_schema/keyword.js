const mongoose = require('mongoose');

const keywordSchema = new mongoose.Schema({

    keyword: {type: String, required: true},

});

module.exports =  mongoose.model('Keyword',keywordSchema);