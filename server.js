const express = require('express')
const app = express();
const requestLog = require('./middleware/requestLog')
const pageNotFound = require('./middleware/pageNotFound')
const errorHandler = require('./middleware/errorHandler')

// const bodyParser = require('body-parser')
// app.use(bodyParser.json());

const productsRouter = require('./router/products')
const cartRouter = require('./router/cart')
const wishlistRouter = require('./router/wishlist')

const port = 8000;

// log requests
app.use(requestLog)

// db connection call


// route handlers
app.use('/products', productsRouter)
app.use('/cart', cartRouter)
app.use('/wishlist', wishlistRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
  console.count('\naccessed homepage ')
});

// this should be the last route so it catches any other route which isn't expected
app.use(pageNotFound)

// handle all errors here
app.use(errorHandler)


app.listen(process.env.PORT || port, () => {
  console.log(`Server started ==> listening on port ${port}!`)
});