const express=require("express");
const { UserModel } = require("../models/userModels");
const jwt=require("jsonwebtoken");
const cors=require("cors")
const userRouter=express.Router();
const bcrypt=require("bcrypt");
userRouter.use(express.json());
userRouter.use(cors());
require("dotenv").config();
const key=process.env.key;
userRouter.get("/",async(req,res)=>{
     res.send("home page");
})
userRouter.get("/all",async(req,res)=>{
let data=await UserModel.find();
res.send(data);
})
userRouter.post("/create",async(req,res)=>{
    try {
        // console.log(req.body);
       let payload=req.body;
       await bcrypt.hash(payload.pass, 5,async function(err, hash) {
        // console.log(hash)
        payload.pass= await hash;
        console.log(payload);
       let data=new UserModel(payload);
       await data.save();
       res.send({"msg":"Done"});
    });
    } catch (error) {
        console.log(error);
        res.send("error");
    }
})
userRouter.post("/login",async(req,res)=>{
    try {
       let {Username,pass}=req.body;
       let data=await UserModel.findOne({"Username":Username});
       console.log(req.body);
       console.log(data);
       if(data==null){
        res.send({"msg":"invaild username"})
       }else{
       bcrypt.compare(pass, data.pass).then(function(result) {
        if(result){
            var token = jwt.sign({ userID: data._id,role:data.role}, key);
            res.send({"msg":"login sussfully","token":token});
        }else {
            res.send({"msg":"Wrong Password"});
        }
        
    });
}
userRouter.delete("/delete/:id",async(req,res)=>{
    let id=req.params.id;
    await ProductModel.findByIdAndDelete({"_id":id})
    res.send({"msg":"done"});
})
   
    } catch (error) {
        console.log(error);
        res.send("error");
    }
})

module.exports={
    userRouter
}