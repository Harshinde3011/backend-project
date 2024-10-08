import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router()

router.route("/register").post(
    upload.fields([                     // we take field cause we want to upload 2 different files 
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)                                       // the uri will be http://localhost:8000/api/v1/users/register

export default router;