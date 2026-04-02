import Category from "../models/category.js";
import subCategory from "../models/subcategory.js";
import { ObjectId } from "mongodb";

export default {

    async createSubCategory(body) {
        try {
            const category_id = body.category_id;
            const subCategoryName = body.subCategoryName;

            if (!category_id) {
                throw{ code:400 , message: "Please enter the category Id" }
            }
            if (!subCategoryName) {
                throw { code : 400, message: "Please enter the subcategory Name" }
            }
            // let existing_category = await subCategory.findOne({category_id:category_id,subCategoryName:subCategoryName,deleted_at:null});
            // if(existing_category){
            //     return res.status(400).json({success:false,message:"subcategory already exists for the category"})
            // }
            let data = {
                category_id: new ObjectId(category_id),
                subCategoryName: subCategoryName
            }
            let existing_category = await subCategory.findOne(data);
            if (existing_category) {
                 return { code : 400, message: "subcategory already exists for the category" }
            }
            let category = await Category.findOne({ _id: new ObjectId(category_id) });
            if (!category) {
                throw { code : 404, message: "Catergory not found" }
            }
            let createSubcategory = await subCategory.create(data);
            if (createSubcategory) {
                return { code: 200, message: "SubCategory is created successfully" }
            }
        } catch (error) {
            throw{ code : 500, message: error.message }
        }
    },

    async getAllSubCatergory(query) {
        let page = parseInt(query.page) || 1;
        let limit = parseInt(query.limit) || 5;
        let skip = (page - 1) * limit;
        let search = query.search?.trim();
        try {
            const filter = ({ deleted_at: null });
            if (search) {
                filter.$or = [

                    { category_id: { $regex: search, $options: "i" } },
                    { subCategoryName: { $regex: search, $options: "i" } }
                ]
            };
         const result = await subCategory.aggregate([

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
            throw { code : 500, message: error.message }
        }
    },

    async updateSubCategoryById(params,body) {
        try {
            const id = params.id;
            let findSubCategory = await subCategory.findOne({ _id: new ObjectId(id) });
            if (findSubCategory) {
                let updateSubCategory = await subCategory.updateOne({ _id: new ObjectId(id)}, { $set: body });
                if (updateSubCategory) {
                    return {code : 200, message: "SubCategory is updated successfully" }
                }
            }
        } catch (error) {
            throw{ code : 500, message: error.message }
        }
    },

    async deleteSubCategoryById(params){
        try{
            const id = params.id;
            let findSubCategory = await subCategory.findOne({_id:new ObjectId(id)});
            if(findSubCategory){
                let deleteSubCatergory = await subCategory.updateOne({_id:new ObjectId(id)},{$set:{deleted_at:true}});
                if(deleteSubCatergory){
                    return {code : 200,message:"Subcategory is deleted successfully"}
                }
            }
        }catch(error){
            throw{ code : 500,message:error.message}
        }
    }
}