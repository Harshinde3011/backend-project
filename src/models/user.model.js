import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";             // used for create token
import bcrypt from "bcrypt";                // used for to hash password 
import dotenv from "dotenv";                // to exports secrets

dotenv.config({
    path: './env'
});

const UserSchema = new Schema(              // on import we have teken {Schema} so don't require to write mongoose.schema 
    {                
        username:{
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            index: true                   // whenever we want to make our field searchable in optimizaed way use index (optional)
        },
        email:{
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        fullname:{
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar:{
            type: String,               // Here we don't store actual img, instead we store it on thirdparty software "Cloudinary" and just store its URL in DB
            required: true,
        },
        coverImage:{
            type: String
        },
        watchHistory:[     // we take array, cause we want to store multiple data into it, suppose user watched 20 videos then its data will reflect here
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password:{
            type: String,           //  type = string cause we will encrypt the password and that should be in string
            required: [true, 'Password is required']
        },
        refreshToken:{
            type: String
        }
    },
    {
        timestamps : true
    }
)


// below code is for encrypting the password
UserSchema.pre("save", async function (next){              // it's a middleware so use "next"
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
} ) 
// pre Hook with event "save" which means, before saving data to db use this hook, and in callback don't use arrow fun cause it doesn't support this keyword, also use async cause it's a time taken process
// we apply if condition line 54, cause suppose user change it's avatar or any other field then this middleware is also invoked and it changes the original password, so to avoid the changing the password everytime, we want to change it, if only user modify password or reset password.

UserSchema.methods.isPasswordCorrect = async function(password){               // custom method
    return await bcrypt.compare(password, this.password)
}
// it will compare the password that user provides and password that is stored in DB


// Below code generate Tokens
UserSchema.methods.generateAccesstoken = async function(){
    return jwt.sign(
    {
        _id: this._id,                                          // left side : payload , right side : DB
        email: this.email,
        username: this.username,
        fullname: this.fullname
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    {
        expireIn: process.env.ACCESS_TOKEN_EXPIRE
    }
)
}

UserSchema.methods.generateRefreshtoken = async function(){
    return jwt.sign(
    {
        _id: this._id,                                          
    }, 
    process.env.REFRESH_TOKEN_SECRET,
    {
        expireIn: process.env.REFRESH_TOKEN_EXPIRE
    }
)
}

const User = mongoose.model('User', UserSchema)

export { User } 