# 🏢 Enterprise User Product Management Backend System

A **scalable, modular, and production-style backend system** built using Node.js, Express, and MongoDB.  
This project simulates a real-world enterprise backend handling users, products, categories, subcategories, employees, authentication, and file uploads with a **layered architecture design**.

---

## ✨ Key Highlights

- 🔐 Secure Authentication using JWT & bcrypt
- 🛡️ Role-Based Access Control (Admin/User)
- 📦 Product Management System (CRUD + Soft Delete)
- 👤 Advanced User Management (Profile, Education, Professional Info)
- 🗂️ Category & Subcategory Management
- 👨‍💼 Employee Management Module
- 📁 File Upload System using Multer
- 🧠 Clean Layered Architecture (Routes → Controllers → Services → Models)
- ⚡ MongoDB Integration using Mongoose
- 🌐 CORS enabled REST APIs
- 🪵 Custom Logging Middleware
- 🔄 Soft Delete Support for Data Safety

---

## 🧠 System Architecture

This project follows a **clean layered architecture pattern**:

```txt
Client Request
     ↓
Routes (API Layer)
     ↓
Controllers (Request Handling)
     ↓
Services (Business Logic)
     ↓
Models (Database Schema)
     ↓
MongoDB Database


🏗️ Project Structure
server.js
routes/
controller/
services/
models/
database/
uilites/
uploads/



⚙️ Tech Stack
Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication
bcrypt.js
Multer (File Upload)
dotenv
validator
password-validator
CORS



🔐 Authentication System
User Registration with hashed passwords (bcrypt)
Secure Login with JWT token generation
Middleware-based token verification
Role-based access control (Admin protection routes)
Logout handling support




📦 Core Modules
👤 User Module
Register / Login
Get all users
Get user by ID
Update user profile
Soft delete user
Manage Education & Professional info
Profile image upload


📦 Product Module
Create product (JWT protected)
Get all products (with pagination support)
Get product by ID
Update product
Soft delete product
Token verification route


🗂️ Category Module
Create category
Get all categories
Update category
Delete category
🧾 Subcategory Module
Full CRUD operations


👨‍💼 Employee Module
Create employee
Get all employees
Update employee
Delete employee


📡 API Overview
Method	Endpoint	Description
POST	/register	Register user
POST	/login	Login user
GET	/get-all-user	Fetch users
PUT	/update-user/:id	Update user
POST	/create-product	Create product
GET	/get-all-product	Get products
POST	/create-category	Create category
GET	/get-all-categories	Fetch categories
POST	/create-employee	Create employee


📁 File Upload System
Implemented using Multer
Stores files in /uploads
Static file serving enabled
http://localhost:4003/uploads/filename.jpg



🧪 Middleware Used
JWT Authentication Middleware
Role-based Access Middleware
Custom Logger Middleware
CORS Middleware
Body Parser Middleware




🚀 Getting Started
1. Clone Repository
git clone https://github.com/your-username/project.git
cd project

2. Install Dependencies
npm install

3. Create .env file
PORT=4003
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

4. Run Project
npm start

Server runs at:

http://localhost:4003
📌 Key Engineering Concepts Used
MVC + Service Layer Architecture
RESTful API Design
Authentication & Authorization
Soft Delete Strategy
Modular Code Structure
Middleware-based Security
File Upload Handling
MongoDB Schema Design




🔮 Future Improvements
Swagger API Documentation
Redis caching for performance optimization
Rate limiting & API security hardening
Unit & Integration testing (Jest)
Docker containerization
CI/CD pipeline integration
Logging system with Winston




👨‍💻 Author
Omeshwar Reddy Kona
Backend Developer
Node.js | Express.js | MongoDB