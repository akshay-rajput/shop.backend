const express = require('express')
const cors = require('cors');
const app = express();
const { connectDB } = require('./db/db') 
const requestLog = require('./middleware/requestLog')
const pageNotFound = require('./middleware/pageNotFound')
const errorHandler = require('./middleware/errorHandler')

const productsRouter = require('./router/products')
const cartRouter = require('./router/cart')
const wishlistRouter = require('./router/wishlist')
const usersRouter = require('./router/users')
const paymentsRouter = require('./router/payments')


const port = 8000;

// to parse json from req.body
app.use(express.json())

app.use(cors());
// cors
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://shop-wisp.netlify.app");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

// log requests
app.use(requestLog)

// db connection call
connectDB()

// route handlers
app.use('/products', productsRouter)
app.use('/cart', cartRouter)
app.use('/wishlist', wishlistRouter)
app.use('/users', usersRouter)
app.use('/payments', paymentsRouter);

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