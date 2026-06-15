import express from "express";
// import morgan from "morgan";
import logger from "./uilites/logger.js";
import router from "./routes/apis.js";  
import connectDB from "./database/db.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger.js";
import { config } from 'dotenv';
config();

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
// app.use(morgan("dev"));
app.use(logger);
const Port = process.env.PORT || 4000 ;

app.use(cors({
  origin: "*", // you can replace with frontend URL
  exposedHeaders: ["total_count", "total_pages", "current_page", "limit"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/uploads", express.static("uploads"));
app.use("/api", router);


app.use((error,req,res,next) => {
  console.log("gobalError:",error)
  res.status(error.code || 500).json({success:false, message : error.code || "Internal Server Error"})
})

app.listen(Port, () => {
  console.log("Server running on port 4003");
});
