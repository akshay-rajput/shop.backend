const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  _id: Schema.Types.ObjectId,
  products: {
    type: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        qty: {
          type: Number,
          min: [1, "Quantity should be greater than or equal to 1"]
        }
      }
    ],
    required: "Cannot add a cart without products"
  }

});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };