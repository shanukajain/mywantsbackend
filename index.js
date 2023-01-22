const express =require("express");
const { connection } = require("./config/db");
const { ProdcutRouter } = require("./route/productRoute");
const { userRouter } = require("./route/userRoute");
const cors=require("cors");
const { cartRouter } = require("./route/cartRoute");
require("dotenv").config();
const port=process.env.port;
console.log(port)
const app=express();
app.use(cors());
app.use("/",userRouter);
app.use("/product",ProdcutRouter)
app.use("/cart",cartRouter);







app.listen(port,async()=>{
try {
    await connection
    console.log("connected at port ",port)
} catch (error) {
    console.log(error)
}
})