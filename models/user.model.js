const mongoose = require("mongoose");
const { Schema } = mongoose;
require('mongoose-type-url');

const userSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: "User cannot be added without a name",
        minLength: [6, "Name should be atleast 2 character long"] 
    },
    email: {
        type: String,
        required: "User cannot be added without an email" 
    },
    password: {
        type: String,
        required: "User cannot be added without password",
        minLength: [6, "Password should be atleast 6 character long"]
    },
    wishlistId: { type: Schema.Types.ObjectId, ref: "Wishlist" },
    cartId: { type: Schema.Types.ObjectId, ref: "Cart" }
},
{
    timestamps: true,
});

const User = mongoose.model("User", userSchema);


module.exports = { User };