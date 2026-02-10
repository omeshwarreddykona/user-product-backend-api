
import jwt from "jsonwebtoken";
let secret = "1223456789";




function verifyUser(requiredrole){
   return (req, res, next) => {
    const token = req.headers.authorization;
    if(!token || !token.startsWith("Bearer ")){
        return res.status(401).json({success:false,message:"Access denied , token missing"})
    }

    try {
        const verifytoken = token.split(' ')[1];
        const decoded = jwt.verify(verifytoken, secret);

        // jwt.verify(token,secret);
        req.user ={
            _id:decoded.id,
            username:decoded.username,
            email:decoded.email,
            role:decoded.role
        };

        if(requiredrole && decoded.role !==requiredrole){
            return res.status(422).json({success:false,message:"you don't have access"})
        }
        next();
    } catch (error) {
         return res.status(422).json({ success: false, message: "Invaild token" })
  
        }
    }
};
export default verifyUser ;