import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.db_url)
        console.log("MongoDB is Connected Successfully!");
    }catch(error){
        console.log("MongoDB Connection Failed!");
        process.exit(1);
    }
};

 export default connectDB;