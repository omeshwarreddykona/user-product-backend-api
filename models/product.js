import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name :{type:String, required:true},
    category:{type:String,required:true},
    price:{type:Number,required:true},
    isAvailable:{type:String},
    created_by:{type:String},
    deleted_at:{type:Date,default:null}
},{
    timestamps:true
});

const product = mongoose.model("product",productSchema);

export default product;