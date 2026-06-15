import jwt from "jsonwebtoken";
import blacklist from "./blacklist.js";
import { config } from "dotenv";

config();

const secret = process.env.secret;

function verifyUser(requiredRole) {
  return (req, res, next) => {
    try {
      if (!secret) {
        return res.status(500).json({
          success: false,
          message: "SECRET is missing in .env file",
        });
      }

      const token = req.headers.authorization;

      if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Access denied, token missing",
        });
      }

      const accessToken = token.split(" ")[1];

      if (blacklist.has(accessToken)) {
        return res.status(401).json({
          success: false,
          message: "Token revoked, Please Login again.",
        });
      }

      const decoded = jwt.verify(accessToken, secret);

      req.user = {
        _id: decoded.user_id,
        username: decoded.username,
        email: decoded.email,
        role: decoded.role,
      };

    //   if (requiredRole && decoded.role !== requiredRole) {
    //     return res.status(403).json({
    //       success: false,
    //       message: "You don't have access",
    //     });
    //   }

      next();
    } catch (error) {
      return res.status(422).json({
        success: false,
        message: "Invalid token",
      });
    }
  };
}

export default verifyUser;