import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    category_id : {type:mongoose.Schema.Types.ObjectId,required:true},
    subCategoryName:{type:String,required:true},
    deleted_at : {type:Boolean}
},{
    timestamps:true
});

const subCategory = mongoose.model("subCategory",subCategorySchema);
export default subCategory;