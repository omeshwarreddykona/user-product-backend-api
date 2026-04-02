import express from "express";
// import morgan from "morgan";
import logger from "./uilites/logger.js";
import router from "./routes/apis.js";
import connectDB from "./database/db.js";
import cors from "cors";
import { config } from 'dotenv';
config();

const app = express();
// app.use(morgan("dev"));
app.use(logger);
const Port = process.env.PORT || 4003 ;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/uploads", express.static("uploads"));
app.use("/api", router);


app.listen(Port, () => {
  console.log("Server running on port 4003");
});
