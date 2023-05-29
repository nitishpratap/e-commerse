const mongoose = require('mongoose');

const monngodb_url = 'mongodb+srv://nitish:nitishpratap@cluster0.r8fqbuf.mongodb.net/eTrade?retryWrites=true&w=majority'
let conn = mongoose.connect(monngodb_url,
    err => {
        if(err) throw err;
        console.log('connected to MongoDB with command ',monngodb_url);
    });

module.exports= conn
