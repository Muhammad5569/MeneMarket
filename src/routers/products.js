const express = require('express')
const Product = require('../models/products')

const router = new express.Router()

router.get('/products', async (req, res) => {
    try {
        const products = await Product.find()
        res.send(products)
    } catch (error) {
        res.status(500).send(error)        
    }
})
router.post('/products', async (req, res) => {
    const product = new Product({
        ...req.body,
    })
    try {
        await product.save()
        res.status(201).send(product)
    } catch (error) {
        res.status(500).send(error)
    }
})
