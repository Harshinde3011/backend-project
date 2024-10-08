// npm i express mongoose dotenv, mongoose-aggregate-paginate-v2, bcrypt, jsonwebtoken, multer, cloudinary
import dotenv from "dotenv";               // still we can't directly use dotenv
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env'
});


// connect DB 
connectDB()
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO DB connection failed", err);
    
})


// check server connection on port 8000, which is export from app.js