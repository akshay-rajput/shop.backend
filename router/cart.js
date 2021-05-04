let express = require('express');
let router = express.Router();
const { Cart } = require('../models/cart.model');
const {extend} = require('lodash')

// middleware for cart
router.use(function(req, res, next){
    console.log('Use cart router: '+ req.method + ' -- '+ Date.now())
    next()
})

// cart route
router.route('/')
.get(async function(req, res){
    try{
        // if cart id given, give cart else give list of carts
        if(req.headers.cartId){
            try{
                let cart = await Cart.findById(req.headers.cartId)
            
                res.status(200).json({
                    success: true, 
                    message: 'User Cart found',
                    cart
                })
            }
            catch(err){
                res.status(404).json({
                    success: false, 
                    message: 'Cart not found',
                })
            }
        }else{
            try{
                let cartList = await Cart.find({})
            
                res.status(200).json({
                    success: true, 
                    message: 'Showing list of carts',
                    carts
                })
            }
            catch(err){
                res.status(502).json({
                    success: false,
                    message: "Cannot get list of carts, check your request",
                    error: err
                })
            }
        }
        
    }catch(error){
        res.status(500).json({
            success: false,
            message: 'Server error',
            errorMessage: error
        })
    }

}).post(async function(req, res){
    if(req.headers.cartId){
        const cartUpdate = req.body
        try{
            let cart = await Cart.findById(req.headers.cartId)

            cart = extend(cart, cartUpdate)

            cart = await cart.save()

            req.status(204).json({
                success: true,
                message: "Cart updated successfully!",
                cart
            })
        }catch(error){
            req.status(404).json({
                success: false,
                message: "Cart not found!",
                error: error
            })
        }
    }
    else{
        try{
            let cartToSave = req.body
            cartToSave = await cartToSave.save()

            res.status(204).json({
                success: true,
                message: "Cart created",
                cart: cartToSave
            })
        }catch(err){
            res.status(502).json({
                success: false,
                message: "Error while creating cart",
                error: err
            })
        }
    }

})

module.exports = router