let express = require('express');
let router = express.Router();

// middleware for cart
router.use(function(req, res, next){
    console.log('Use cart router: '+ req.method + ' -- '+ Date.now())
    next()
})

// cart route
router.route('/')
.get(function(req, res){
    try{
        res.json({
            success: true, 
            message: 'Cart found'
        })
    }catch(error){
        console.log('Error getting cart ', error)
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
        res.status(201).json({ success: true, message: 'cart updated' })
        res.send('cart updated')
    }catch(error){
        console.log('Error updating cart ', error)
        res.status(500).json({
            success: false,
            message: 'Server error updating the cart',
            errorMessage: error.message
        })
    }
    // This will happen on DB
    // const product = { id: idCounter++, name, price }
    // products.push(product)

})

module.exports = router