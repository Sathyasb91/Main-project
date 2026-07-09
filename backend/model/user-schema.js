const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    gender:{
         type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    phoneno:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:false,
    },
    wishlist: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'products' 
    }],
    cart: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    quantity: { type: Number, default: 1 }
  }],
})

module.exports = mongoose.model('users', userSchema);