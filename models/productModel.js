const mongoose = require("mongoose")

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required : [true,"Please Enter Product Name"],
    },
    price:{
        type: Number,
        required : [true,"Please Enter Price : "],
        // required : true,
    },
},
    
    {
        timestamps : true
    },
    
);

const product = mongoose.model('Product', productSchema);

module.exports = product;