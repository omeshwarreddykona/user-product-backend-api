import services from "../services/productService.js";


export default {

    createTheProduct(req, res, next) {
        services.createProduct(req.body, req.user).then(result => {
            res.json(result)
        }).catch(error => {
            next(error)
        })
    },

    getallProduct(req, res, next) {
        services.getAllProduct(req.query).then(result => {
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
        }).catch(error => {
            next(error)
        })
    },

    getById(req, res, next) {
        services.getProductById(req.params).then(result => {
            res.json( result )
        }).catch(error => {
            next(error)
        })
    },

    updateById(req, res, next) {
        services.UpdateProductbyId(req.params, req.body).then(result => {
            res.json(result )
        }).catch(error => {
            next(error)
        })
    },

    deletebyId(req, res, next) {
        services.deleteandUpdateProductId(req.params).then(result => {
            res.json({ result })
        }).catch(error => {
            next(error)
        })
    }

}