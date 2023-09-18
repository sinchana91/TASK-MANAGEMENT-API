const express=require("express");
const app=express();
const dotenv=require("dotenv");
const mongoose=require("mongoose");
const multer =require("multer");
const authRoute=require("./routes/auth");
const taskRoute=require("./routes/task");
const PORT=process.env.PORT ||3000;
dotenv.config();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("connect to DB");
}).catch(err=>{
    console.log("Error connecting to DB",err);
});


app.use("/auth",authRoute);
app.use("/task",taskRoute);


app.listen(PORT,()=>{
    console.log("server is running on  backend",`localhost:${PORT}`);
});
