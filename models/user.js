import mongoose ,{Schema} from "mongoose";


const educationData = new Schema({
    qualification : {type:String,required:true},
    college: {type:String,required:true},
    specialization : {type:String},
    university:{type:String},
    percentage:{type:Number,required:true},
    location:{type:String},
    start:{type:Date},
    end:{type:Date}
});
// const status = {label:{type:String}}
const  professionalData = new Schema({
    company : {type:String,required:true},
    position:{type:String,required:true},
    location:{type:String,required:true},
    start:{type:Date},
    end:{type:Date}
});

const UserSchema = new mongoose.Schema({

    profileImage :{type:String},
    name: { type: String, required: true },
    role: {type:String,enum:["admin","user","super_admin"],default:"user"},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    designation:{type:String},
    mobileNo:{type:String},
    address:{type:String},
    DOB:{type:String},
    motherName:{type:String},
    fatherName:{type:String},
    siblings:{type:String},
    maritalStatus:{label:{type:String}},
    gender:{label:{type:String}},
    language:[{label:{type:String}}], 
    created_by:{type:String},
    deleted_at:{type:Date},
    eduDetails:[educationData],
    profDetails : [professionalData],
    isactive :{type:Boolean,default:false}
},{
    timestamps:true
});

const User = mongoose.model("User", UserSchema);

export default User;