const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    products:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Product'
    }
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category