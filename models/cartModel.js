const mongo=require("mongoose")
const cartSchema=mongo.Schema({
    "name":String,
    "Details":String,
    "Price":Number,
    "Imagesrc":String,
    "userID":String
})
const cartModel=mongo.model("cart",cartSchema);
module.exports={
    cartModel
}