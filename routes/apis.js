import express from "express";
import multer from "multer";
import authController from "../services/auth.js";
import categoryController from "../controller/categoryController.js";
import verifyUser from '../uilites/helper.js';
import auth from "../uilites/access.js";
import subCategoryController from "../controller/subCategoryController.js"
import userController from "../controller/userController.js";
import productController from "../controller/productController.js";
import employeeController from "../controller/employeeController.js";




const router = express.Router();

const filestorage = multer.diskStorage({
  destination :(req,file,cb) => {
    cb(null,"./uploads")
  },
  filename:(req,file,cb) => {
    cb(null, Date.now()+"--"+file.originalname);
  },
});

const upload = multer({storage:filestorage});

router.post("/image-upload",upload.single("image"),userController.uploadImageProfile);

// ====================== User Routes =============================// 

router.post("/register", userController.signInUser);
router.post("/login",userController.login);
router.get("/get-all-user",userController.getUsers);
router.get("/get-user-id/:id",userController.getById);
router.put("/update-user/:id",userController.UpdateUser);
// router.delete("/delete-user/:id",verifyUser("admin"),authController.DeleteUserbyID);
router.put("/soft-Delete-user/:id",userController.deleteUser);


// =========================== education info =====================================//

router.post("/create-educationinfo",userController.creatingEducationInfo);
router.put("/update-educationinfo",userController.updateTheEducationInfo);
router.post("/delete-educationInfo",userController.deleteTheEducationInfo);



// =============================Professional Info ===================================//

router.put("/update-profInfo",userController.updateTheProfessionalInfo);
router.post("/create-profInfo",userController.createTheProfessionalInfo);
router.post("/delete-profInfo",userController.deleteTheProfessionalInfo);
// ========================== Product Routes ======================//

router.post("/create-product",verifyUser(),productController.createTheProduct);
router.get("/get-all-product",productController.getallProduct);
router.get("/get-product-id/:id",productController.getById);
router.put("/update-product-id/:id",productController.updateById);
// router.delete("/delete-product-id/:id",productController.deleteProductId);
router.delete("/soft-delete-product/:id",productController.deletebyId)
router.get("/verify-token", verifyUser, (req,res) => {
    res.json({
        success: true,
        message: "Token validated successfully",
    });
});


//====================================== logout route============================================//

router.post("/logout",authController.logoutUser);

//============================== admin active and deactive api ==================================//

router.put("/user-to-admin/:id",verifyUser("admin"),auth.isAdmin,authController.activeAndDeactiveAdmin);


// ==========================Category api's ======================================================//

router.post("/create-category",verifyUser(),categoryController.createTheCategory);
router.get("/get-all-categories",categoryController.fetchAllCategory);
router.put("/update-category/:id",categoryController.updateCategory);
router.delete("/delete-category/:id",categoryController.deleteCategory);

// =================================== subCategory api's ============================================// 

router.post("/create-subCategory",subCategoryController.createTheSubCategory);
router.get("/get-all-subCategory",subCategoryController.fetchAllsubCategory);
router.put("/update-subCategory/:id",subCategoryController.updateSubCategory);
router.delete("/delete-subCategory/:id",subCategoryController.deleteSubCategory);
// ================================== employee api's =======================================//

router.post("/create-employee",employeeController.creatingTheEmployee);
// router.post("/employee-login",empolyeeController.loginEmpolyee);
router.get("/get-all-employees",employeeController.fetchTheEmployees);
// router.get("/get-Employee-id/:id",employeeController.getEmpolyeeById);
router.put("/update-employee-id/:id",employeeController.updateTheEmployee);
router.delete("/delete-employee-id/:id",employeeController.deleteEmployee)

export default router;