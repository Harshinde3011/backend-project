import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

// Create method for accesstoken and refreshtoken
const generateAccessAndRefreshTokens = async (userId)=>{
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccesstoken()
        const refreshToken = user.generateRefreshtoken()

    } catch (error) {
        throw new ApiError(500, "Something wents wrong while creating the token")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    // Step 1: get user from frontend
    // Step 2: validation - not empty 
    // Step 3: if user already exists
    // Step 4: check for images, check for avatar, upload them cloudinary
    // Step 5: create entry in DB
    // Step 6: remove password and refresh token field from response
    // Step 7: return response


// Step 1:
    const { fullname, email, username, password } = req.body

// Step 2:
    // if(fullName === "") {
    //     throw new ApiError(400, "Fullname required")
    // }   OR


    if ([fullname, email, password, username].some((field) => 
    field?.trim === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

// Step 3:
    const existedUser = await User.findOne({
        $or: [{email},{username}]
    })

    if(existedUser){
        throw new ApiError(409, "User with email or username is already exists")
    }

// Step 4:  
    const avatarLocalPath = req.files?.avatar[0]?.path   // multer gives u access to files i.e we use req.file, this line gives you origin path of file which is under /public/temp    
    // const coverImageLocalPath = req.files?.coverImage[0]?.path    

    let coverImageLocalPath;

    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files?.coverImage[0]?.path
    }

    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar is required")
    }
    
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);


    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

// Step 5:
    const user = await User.create({
        username: username.toLowerCase(),
        fullname,
        email,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password
    })

// Step 6:
    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if (!createdUser) {
        throw new ApiError(500, "Error while registering the user")
    }

// Step 7:
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

const loginUser = asyncHandler(async (req, res) =>{
    // Step 1: take data from req body
    // Step 2: username or email for login 
    // Step 3: find the user from DB
    // Step 4: check password
    // Step 5: access and refresh token
    // Step 6: send cookies and response

// step 1
    const { email, username, password } = req.body;

// step 2
    if(!email || !username){
        throw new ApiError(400, "Username or email is required")
    }

// step 3

    const user = await User.findOne({
        $or: [{email},{username}]
    })

    if (!user) {
        throw new ApiError(400, "User does not exists")
    }

// step 4
    const isPasswordValide = user.isPasswordCorrect(password)

    if (!isPasswordValide) {
        throw new ApiError(401, "Invalid password")
    }

})


export { 
    registerUser,
    loginUser
}