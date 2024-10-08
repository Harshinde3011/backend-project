import mongoose,{ Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const VideoSchema = new Schema(
    {
        videoFile:{
            type: String,       // came from cloudinary url
            required: true,
        },
        thumbnail:{
            type : String,      // came from cloudinary url
            required: true
        },
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        duration:{
            type: Number,     // when we upload file in cloudinary it will send the info about it,like duration,size. so we'll take it from cloudinary
            required: true
        },
        views:{
            type: Number,
            default: 0
        },
        isPublished:{
            type: Boolean,
            default: true
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamp : true
    }
)

VideoSchema.plugin(mongooseAggregatePaginate)      // to use aggregate pipeline queries 

const Video = mongoose.model("Video", VideoSchema)

export {Video}