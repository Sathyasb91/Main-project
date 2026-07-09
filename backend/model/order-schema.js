const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            },
            quantity: Number,
        },
    ],
    total: Number,
    address:{
        name: String,
        phone: String,
        address: String,
        city: String,
        pincode: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("orders", orderSchema);