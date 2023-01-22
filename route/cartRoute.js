const express=require("express");
const { authenticate } = require("../middleware/authantication");
const { cartModel } = require("../models/cartModel");
const cartRouter=express.Router();
cartRouter.use(express.json());
cartRouter.use(authenticate);
cartRouter.get("/",(req,res)=>{
    console.log(req.body);
    res.send("cart page")
})
cartRouter.post("/create",async(req,res)=>{
    try {
       let payload=req.body;
       console.log(req.body);
       let data=new cartModel(payload);
       await data.save();
       res.send({"msg":"done"})
    } catch (error) {
        console.log(error);
        res.send("error");
    }
})

cartRouter.get("/all",async(req,res)=>{
    try {
        let data=await cartModel.find({userID:req.body.userID});
        res.send(data);
    } catch (error) {
        res.send(error);
    }
})
cartRouter.delete("/delete/:id",async(req,res)=>{
    try {
        let id=req.params.id;
        let data=await cartModel.findOne({"_id":id})
        if(data.userID===req.body.userID)
    {
        await cartModel.findByIdAndDelete({"_id":id})
        res.send({"msg":"done"});
    }else {
        req.send({"msg":"Not Authrized"});
    }
    } catch (error) {
        console.log(error);
        res.send("error");
    }
})
module.exports={
    cartRouter
}