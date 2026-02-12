🚀 User–Product Backend API (JWT Authentication)

A secure RESTful Backend API built using Node.js, Express.js, and MongoDB.

This project implements JWT authentication, role-based authorization (Admin/User), product management, pagination, search, and soft delete strategies following real-world backend standards.

💡 Why This Project?

This project demonstrates strong backend fundamentals:

Secure authentication & authorization

Clean MVC-style architecture

MongoDB pagination & search

Soft delete pattern for data safety

Scalable and maintainable backend design

✨ Key Features

🔐 Authentication & Authorization

User registration with bcrypt password hashing

Login with JWT access & refresh tokens

Role-based access (Admin / User)

Token verification middleware

Environment security using dotenv

👤 User Management

Email-based registration

Duplicate email prevention

Admin creation using ADMIN_KEY

📦 Product Management

Create product (Admin only)

Fetch products with:

Pagination

Search (name & category)

Get product by ID

Update product details

Hard delete product

Soft delete using deleted_at

⚙️ Backend Best Practices Used

MVC-style folder structure

Middleware-based authentication

MongoDB ObjectId handling

Environment-based configuration

Clean, readable, maintainable code

🛠 Tech Stack
Technology	Purpose
Node.js	Runtime
Express.js	Backend framework
MongoDB	Database
Mongoose	ODM
bcrypt	Password hashing
JWT	Authentication
dotenv	Environment variables
📁 Project Structure
user-product-backend-api/
│
├── controllers/
│   └── auth.js
│
├── database/
│   └── db.js
│
├── models/
│   ├── user.js
│   └── product.js
│
├── routes/
│   └── apis.js
│
├── uilites/
│   └── helper.js
│
├── server.js
├── .env.example
├── package.json
├── README.md
└── LICENSE

⚙️ Environment Variables

Create a .env file in the root directory:

PORT=4003
db_url=your_mongodb_connection_string
secret=your_jwt_secret
ADMIN_KEY=your_admin_key

🚀 Installation & Run
git clone https://github.com/omeshwarreddykona/user-product-backend-api.git
cd user-product-backend-api
npm install
npm start


Server runs at:

http://localhost:4003

🔐 Authentication APIs
✅ Register User
POST /api/register

{
  "name": "Omeshwar",
  "email": "user@gmail.com",
  "password": "123456",
  "confirm_password": "123456",
  "admin_key": "optional"
}

✅ Login User
POST /api/login


Response:

{
  "token": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}

✅ Verify Token
GET /api/verify-token


Header:

Authorization: Bearer <JWT_TOKEN>

📦 Product APIs (Protected Routes)

Authorization Header (Required):

Authorization: Bearer <JWT_TOKEN>

➕ Create Product (Admin only)
POST /api/create-product

📄 Get All Products (Pagination & Search)
GET /api/get-all-product?page=1&limit=5&search=mobile

🔍 Get Product by ID
GET /api/get-product-id/:id

✏️ Update Product
PUT /api/update-product-id/:id

❌ Hard Delete Product
DELETE /api/delete-product-id/:id

♻️ Soft Delete Product
PUT /api/delete-update-product/:id

🔐 Security Practices

Password hashing using bcrypt

JWT authentication & authorization

Role-based access control

Environment variable protection

Middleware-protected routes

⚡ Performance Considerations

Pagination using limit & skip

Indexed MongoDB queries

Soft delete to prevent data loss

🧪 Testing

Tested using Postman

JWT required for protected routes

Admin-only routes enforced

🚀 Future Enhancements

Store refresh tokens in DB / Redis

Admin-only route middleware separation

Swagger / OpenAPI documentation

File uploads (images, PDFs)

Rate limiting & security headers

👨‍💻 Author

Kona Omeshwar Reddy
Backend Developer | Node.js | MongoDB | JWT
