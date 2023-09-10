const express=require("express");
const app=express();
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const multer =require("multer");
const authRoute=require("./routes/auth");
const PORT=process.env.PORT ||3000;
dotenv.config();


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("connect to DB");
}).catch(err=>{
    console.log("Error connecting to DB",err);
});


app.use("/routes/auth",authRoute);

app.listen(PORT,()=>{
    console.log("server is running on  backend",`localhost:${PORT}`);
});
