const express = require('express')
const app = express();
// const bodyParser = require('body-parser')
// app.use(bodyParser.json());

const products = require('./router/products')
const port = 8000;

app.use('/products', products)

app.get('/', (req, res) => {
  res.send('Hello World!')
  console.count('\naccessed homepage ')
});

app.get('/cart', (req, res) => {
  res.send('cart for..')
});
app.get('/wishlist', (req, res) => {
  res.send('wishlist for ..')
});

// this should be the last route so it catches
// any other route which isn't expected
app.use((req, res) => {
  res.status(404).json({ success: false, message: "the route you're looking for couldn't be found" })
})

// handle all errors here
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Error on server side')
})


app.listen(process.env.PORT || port, () => {
  console.log(`Server started ==> listening on port ${port}!`)
});