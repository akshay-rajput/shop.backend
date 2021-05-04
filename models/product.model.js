const mongoose = require("mongoose");
const { Schema } = mongoose;
require('mongoose-type-url');

const productSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: "Product cannot be added without a name" 
    },
    images: mongoose.SchemaTypes.Url,
    price: {
        type: Number,
        required: "Product cannot be added without a price" 
    },
    rating: Number,
    category: {
        type: String,
        required: "Product cannot be added without category" 
    },
    description: {
        type: String,
        minLength: [10, "Description should be more than 10 character long"] 
    },
    link: {
        type: mongoose.SchemaTypes.Url,
        required: "Product cannot be added without an URL" 
    },
    specs: Array
},
{
    timestamps: true,
});

const Product = mongoose.model("Product", productSchema);


module.exports = { Product };