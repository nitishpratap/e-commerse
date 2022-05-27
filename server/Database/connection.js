const mongoose = require('mongoose');
const conn = mongoose.connect('mongodb://localhost:27017/btp',{
    useNewUrlParser: true,
    //   useFindAndModify: false,
      useUnifiedTopology: true
});
conn.then(()=>{
    console.log('connection is sucessfull');
}).catch(function(e){
    console.log(e);
})
module.exports = conn;