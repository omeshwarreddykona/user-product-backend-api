export default {
   async isAdmin(req, res,next) {
      try {
         let requiredrole = req.user.role;
         if (!["admin", "super_admin"].includes(requiredrole)) {
         return res.status(500).json({ success: false, message: "User must be admin" })
      }
         next();
      
      } catch (error) {
         console.log(error)
         return res.status(500).json({ success: false, message: "Something went wrong" })
      }
   }
}

//       try{ 
//          let requiredrole = req.decoded.role;
//          console.log(requiredrole);return;
//       if(requiredrole === "super_admin" || requiredrole === "admin"){
//             return next()
//         }else{
//          return res.status(403).json({success:false,message:"User must be an admin"})
//         }
//     }catch(error){
//       return res.status(500).json({success:false,message:"Something went wrong"})
//     }
//    }
// export default isAdmin;