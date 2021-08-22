let express = require('express');
const { Product } = require('../models/product.model');
const {extend} = require('lodash')
let router = express.Router();

// middleware for products
// router.use(function(req, res, next){
//     console.log('product router: '+ req.method + ' -- '+ Date())
//     next()
// })

// products route
router.route('/')
.get(async function(req, res){
    try{
        const productList = await Product.find({})

        res.status(200).json({
            success: true,
            products: productList
        })
        
    }catch(error){
        res.status(500).json({
            success: false,
            error,
            message: 'Cannot get products'
        })
    }

}).post(async function(req, res){
    try{
        const product = req.body
        console.log('product: ', product)
        const newProduct = new Product(product);
        console.log('newProduct is : ', newProduct)
        const savedProduct = await newProduct.save()

        res.status(200).json({
            success: true,
            product: savedProduct
        })
    }catch(error){
        console.log('\n error:', error + '\n')
        res.status(500).json({
            success: false,
            message: 'Cannot add product',
            error: error
        })
    }
})

// middleware for RUD ops for single product
router.param("productId", async (req, res, next, productId) => {
    try{
        const product = await Product.findById(productId)

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }

        // set product inside req object to use below 
        req.product = product;
        next();
    }
    catch(error){
        res.status(400).json({
            success: false,
            error,
            message: "Error getting product, please check your request"
        })
    }
})

// single product
router.route('/:productId')
.get((req, res) => {
    // take product out of req object
    let {product} = req

    res.json({
        success: true,
        product: product
    })
    
})
.post(async (req, res) => {
    // the product date passed by client
    const productUpdate = req.body

    // the product which was found by id
    let {product} = req

    product = extend(product, productUpdate)

    product = await product.save()

    res.json({
        success: true,
        product
    })
})
.delete(async (req, res) => {
    let {product} = req
    await product.remove()
    res.json({
        success: true,
        deleted: true,
        product
    })
})

module.exports = router;