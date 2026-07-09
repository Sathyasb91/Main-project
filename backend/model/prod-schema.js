const mongoose = require('mongoose')

const prodSchema = new mongoose.Schema({
    productid:{
        type:Number,
        required:true,
    },
    productname:{
        type:String,
        required:true,
    },
    quantity:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    image:{
        type:Object,
        required:true,
    },
    category: {
    type: String,
    required: true,
    enum: ["Men", "Women", "Kids"], 
    }
    
    
})
module.exports = mongoose.model('products',prodSchema);