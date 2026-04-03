import services from "../services/categoryService.js";

export default{

createTheCategory(req,res,next){
    services.createCategory(req.body,req.user).then(result =>{
        res.json(result)
    }).catch(error =>{
        next(error)
    })
},

fetchAllCategory(req,res,next){
    services.getAllCategories(req.query).then(result =>{
          if (result.length > 0) {
                res.set(result[0].headers || {});
                res.json(result[0].docs);
            }
            else {
                res.set({
                    "limit": req.query.limit ? req.query.limit : 1,
                    "page": req.query.page ? req.query.page : 1,
                    "total_count": 0,
                    "total_pages": 0
                });
            res.json(result)
            }
    }).catch(error =>{
        next(error)
    })
},

updateCategory(req,res,next){
    services.updateCategoryById(req.params,req.body).then(result =>{
        res.json(result)
    }).catch(error =>{
        next(error)
    })
},

deleteCategory(req,res,next){
    services.deleteCategoryById(req.params).then(result =>{
        res.json(result)
    }).catch(error =>{
        next(error)
    })
}

}