import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name:{type :String,required : true},
    created_by:{type:String},
    deleted_at:{type:Date}
},{
    timestamps:true
});

const Category = mongoose.model("Category",CategorySchema);

export default Category;