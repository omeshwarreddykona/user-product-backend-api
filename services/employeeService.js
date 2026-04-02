import Employee from "../models/employee.js";
import phoneValidator from "../uilites/phoneNumberValidator.js";
import validator from "validator";
import { ObjectId } from "mongodb";
// import jwt from "jsonwebtoken";
import { config } from 'dotenv';
config();

const secret = process.env.secret;

export default {

  async createEmpolyee(body) {
    try {
      const firstName = body.firstName.trim();
      const email = body.email.trim();
      const countryCode = body.countryCode;
      const phoneNo = body.phoneNo;
      const designation = body.designation.trim();
      const department = body.department.trim();

      if (!firstName) {
        throw { code : 400, message: "Please Enter Name" };
      }
      if (!validator.isEmail(email)) {
        throw { code : 400, message: "Please enter the valid email" }
      }
      if (!countryCode) {
        throw { code : 400, message: "Please select the countrycode" }
      }
      if (!phoneNo) {
        throw { code : 400, message: "Please enter the mobile number" }
      }
      if (!designation) {
        throw { code : 400, message: "PLease enter the designation" }
      }
      if (!department) {
        throw { code : 400, message: "Please enter the department" }
      }

      let Phoneresult = phoneValidator.validatePhone(phoneNo, countryCode);
      if (!Phoneresult.isValid) {
        throw { code : 400, message: "Invalid Number for the selcted country" }
      };
      const existingUser = await Employee.findOne({ email: email })
      if (existingUser) {
        throw { code : 400, message: "User already existed, Please change your email" }
      }
      const existPhoneNumber = await Employee.findOne({ phoneNo: Phoneresult.formatedNumber });
      if (existPhoneNumber) {
        throw { code : 400, message: "Phone Number exists,Please enter another number" }
      }
      let data = {
        firstName: firstName,
        lastName: body.lastName,
        displayName:body.displayName,
        email: email,
        countryCode: countryCode,
        phoneNo: Phoneresult.formatedNumber,
        designation: designation,
        department: department
      }
      await Employee.create(data)
      return { code: 200, message: "Employee created successfully"}
    } catch (error) {
      throw  {code:500,message: error.message}
    }
  },

  // ===== login ======== // 

  // async loginEmpolyee(req, res) {
  //   try {
  //     const email = req.body.email;
  //     if (!email) {
  //       return res.status(400).json({ success: false, message: "Email is required" })
  //     }
  //     let user = await Employee.findOne({ email: email })

  //     if (!user) {
  //       return res.status(400).json({ success: false, message: "Empolyee not Found" })
  //     }
  //     let token = jwt.sign({ Employee_id: user._id, EmployeeName: user.firstName, email: user.email }, secret, { expiresIn: "7d" });
  //     return res.status(200).json({ success: true, message: "Employee login successfully", token });
  //   } catch (error) {
  //     return res.status.json({
  //       success: false, message: error.message,
  //     });
  //   }
  // }

  async getAllEmployees(query) {

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = query.search?.trim();
    try {
      const filter = ({ deleted_at: null });
      if (search) {
        filter.$or = [
          { firstName: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } }
        ]
      };
      const result = await Employee.aggregate([

        { $match: filter },
        { $group: { _id: null, docs: { $push: "$$ROOT" }, totalcount: { $sum: 1 } } },
        { $unwind: '$docs' },
        { $sort: { "docs._id": -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $group: {
            _id: null,
            docs: { $push: '$docs' },
            headers: {
              $first: {
                total_count: '$totalcount',
                total_pages: {
                  $ceil: {
                    $divide: ['$totalcount', limit]
                  }
                },
                current_page: page,
                limit: limit
              }
            }
          }
        }
      ]).exec();
      return result;
     

    } catch (error) {
      throw {code:500, message:error.message}
    }
  },

    async getEmpolyeeById(req, res) {
      try {
        const id = req.params.id
        let find = await Employee.findOne({ _id: new ObjectId(id) })
        if (find) {
          return res.status(200).json({ success: true, message: "we get the data by ID", data: find })
        }
      } catch (error) {
        return res.status(422).json({ success: false, message: "The Id does not exist" })
      }
    },

  async updateEmployeeById(params,body) {
    try{
    const id = params.id;
    let findEmployee = await Employee.findOne({ _id: new ObjectId(id) });
    if (findEmployee) {
      let update = await Employee.updateOne({ _id: new ObjectId(id) }, { $set: body })
      if (update) {
        return {code: 200, message: "Employee data updated successfully"}
      }
    }
  }catch(error){
    throw {code:500,message:error.message}
  }
},

  async deleteEmployeeById(params) {
    try {
      const id = params.id;
      let findEmployee = await Employee.findOne({_id: new ObjectId(id)});
      if (findEmployee) {
        let deleteEmployee = await Employee.updateOne({_id:new ObjectId(id) }, { $set: { deleted_at: new Date() } })
        if (deleteEmployee) {
          return {code:200 , message: "Empolyee deleted successfully" }
        }
      }
    } catch (error) {
      throw {code : 500, message: error.message }
    }
  }
}
