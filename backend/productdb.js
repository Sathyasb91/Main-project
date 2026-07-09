var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/products');

var productdb = mongoose.connection;

productdb.on('error', console.error.bind(console, 'Connection error'));

productdb.once('open', function(){
    console.log("Connection Successfull !")
})

module.exports = productdb