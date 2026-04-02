import Category from "../models/category.js";
import { ObjectId } from "mongodb";



//========================== Create Category =======================================//

export default {

    async createCategory(body,user) {
        try {
            const name = body.name;
            const created_by = user.email;
            if (!name) {
                throw { code: 400, message: "Please enter the category name" }
            }
            let existingCategory = await Category.findOne({ name: name })
            if (existingCategory) {
                return { code: 400, message: "The category is already exists" }
            }
            let data = { name: name, created_by: created_by }
            let createCategory = await Category.create(data);
            if (createCategory) {
                return { code : 200, message: "Category name is created successfully" }
            }
        } catch (error) {
            throw{ code : 500 , message: error.message }
        }
    },

    // ================================= Get all the Categories ==================================// 

    async getAllCategories(query) {
        const page = parseInt(query.page) || 1;
        const limit = parseInt(query.limit) || 10;
        const skip = (page - 1) * limit;
        const search = query.search?.trim();
        try {
            let filter = ({ deleted_at: null });
            if (search) {
                filter.$or =
                    [
                        { name: { $regex: search, $options: "i" } },
                    ]
            };
         const result = await Category.aggregate([

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
            throw{ code: 500, message: error.message }
        }
    },

    // ======================================== Update Category ==============================================//

    async updateCategoryById(params,body) {
        try {
            const id = params.id;
            let findCategory = await Category.findOne({ _id: new ObjectId(id) });
            if (findCategory) {
                let updateCategory = await Category.updateOne({ _id: new ObjectId(id) }, { $set: body });
                if (updateCategory) {
                    return { code: 200, message: "Catergory data is updated successfully" }
                }
            }
        } catch (error) {
            throw { code : 500, message: error.message }
        }
    },


    // ============================================= Delete Category ================================================// 

    async deleteCategoryById(params) {
        try {
            const id = params.id;

            const findCategory = await Category.findOne({ _id: new ObjectId(id) });
            if (findCategory) {
                let deleteCategory = await Category.updateOne({ _id: new ObjectId(id) }, { $set: { deleted_at: new Date() } })
                if (deleteCategory) {
                    return { code : 200 , message: "Category deleted successfully" }
                }
            }
        } catch (error) {
            throw {code : 500, message: "Something went wrong" }
        }
    }
}