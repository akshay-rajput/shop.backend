let express = require('express');
let router = express.Router();

// middleware for wishlist
router.use(function(req, res, next){
    console.log('Use wishlist router: '+ req.method + ' -- '+ Date.now())
    next()
})

// wishlist route
router.route('/')
.get(function(req, res){
    try{
        res.json({
            success: true, 
            message: 'Wishlist found'
        })
    }catch(error){
        console.log('Error getting wishlist ', error)
        res.status(500).json({
            success: false,
            message: 'Server error',
            errorMessage: error.message
        })
    }

}).post(function(req, res){
    // const { name, price } = req.body
    try{
        console.log('reqBody: ', req.body)
        res.status(201).json({ success: true, message: 'wishlist updated' })
        res.send('wishlist updated')
    }catch(error){
        console.log('Error updating wishlist ', error)
        res.status(500).json({
            success: false,
            message: 'Server error updating the wishlist',
            errorMessage: error.message
        })
    }
    // This will happen on DB
    // const product = { id: idCounter++, name, price }
    // products.push(product)

})

module.exports = router