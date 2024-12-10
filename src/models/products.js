const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
    },
    price:{
        type:Number,
        reuqired:true,
        trim:true
    },
    delivery:{
        type:Number,
        trim: true
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product