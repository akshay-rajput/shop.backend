let express = require('express');
let router = express.Router();

// middleware for products
router.use(function(req, res, next){
    console.log('Use product router middleware: ', Date.now())
    next()
})

// products route
router.route('/')
.get(function(req, res){
    res.send('sending product list...')
}).post(function(req, res){
    // const { name, price } = req.body
    console.log('reqBody: ', req.body)
    res.send(req.body)
    // This will happen on DB
    // const product = { id: idCounter++, name, price }
    // products.push(product)

    // Sucess will be returned
    // res.status(201).json({ success: true, product })
    // res.send('product added')
})

// single product
router.route('/:productId')
.get((req, res) => {
    const { productId } = req.params
    // console.log( ' getting-> ', productId)
    // const product = products.find(product => product.id === parseInt(id, 10))
    res.send(productId)
    // if (product) {
    //   return res.json({ product, success: true })
    // } 
    // res.status(404).json({ success: false, message: "The product ID sent has no product associated with it. Check and try again"})
  })
.post((req, res) => {
    const { productId } = req.params
    const updateProduct = req
    console.log('product to update: ', productId + '\n ', req.body)
    // res.send(updateProduct)
    // Temp code, will be replaced by DB
    // products.forEach(product => {
    //   if (product.id === parseInt(id, 10)) { // match
    //     Object.keys(updateProduct).forEach(key => {
    //     if (key in product) {
    //       product[key] = updateProduct[key]
    //     }
    //    })
    //   }
    // })
  
    // res.json({ products, success: true })
})

.delete((req, res) =>  res.json({ success: false, message: "delete not implemented"}))
  
module.exports = router;