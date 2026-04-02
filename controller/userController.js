import { error } from "console";
import services from "../services/auth.js";


export default {



  signInUser(req, res, next) {
    services.signinUser(req.body).then(result => {
      res.json(result)
    }).catch(error => {
      next(error)
    })
  },


  login(req, res, next) {
    services.loginUser(req.body).then(result => {
      res.json(result)
    }).catch(error => {
      next(error)
    })
  },


  getUsers(req, res, next) {
    services.getallUsers(req.query).then(result => {
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
    }).catch(error => {
      next(error)
    })
  },


  getById(req, res, next) {
    services.getUserbyID(req.params).then(result => {
      res.json(result)
    }).catch(error => {
      next(error)
    })
  },



  UpdateUser(req, res, next) {
    services.UpdateUserbyID(req.body, req.params).then(result => {
      res.json({ result })
    }).catch(error => {
      next(error)
    })
  },



  deleteUser(req, res, next) {
    services.deleteUserById(req.params).then(result => {
      res.json(result)
    }).catch(error => {
      next(error)
    })
  },


  creatingEducationInfo(req, res, next) {
    services.createEducationInfo(req.body).then(result => {
      res.json(result)
    }).catch(error => {
      next(error)
    })
  },

  updateTheEducationInfo(req, res, next) {
    services.updateEducationInfo(req.body).then(result => {
      res.json(result)
    }).catch(error => {
      next(error)
    })
  },


  deleteTheEducationInfo(req, res, next) {
    services.deleteEducationInfo(req.body).then(result => {
      res.json(result)
    }).catch(error => {
      next(error)
    })
  },

  createTheProfessionalInfo(req, res, next) {
    services.createProfInfo(req.body).then(result => {
      res.json(result)
    }).catch(error => {
      next(error)
    })
  },

  updateTheProfessionalInfo(req, res, next) {
    services.updateProfInfo(req.body).then(result => {
      res.json(result)
    }).catch(error => {
      next(error)
    })
  },

  deleteTheProfessionalInfo(req, res, next) {
    services.deleteProfInfo(req.body).then(result => {
      res.json(result)
    }).catch(error => {
      next(error)
    })
  },


  uploadImageProfile(req, res, next) {
    services.uploadProfileImage(req.body, req.file).then(result => {
      res.json(result)
    }).catch(error => {
      next(error)
    })
  }
}



