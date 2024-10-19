import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema({
    subscriber:{
        type: Schema.types.ObjectId,                  // One who is subscribing 
        ref: "User"
    },
    channel: {
        type: Schema.types.ObjectId,
        ref: "user"                                 // one to whom 'subscriber' is subscribing
    }
},
{
    timestamps: true
})

export const Subscription = mongoose.model("Subscription", subscriptionSchema)