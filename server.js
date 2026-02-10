import express from "express";
import router from "./routes/apis.js";
import connectDB from "./database/db.js";
import { config } from 'dotenv';
config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();


app.use("/api", router);


app.listen(process.env.PORT, () => {
  console.log("Server running on port 4003");
});
