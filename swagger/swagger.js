import { components } from "./components.js";

import authSwagger from "../paths/authSwagger.js";
import categorySwagger from "../paths/categorySwagger.js";
import subCategorySwagger from "../paths/subCategorySwagger.js";
import productSwagger from "../paths/productSwagger.js";
import employeeSwagger from "../paths/employeeSwagger.js";

const swaggerDocument = {
  openapi: "3.0.0",

  info: {
    title: "User Product Backend API",
    version: "1.0.0",
    description:
      "Swagger documentation for Auth, Category, SubCategory, Product, and Employee APIs.",
  },

  servers: [
    {
      url: "http://localhost:4000/api",
      description: "Local Development Server",
    },
    {
      url: "https://user-product-backend-api.onrender.com/api",
      description: "Render Production Server",
    },
  ],

  tags: [
    { name: "Auth Service" },
    { name: "Category Service" },
    { name: "SubCategory Service" },
    { name: "Product Service" },
    { name: "Employee Service" },
  ],

  components,

  paths: {
    ...authSwagger,
    ...categorySwagger,
    ...subCategorySwagger,
    ...productSwagger,
    ...employeeSwagger,
  },
};

export default swaggerDocument;