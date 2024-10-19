// here we upload files from local to cloudinary. store to folder "public" then store to cloudinary

import {v2 as cloudinary } from "cloudinary"
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY  // Click 'View API Keys' above to copy your API secret
});


const uploadOnCloudinary = async(localFilePath) => {                  // to upload file from local to cloudinary
    try {

        if(!localFilePath) return null;                        
        
        // upload the file on cloudinary
        let response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })

        
        // file has been uploaded successfully 
        console.log("File is uploaded on cloudinary",response.url);

        fs.unlinkSync(localFilePath)

        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)  // remove the locally saved temporary file as the upload operation got failed 

        return null;
    }
}

export {
    uploadOnCloudinary
}