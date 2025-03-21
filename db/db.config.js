import mongoose from "mongoose";

async function connectDB(dbURL) {
    mongoose.connect(dbURL)
    .then(()=>{console.log("DB connected succesfully...")})
    .catch((err)=>{console.log({error: err})})
}

export default connectDB