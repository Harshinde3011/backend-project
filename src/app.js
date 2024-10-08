// npm i cors cookie-parser
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit:"16kb"}))           // allow to take 16kb of json data 
app.use(express.urlencoded({ extended: true }));    // to encode url
app.use(express.static("public"))               // used to store some file, images like that and "public" is folders name
app.use(cookieParser())                         // used to access cookies of users browser from server and perform CRUD operation


// routes import 
import userRouter from "./routes/user.route.js"    // we can give any name to import if it is export as a default, export default router 


// route declaration, here we segregated routes and controllers that's why we have use middle to declare route 
app.use("/api/v1/users", userRouter)     // when user hit "/users" it will active "userRegister" this route 

export { app }