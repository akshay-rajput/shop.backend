const mongoose = require("mongoose");
const { Schema } = mongoose;

const wishlistSchema = new Schema({
  _id: Schema.Types.ObjectId,
  products: {
    type: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
      }
    ],
    required: "Cannot add a wishlist without products"
  }

},
{
    timestamps: true,
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = { Wishlist };