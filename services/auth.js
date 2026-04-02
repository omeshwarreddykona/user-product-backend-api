import User from "../models/user.js";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { config } from 'dotenv';
import validator from "validator";
import PasswordValidator from "password-validator";
import blacklist from "../uilites/blacklist.js";
config();


const secret = process.env.secret;







// ----------------------------------------------------------User-API's-----------------------------------------------------------------\\

export default {

  //======= signup user ========//

  async signinUser(body) {
    try {
      Object.keys(body).map(key => { body[key] = typeof body[key] === "string" ? body[key].trim() : body[key] });


      const name = body.name;
      const email = body.email;
      const password = body.password;
      const confirm_password = body.confirm_password
      let schema = new PasswordValidator();

      schema
        .is().min(6)
        .is().max(100)
        .has().uppercase()
        .has().lowercase()
        .has().symbols(1)
        .has().digits(3)
        .has().not().spaces()
        .is().not().oneOf(['password', 'password123']);
      let isvalid_password = schema.validate(password);

      if (!name) {
        throw { code: 422, message: "Please Enter Name" }
      }
      if (!validator.isEmail(email)) {
        throw { code: 422, message: "User already existed, Please change your email" }
      }
      if (!password || !isvalid_password) {
        throw { code: 422, message: "Please enter the correct password" }
      }
      if (!confirm_password) {
        throw { code: 422, message: "Please enter the confirm password" }
      }
      if (password !== confirm_password) {
        throw { code: 422, message: "Password and confirm password are not matched" }
      }
      const existingUser = await User.findOne({ email: email })
      if (existingUser) {
        // return res.status(400).json({ success: false, message: "User already existed, Please change your email" })
        throw { code: 422, message: "User already existed, Please change your email" }
      }
      let hassPassword = await bcrypt.hash(password, 10)
      await User.create({
        name: name,
        email: email,
        password: hassPassword,
        role: "user"
      })
      return { success: true, message: " User signin successfully" }

    } catch (error) {
      return error
    }
  },

  // ===== login ======== // 



  async loginUser(body) {
    try {
      const email = body.email;
      const password = body.password;
      if (!email) {
        throw { code: 400, message: "Please enter the Email" }
      }
      if (!password) {
        throw { code: 400, message: "Please enter the password" }
      }
      let user = await User.findOne({ email: email })
      if (!user) {
        throw { code: 400, message: "User not found!" }
      }
      let comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        throw { code: 400, message: "Password was wrong,please try again" }
      }
      let token = jwt.sign({ user_id: user._id, username: user.name, role: user.role, email: user.email }, secret, { expiresIn: "7d" });
      return { code: 200, message: "User login successfully", token }
    } catch (error) {
      throw error
    }
  },

  // =======admin activation or deactivation ===================//



  async activeAndDeactiveAdmin(req, res) {
    try {
      let isactive = req.body.isactive === true;
      const user = await User.findOne({ _id: new ObjectId(req.params.id) });
      if (!user) {
        return res.status(401).json({ success: false, message: "User not found" })
      }
      let result = await User.updateOne({ _id: new ObjectId(req.params.id) }, { $set: { isactive: !!isactive, role: !!isactive ? "admin" : "user" } })
      if (result.modifiedCount > 0) {
        return res.status(200).json({ success: true, message: "User role is changed" })
      } else {
        return res.status(400).json({ success: false, message: "No changes applied" })
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: "Something went wrong" })
    }
  },


  // ========== log Out Api =========== //

  async logoutUser(req, res) {
    try {
      let token = req.headers.authorization;
      if (!token || !token.startsWith("Bearer ")) {
        return res.status(400).json({ success: false, message: "Token required!" })
      };
      const verifytoken = token.split(" ")[1];
      blacklist.add(verifytoken);
      return res.status(200).json({ success: true, message: "User logout successfully" })
    } catch {
      return res.status(500).json({ success: false, message: "Something went wrong while loggingout" })
    }
  },


  // === getallUsers ==== //

  async getallUsers(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = query.search?.trim();
    try {
      let filter = ({ deleted_at: null });
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } }
        ];
      }
      let result = await User.aggregate([
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
      throw { code: 500, message: error.message }
    }
  },


  //  ============ get user by Id ================//

  async getUserbyID(params) {
    try {
      const id = params.id;
      const getUser = await User.find({ _id: new ObjectId(id) });
      if (getUser) {
        return { code: 200, message: "Fetched the User data by ID", data: getUser }
      }
    } catch (error) {
      throw { code: 500, message: error.message }
    }
  },



  //  ============= Update the User data =================//



  async UpdateUserbyID(body, params) {
    try {
      let findUser = await User.findOne({ _id: new ObjectId(params.id) })
      if (findUser) {
        let UpdateUser = await User.updateOne({ _id: new ObjectId(params.id) }, { $set: body })
        if (UpdateUser) {
          return { code: 200, message: "User data Updated Successfully" }
        }
      }
    } catch (error) {
      throw { code: 500, success: false, message: error.message }
    }
  },
  //  =================== delete the user =================//

  // async DeleteUserbyID(req, res) {
  //   try {
  //     const id = req.params.id;
  //     const deleteUser = req.body;
  //     let findUser = await User.findOne({ _id: new ObjectId(id) });
  //     if (findUser) {
  //       let deleteUserId = await User.deleteOne({ _id: new ObjectId(id) }, { $set: deleteUser });
  //       if (deleteUserId) {
  //         return res.status(200).json({ success: true, message: "User Delete Successfully" })
  //       }
  //     }
  //   } catch (error) {
  //     return res.status(400).json({ success: false, message: "Something went wrong while deleting the user" })
  //   }
  // },

  // =============== update with delete tag =================//

  async deleteUserById(params) {
    try {
      const id = params.id;

      let findUser = await User.findOne({ _id: new ObjectId(id) });
      if (findUser) {
        let updateWithTag = await User.updateOne({ _id: new ObjectId(id) }, { $set: { deleted_at: new Date() } });
        if (updateWithTag) {
          return { code: 200, message: "User is updated with delete tag", data: updateWithTag }
        }
      }
    } catch (error) {
      throw { code: 500, message: error.message }
    }
  },













  //-----------------------------------------------------Product-API's--------------------------------------------------------\\












  // =====================create education information =================================//

  async createEducationInfo(body) {
    try {
      const id = body.id;
      const qualification = body.qualification;
      const college = body.college;
      const percentage = body.percentage;
      if (!qualification) {
        throw { code: 400, message: "Please enter the qualification" }
      }
      if (!college) {
        throw { code: 400, message: "Please enter the college" }
      } if (!percentage) {
        throw { code: 400, message: "Please enter the percentage" }
      }
      let findUser = await User.findOne({ _id: new ObjectId(id) });
      if (!findUser) {
        throw { code: 400, message: "User not found" }
      }
      let data = {
        id: id,
        qualification: qualification,
        college: college,
        specialization: body.specialization,
        university: body.university,
        percentage: percentage,
        location: body.location,
        start: body.start,
        end: body.end
      }
      if (findUser) {
        let createEduInfo = await User.updateOne({ _id: new ObjectId(id) }, { $push: { eduDetails: data } })
        if (createEduInfo) {
          return { code: 201, message: "Education details are created successfully" }
        }
      }
    } catch (error) {
      throw { code: 500, message: error.message }
    }
  },


  // =====================update education information =================================//


  async updateEducationInfo(body) {
    try {
      const id = body.id;
      const edu_id = body.edu_id;
      const qualification = body.qualification;
      const college = body.college;
      const percentage = body.percentage;
      if (!qualification) {
        throw { code: 400, message: "Please enter the qualification" }
      }
      if (!college) {
        throw { code: 400, message: "Please enter the college" }
      } if (!percentage) {
        throw { code: 400, message: "Please enter the percentage" }
      }

      let finduser = await User.findOne({ _id: new ObjectId(id) });

      if (!finduser) {
        throw { code: 404, mesage: "User not found" }
      };

      if (finduser) {
        let updateUser = await User.updateOne({ _id: new ObjectId(id), "eduDetails._id": new ObjectId(edu_id) }, {
          $set: {
            "eduDetails.$.qualification": qualification,
            "eduDetails.$.college": college,
            "eduDetails.$.university": body.university,
            "eduDetails.$.percentage": percentage,
            "eduDetails.$.location": body.location,
            "eduDetails.$.specialization": body.specialization,
            "eduDetails.$.start": body.start || "",
            "eduDetails.$.end": body.end || ""
          }
        });
        if (updateUser) {
          return { code: 200, message: "Education Information updated successfully" }
        }
      }
    } catch (error) {
      throw { code: 500, message: error.message };
    }
  },

  // =================================== delete education api =====================//

  async deleteEducationInfo(body) {
    try {
      const id = body.id;
      const edu_id = body.edu_id;
      if (!id) {
        throw { code: 400, message: "PLease enter the id" }
      }
      if (!edu_id) {
        throw { code: 400, message: "Please enter the field id" }
      }
      let deleteUser = await User.updateOne({ _id: new ObjectId(id), "eduDetails._id": new ObjectId(edu_id) }, { $pull: { eduDetails: { _id: new ObjectId(edu_id) } } });
      if (deleteUser) {
        return { code: 200, message: "education field deleted successfully" }
      }
    } catch (error) {
      throw { code: 500, message: error.message }
    }
  },
  // =============================== create  profDetails api ==========================//

  async createProfInfo(body) {
    try {
      const id = body.id;
      const company = body.company;
      const position = body.position;
      const location = body.location;
      if (!company) {
        throw { code: 400, message: "Please enter the company name" };
      }
      if (!position) {
        throw { code: 400, message: "Please enter the position" };
      }
      if (!location) {
        throw { code: 400, message: "Please enter the location" };
      }

      let findUser = await User.findOne({ _id: new ObjectId(id) });
      if (!findUser) {
        throw { code: 400, message: "User not found" }
      }
      let data = {
        id: id,
        company: company,
        position: position,
        location: location,
        start: body.start,
        end: body.end

      }
      if (findUser) {
        let createProfInfo = await User.updateOne({ _id: new ObjectId(id) }, { $push: { profDetails: data } });
        if (createProfInfo) {
          return { code: 200, message: "ProfInfo created successfully" }
        }
      }
    } catch (error) {
      throw { code: 500, message: error.message }
    }
  },


  // ====================update professional info ===================================// 

  async updateProfInfo(body) {
    try {
      const id = body.id;
      const pro_id = body.pro_id;
      const company = body.company;
      const position = body.position;
      const location = body.location;
      if (!company) {
        throw { code: 400, message: "Please enter the company name" };
      }
      if (!position) {
        throw { code: 400, message: "Please enter the position" };
      }
      if (!location) {
        throw { code: 400, message: "Please enter the location" };
      }

      let findUser = await User.findOne({ _id: new ObjectId(id) });
      if (!findUser) {
        throw { code: 400, message: "User not found" }
      }
      if (findUser) {
        let createProfoInfo = await User.updateOne({ _id: new ObjectId(id), "profDetails._id": new ObjectId(pro_id) }, {
          $set: {
            "profDetails.$.company": company,
            "profDetails.$.position": position,
            "profDetails.$.location": location,
            "profDetails.$.start": body.start || "",
            "profDetails.$.end": body.end || ""

          }
        });
        if (createProfoInfo) {
          return { code: 200, message: "Professional data updated successfully" }
        }
      }
    } catch (error) {
      throw { code: 500, message: error.message }
    }
  },

  async deleteProfInfo(body) {
    try {
      const id = body.id;
      const pro_id = body.pro_id;
      if (!id) {
        throw { code: 400, message: "Please enter the id" }
      }
      if (!pro_id) {
        throw { code: 400, message: "please enter the professional details Id" }
      }
      let deleteProInfo = await User.updateOne({ _id: new ObjectId(id), "profDetails._id": new ObjectId(pro_id) }, { $pull: { profDetails: { _id: new ObjectId(pro_id) } } });
      if (deleteProInfo) {
        return { code: 200, message: "Professional details are deleted successfully" }
      }
    } catch (error) {
      throw { code: 500, message: error.message }
    }
  },

  async uploadProfileImage(body, file) {
    try {
      const userId = body.userId;

      if (!userId) {
        throw { code: 400, message: "Please provide the userId" }
      }
      if (!file) {
        throw { code: 400, message: "Please provide the Image file" }
      }
      const Imagepath = "./uploads/" + file.filename;
      let findUser = await User.findOne({ _id: new ObjectId(userId) });
      if (!findUser) {
        throw { code: 404, message: "User not found" }
      }

      if (findUser.profileImage) {
        const oldpath = "." + findUser.profileImage;
        if (fs.existsSync(oldpath)) {
          fs.unlinkSync(oldpath)
        }
      }

      findUser.profileImage = Imagepath;
      let updateImage = await findUser.save()
      if (updateImage) {
        return { code: 200, message: "Image uploaded successfully", Image: Imagepath }
      }
    } catch (error) {
      throw { code: 500, message: error.message }
    }
  }
}
































