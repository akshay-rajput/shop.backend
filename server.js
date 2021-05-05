const express = require('express')
const app = express();
const { connectDB } = require('./db/db') 
const requestLog = require('./middleware/requestLog')
const pageNotFound = require('./middleware/pageNotFound')
const errorHandler = require('./middleware/errorHandler')

const productsRouter = require('./router/products')
const cartRouter = require('./router/cart')
const wishlistRouter = require('./router/wishlist')
const usersRouter = require('./router/users')


const port = 8000;

// to parse json from req.body
app.use(express.json())

// log requests
app.use(requestLog)

// db connection call
connectDB()

// route handlers
app.use('/products', productsRouter)
app.use('/cart', cartRouter)
app.use('/wishlist', wishlistRouter)
app.use('/users', usersRouter)

app.get('/', (req, res) => {
  res.send('API page for Shop.Wisp')
  // console.count('\naccessed homepage ')
});

// this should be the last route so it catches any other route which isn't expected
app.use(pageNotFound)

// handle all errors here
app.use(errorHandler)


app.listen(process.env.PORT || port, () => {
  console.log(`Server started ==> listening on port ${port}!`)
});