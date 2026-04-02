import { error } from "console";
import services from "../services/employeeService.js";

export default{

creatingTheEmployee(req,res,next){
    services.createEmpolyee(req.body).then(result =>{
        res.json({result})
    }).catch(error =>{
        next(error)
    })
},


fetchTheEmployees(req,res,next){
    services.getAllEmployees(req.query).then(result =>{
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
                res.json(result);
            }
    }).catch(error =>{
        next(error)
    })
},

updateTheEmployee(req,res,next){
    services.updateEmployeeById(req.params,req.body).then(result => {
        res.json(result)
    }).catch(error =>{
        next(error)
    })
},


deleteEmployee(req,res,next){
    services.deleteEmployeeById(req.params).then(result => {
        res.json(result)
    }).catch(error =>{
        next(error)
    })
}
}