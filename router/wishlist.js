let express = require('express');
let router = express.Router();
const { Wishlist } = require('../models/wishlist.model');
const {extend} = require('lodash')

// middleware for wishlist
router.use(function(req, res, next){
    console.log('Use wishlist router: '+ req.method + ' -- '+ Date.now())
    next()
})

// wishlist route
router.route('/')
.get(async function(req, res){
    try{
        // if wishlist id given, give wishlist else give list of wishlists
        if(req.headers.wishlistId){
            try{
                let wishlist = await Wishlist.findById(req.headers.wishlistId)
            
                res.status(200).json({
                    success: true, 
                    message: 'User wishlist found',
                    wishlist
                })
            }
            catch(err){
                res.status(404).json({
                    success: false, 
                    message: 'wishlist not found',
                })
            }
        }else{
            try{
                let wishlistList = await Wishlist.find({})
            
                res.status(200).json({
                    success: true, 
                    message: 'Showing list of wishlists',
                    wishlists
                })
            }
            catch(err){
                res.status(400).json({
                    success: false,
                    message: "Cannot get list of wishlists, check your request",
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
    if(req.headers.wishlistId){
        const wishlistUpdate = req.body
        try{
            let wishlist = await Wishlist.findById(req.headers.wishlistId)

            wishlist = extend(wishlist, wishlistUpdate)

            wishlist = await wishlist.save()

            req.status(204).json({
                success: true,
                message: "wishlist updated successfully!",
                wishlist
            })
        }catch(error){
            req.status(404).json({
                success: false,
                message: "wishlist not found!",
                error: error
            })
        }
    }
    else{
        try{
            let wishlistToSave = req.body
            wishlistToSave = await wishlistToSave.save()

            res.status(204).json({
                success: true,
                message: "wishlist created",
                wishlist: wishlistToSave
            })
        }catch(err){
            res.status(400).json({
                success: false,
                message: "Error while creating wishlist",
                error: err
            })
        }
    }

})

module.exports = router