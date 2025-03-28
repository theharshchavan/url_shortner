import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    shortID:{
        type: String,
        require: true,
        unique: true,
    },
    redirectURL:{
        type: String,
        require: true,
    },
})


const url = new mongoose.model("url", urlSchema)

export default url