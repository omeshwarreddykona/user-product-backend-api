[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-Backend-success)](https://nodejs.org)
[![Express.js](https://img.shields.io/badge/Express.js-Framework-black)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen)](https://www.mongodb.com)
[![JWT](https://img.shields.io/badge/Auth-JWT-blue)](https://jwt.io)
[![Status](https://img.shields.io/badge/Status-Production--Ready-success)](Project-Status)

# 🚀 User–Product Backend API (JWT Authentication)

A **secure, production-ready RESTful Backend API** built using **Node.js, Express.js, and MongoDB**.

It implements **JWT authentication**, **role-based access (Admin/User)**, **product management**, **pagination**, **search**, and **soft delete** patterns.

This project follows **real-world backend engineering standards** and is suitable for scalable applications.

---

## 💡 Why This Project?

This project was built to demonstrate practical backend development skills:

- Secure authentication & authorization
- Clean API architecture
- Database-driven pagination & search
- Enterprise-style soft delete strategy
- Production-ready folder structure

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- User signup with **bcrypt password hashing**
- Login with **JWT access & refresh tokens**
- Role-based access (**Admin / User**)
- Environment security using **dotenv**

### 👤 User Management
- Email-based registration
- Duplicate user prevention
- Admin creation via `ADMIN_KEY`

### 📦 Product Management
- Create product (authenticated users)
- Fetch products with:
  - Pagination
  - Search by name & category
- Get product by ID
- Update product details
- Hard delete product
- Soft delete using `deleted_at`

---

## ⚙️ Backend Best Practices
- MVC / Service-oriented architecture
- Centralized error handling
- MongoDB ObjectId validation
- Clean, maintainable, scalable codebase

---

## 🛠 Tech Stack

| Technology | Usage |
|----------|------|
| Node.js | Runtime |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | ODM |
| bcrypt | Password hashing |
| JWT | Authentication |
| dotenv | Environment variables |

---

## 📁 Project Structure

user-product-backend-api/
├── controllers/
│ └── userProductController.js
├── models/
│ ├── user.js
│ └── product.js
├── routes/
│ └── routes.js
├── middlewares/
│ └── authMiddleware.js
├── config/
│ └── db.js
├── server.js
├── .env.example
├── package.json
├── README.md
└── LICENSE

yaml
Copy code

---

## ⚙️ Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SECRET=your_jwt_secret
ADMIN_KEY=your_admin_key
🚀 Installation & Run
bash
Copy code
git clone https://github.com/your-username/user-product-backend-api.git
cd user-product-backend-api
npm install
npm start
Server runs at:

arduino
Copy code
http://localhost:5000
🔐 Authentication APIs
Signup
http
Copy code
POST /api/signup
json
Copy code
{
  "name": "Omeshwar",
  "email": "user@gmail.com",
  "password": "123456",
  "confirm_password": "123456",
  "admin_key": "optional"
}
Login
http
Copy code
POST /api/login
json
Copy code
{
  "token": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}
📦 Product APIs (Protected)
Authorization Header

http
Copy code
Authorization: Bearer <JWT_TOKEN>
Create Product → POST /api/products

Get Products → GET /api/products?page=1&limit=5&search=mobile

Get Product → GET /api/products/:id

Update Product → PUT /api/products/:id

Hard Delete → DELETE /api/products/:id

Soft Delete → PATCH /api/products/soft-delete/:id

🔐 Security Practices
Password hashing with bcrypt

JWT-based authentication

Role-based authorization

Secrets stored in environment variables

Protected routes via middleware

⚡ Performance Considerations
Pagination using limit & skip

Optimized MongoDB queries

Soft delete instead of data loss

🧪 Testing
Tested using Postman

JWT required for protected routes

🚀 Future Enhancements
Refresh token persistence (DB / Redis)

Admin-only middleware

Swagger API documentation

File upload support

Rate limiting & security headers

Project Status
Status: ✅ Production Ready

Deployment: Not deployed (API-ready)

Environment: Local / Cloud compatible

Version: v1.0.0

👨‍💻 Author
Kona Omeshwar Reddy
Backend Developer | Node.js | MongoDB | JWT

