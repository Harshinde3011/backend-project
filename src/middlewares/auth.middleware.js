import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"


// Below is method 
export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        const token = await req.cookies?.accessToken || req.header("Authorization").replace("Bearer ","")
    
        if (!token) {
            throw new ApiError(401, "Unauthorised request")
        }
    
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodeToken?._id).select("-password -refreshToken")
    
        if (!user) {
            throw new ApiError(401, "Invalid access token")
        }
    
        req.user = user           // it will set new key "user" in req object, from user which is previously created

        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})