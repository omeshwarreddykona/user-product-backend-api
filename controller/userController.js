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
      res.set({
        "totalCount": result.meta.totalCount,
        "totalPages": result.meta.totalPages,
        "currentPage": result.meta.currentPage,
        "skip": result.meta.skip,
        "limit": result.meta.limit
      })
      res.json({ success: true, message: "Fetched the data successfully", data: result.data })
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



