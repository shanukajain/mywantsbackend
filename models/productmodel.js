const mongo=require("mongoose")
const ProductSchema=mongo.Schema({
    "name":String,
    "Details":String,
    "Price":Number,
    "Imagesrc":String
})
const ProductModel=mongo.model("product",ProductSchema);
module.exports={
    ProductModel
}