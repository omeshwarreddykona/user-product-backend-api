import User from "../models/user.js";
import secure from "bcrypt";
import jwt from "jsonwebtoken";
import Product from "../models/product.js";
import { ObjectId } from "mongodb";
import { config } from 'dotenv';
config();
const secret = process.env.secret;
const admin_key = process.env.admin_key;






let refreshTokens = [];

export default {


  // signup user

  async signUser(req, res) {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const confirm_password = req.body.confirm_password;




      if (!name) {
        return res.status(422).json({ success: false, message: "Please Enter Name" });
      }

      if (!email) {
        return res.status(422).json({ success: false, message: "Please Enter Email" });
      }

      if (!password) {
        return res.status(422).json({ success: false, message: "Please Enter Password" });
      }

      if (password !== confirm_password) {
        return res.status(422).json({ success: false, message: "Please Check the Password" });
      }



      const existingUser = await User.findOne({ email: email })
      if (existingUser) {
        return res.status(422).json({ success: false, message: "User already existed, Please change your email" })
      }

      const userRole = req.body.admin_key === process.env.ADMIN_KEY ? "admin" : "user";


      
      let hassPassword = await secure.hash(password, 10)
      let data = {
        name: name,
        email: email,
        password: hassPassword,
        role: userRole
      }
      await User.create(data)
      return res.status(201).json({
        success: true,
        message: "User registered successfully"
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message
      });
    }
  },


  // // login 

  async loginUser(req, res) {
    try {

      const email = req.body.email;
      const password = req.body.password;

      let user = await User.findOne({ email: email })
      if (!user) {
        return res.status(400).json({ success: false, message: "User not Found" })
      }
      let comparePassword = await secure.compare(password, user.password);
      if (!comparePassword) {
        return res.status(422).json({ success: false, message: "Password was wrong,please try again" })
      }
      let token = jwt.sign({ user_id: user._id, username: user.name, role: user.role, email: user.email }, secret, { expiresIn: "24h" });
      const refreshToken = jwt.sign({ user_id: user._id, username: user.name, role: user.role }, secret, { expiresIn: "7d" });

      refreshTokens.push(refreshToken);
      return res.status(200).json({ success: true, message: "User logged in successfully", token, refreshToken });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        error: error.message
      });
    }
  },

  // create Product 

  async createProduct(req, res) {
    try {
      const name = req.body.name;
      const category = req.body.category;
      const price = req.body.price;
      const created_by = req.user.email
      if (!name) {
        return res.status(422).json({ success: false, message: "Name is required" })
      };
      if (!category) {
        return res.status(422).json({ success: false, message: "category is required" })
      };
      if (!price) {
        return res.status(422).json({ success: false, message: "Price is required" })
      }
      let data = { name: name, category: category, price: price, created_by: created_by }
      let product = await Product.create(data);
      if (product) {
        return res.status(200).json({ success: true, message: "Product created Successfully" })
      }
    } catch (error) {

      return res.status(422).json({ success: false, message: "Something want wrong" })
    }
  },

  // Get  all the products

  async getAllProduct(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const search = req.query.search;

    try {

      const Query = { deleted_at: null };
      if (search) {
        Query.$or = [
          { name: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } }
        ]
      };
      let products = await Product.find(Query).skip(skip).limit(limit);

      let totalProducts = await Product.countDocuments(Query);


      return res.status(200).json({ success: true, message: "All received the data",  "TotalProducts":totalProducts, "data": products })

    } catch (error) {
      return res.status(422).json({ success: false, message: "We not get the data" })
    }
  },
  // get by Id

  async getproductbyId(req, res) {
    try {
      const id = req.params.id
      let product = await Product.findOne({ _id: new ObjectId(id) })
      // let product = await Product.findById(id);
      if (product) {
        return res.status(200).json({ success: true, message: "we get the data by ID", data: product })
      }
    } catch (error) {
      return res.status(422).json({ success: false, message: "The Id does not exist" })
    }
  },
  // update the product 


  async UpdateProductbyId(req, res) {
    const id = req.params.id;
    let updateProduct = req.body;
    try {
      let findProduct = await Product.findOne({ _id: new ObjectId(id) });
      if (findProduct) {
        let update = await Product.updateOne({ _id: new ObjectId(id) }, { $set: updateProduct })
        if (update) {
          return res.status(200).json({ success: true, message: "succesfully Updated" });
        }
      }
    } catch (error) {
      return res.status(422).json({ success: false, message: "product not updated" })
    }
  },

  // Delete api

  async deleteProductId(req, res) {
    const id = req.params.id;
    try {
      let findProduct = await Product.findOne({ _id: new ObjectId(id) });

      if (findProduct) {
        let deleteproduct = await Product.deleteOne({ _id: new ObjectId(id) });

        if (deleteproduct) {
          return res.status(200).json({ success: true, message: "Product deleted Successfully!","deleted Product":deleteproduct })
        }
      }
    } catch (error) {
      return res.status(422).json({ success: false, message: "Product not exist" })
    }
  },

  // Delete and Update api

  async deleteandUpdateProductId(req, res) {
    const id = req.params.id;
    try {
      let findProduct = await Product.findOne({ _id: new ObjectId(id) });
      if (findProduct) {
        let Update = await Product.updateOne({ _id: new ObjectId(id) }, { $set: { deleted_at: new Date() } });
        if (Update) {
          return res.status(200).json({ success: true, message: "successfully updated","data":Update })
        }
      }
    } catch (error) {
      return res.status(422).json({ success: false, message: "Update not done!" })
    }
  }
}











