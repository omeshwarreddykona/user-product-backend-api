import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: {type:String,enum:["admin","user"],default:"user"},
    email: { type: String, required: true, Unique: true },
    password: { type: String, required: true }, 
    admin_key:{type:String},
    created_by:{type:String}
},{
    timestamps:true
});

const User = mongoose.model("User", UserSchema);

export default User;