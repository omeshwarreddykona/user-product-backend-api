import Product from "../models/product.js";
import { ObjectId } from "mongodb";





export default {
     // ============== create Product ===================// 

  async createProduct(body,user) {
    try {
      const id = body._id;
      if (id) {
        let product = await Product.findOne({ _id: new ObjectId(id) });
        if (product) {
          const newStatus = !product.isAvailable;
          let updateProduct = await Product.updateOne({ _id: new ObjectId(id) }, { $set: { isAvailable: newStatus } })
          if (updateProduct) {
            return { code : 200, message: newStatus ? "product is available" : "Product is temporary unavailable" }
          }
        }
      } else {
        const name = body.name?.trim();
        const category = body.category?.trim();
        const price = body.price;
        const isAvailable = body.isAvailable;
        const created_by = user.email;

        if (!name) {
          throw { code : 400, message: "Name is required" }
        };
        if (!category) {
          throw { code : 400, message: "category is required" }
        };
        if (!price) {
          throw { code : 400, message: "Price is required" }
        }
        const existingProduct = await Product.findOne({ name: name });
        if (existingProduct) {
          throw { code : 400, message: "The Product already exists" }
        }
        let data = { name: name, category: category, price: price, isAvailable: isAvailable, created_by: created_by }
        let product = await Product.create(data);
        if (product) {
          return { code : 201, message: "Product created but the product is temporary unavailable" }
        }
      }
    } catch (error) {
      throw { code : 500, message: error.message }
    }
  },

  // =============== Get all the products =============== //
  async getAllProduct(query) {

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = query.search?.trim();
    try {
      const filter = { deleted_at: null };
      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } }
        ];
      }
      const result = await Product.aggregate([
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
      throw error
    }
  },
  // ============= get by Id ====================//

  async getProductById(params) {
    try {
      const id = params.id
      let product = await Product.findOne({ _id: new ObjectId(id) })
      if (product) {
        return {code:200, message: "we get the data by ID", data: product }
      }
    } catch (error) {
      throw { code: 500, message: error.message }
    }
  },
  // ================= update the product ===================// 

  async UpdateProductbyId(body,params) {
    const id = params.id;
    let updateProduct = body;
    try {
      let findProduct = await Product.findOne({ _id: new ObjectId(id) });
      if (!findProduct) {
        return { code : 400, message: "Product not found" }
      }
      if (findProduct) {
        let update = await Product.updateOne({ _id: new ObjectId(id) }, { $set: updateProduct })
        if (update) {
          return { code : 200, message: "Product updated successfully" };
        }
      }
    } catch (error) {
      throw { code : 500, message:error.message }
    }
  },

  // =============== Delete api =================//

  // async deleteProductId(req, res) {
  //   const id = req.params.id;
  //   try {
  //     let findProduct = await Product.findOne({ _id: new ObjectId(id) });
  //     if (findProduct) {
  //       let deleteproduct = await Product.deleteOne({ _id: new ObjectId(id) });
  //       if (deleteproduct) {
  //         return res.status(200).json({ success: true, message: "Product deleted Successfully!", "deleted Product": deleteproduct })
  //       }
  //     }
  //   } catch (error) {
  //     return res.status(422).json({ success: false, message: "Product not exist" })
  //   }
  // },

  // ===================== Delete and Update api ====================//

  async deleteandUpdateProductId(params) {
    const id = params.id;
    try {
      let findProduct = await Product.findOne({ _id: new ObjectId(id) });
      if (findProduct) {
        let Update = await Product.updateOne({ _id: new ObjectId(id) }, { $set: { deleted_at: new Date() } });
        if (Update) {
          return { code : 200, message: "successfully updated", "data": Update }
        }
      }
    } catch (error) {
      throw {code : 500, message:error.message}
    }
  },
}