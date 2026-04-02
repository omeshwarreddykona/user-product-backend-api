import services from "../services/subCategoryService.js";

export default{

createTheSubCategory(req,res,next){
    services.createSubCategory(req.body).then(result =>{
        res.json(result)
    }).catch(error =>{
        next(error)
    })
},


fetchAllsubCategory(req,res,next){
    services.getAllSubCatergory(req.query).then(result =>{
         if (result.length > 0) {
                res.set(result[0].headers || {});
                res.json(result[0].docs);
            }
            else {
                res.set({
                    "limit": request.query.limit ? request.query.limit : 1,
                    "page": request.query.page ? request.query.page : 1,
                    "total_count": 0,
                    "total_pages": 0
                });
        res.json(result)
            }
    }).catch(error =>{
        next(error)
    })
},

updateSubCategory(req,res,next){
    services.updateSubCategoryById(req.params,req.body).then(result =>{
        res.json(result)
    }).catch(error =>{
        next(error)
    })
},

deleteSubCategory(req,res,next){
    services.deleteSubCategoryById(req.params).then(result =>{
        res.json(result)
    }).catch(error =>{
        next(error)
    })
}

}