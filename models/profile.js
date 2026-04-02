// import mongoose, { Schema } from "mongoose";

// const educationData = new Schema({
//     qualification : {type:String,required:true},
//     college: {type:String,required:true},
//     specialization : {type:String},
//     university:{type:String},
//     percentage:{type:Number,required:true},
//     start:{type:Date},
//     end:{type:Date}
// });

// const  professionalData = new Schema({
//     company : {type:String,required:true},
//     position:{type:String,required:true},
//     location:{type:String,required:true},
//     start:{type:Date},
//     end:{type:Date}
// })

// const ProfileSchema = new mongoose.Schema({
//     user_id :{type : mongoose.Schema.Types.ObjectId,required:true},
//     // name: { type: String, required: true },
//     // email: { type: String, required: true, unique: true },
//     mobileNo:{type:String,required:true},
//     address:{type:String,required:true},
//     DOB:{type:String,required:true},
//     motherName:{type:String,required:true},
//     fatherName:{type:String,required:true},
//     siblings:{type:String},
//     maritalStatus:{type:String,enum:["single","married","divorced"]},
//     gender:{type:String,enum:["male","Female","others"]},
//     language:[{type:String}],
//     // password: { type: String, required: true }, 
//     created_by:{type:String},
//     deleted_at:{type:Date},
//     // isactive :{type:Boolean,default:false},
//     eduDetails:[educationData],
//     profDetails : [professionalData]

// },{
//     timestamps:true
// });

// const Profile  = mongoose.model("Profile", ProfileSchema);

// export default Profile;