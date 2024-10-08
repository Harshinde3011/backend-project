import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {        
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)    // mongoose return one object
        // console.log("7 mongoose object:",connectionInstance);
        
        console.log(`MONGODB CONNECTED: ${connectionInstance.connection.host}`);            // here we extract particular part from object using "." 
        
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED", error);
        process.exit(1)
    }
}


export default connectDB;