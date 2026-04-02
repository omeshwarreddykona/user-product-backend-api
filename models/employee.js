import mongoose from "mongoose";


const EmpolyeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 3, maxlength: 50 },
    lastName: { type: String, minlength: 3, maxlength: 50 },
    displayName: { type: String, minlength:2, maxlength: 20 },
    email: { type: String, required: true, unique: true },
    countryCode: [{ type: String, required: true }],
    phoneNo: { type: String, required: true },
    employeeNumber: { type: String },
    designation: { type: String, required: true },
    department: { type: String, required: true },
    role: [{ name: { type: String }, isactive: { type: Boolean, default: false } }],
    region: [{ type: String }],
    headquarter: [{ type: String }],
    language: [{ type: String }],
    created_by: { type: String },
    deleted_at: { type: Date },
    isactive: { type: Boolean, default: false }
}, {
    timestamps: true
});

const Employee = mongoose.model("Employee", EmpolyeeSchema);

export default Employee;