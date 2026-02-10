# 🚀 User–Product-Backend-API (JWT Auth)

A **secure RESTful Backend API** built with **Node.js, Express.js, and MongoDB**, featuring **JWT authentication**, **role-based access (Admin/User)**, **product management**, **pagination**, **search**, and **soft delete** functionality.

This project reflects **real-world backend development practices** and is suitable for **production-level applications**.

---

## ✨ Key Features

### 🔐 Authentication & Authorization
- User signup with **bcrypt password hashing**
- User login with **JWT access token & refresh token**
- Role-based access (**Admin / User**)
- Secure environment variables using **dotenv**

---

### 👤 User Management
- Email-based registration
- Duplicate user prevention
- Admin creation using `ADMIN_KEY`

---

### 📦 Product Management
- Create product (authenticated user)
- Get all products with:
  - Pagination
  - Search (name & category)
- Get product by ID
- Update product by ID
- Hard delete product
- Soft delete using `deleted_at`

---

### ⚙️ Backend Best Practices
- MVC / Service-oriented architecture
- MongoDB `ObjectId` handling
- Centralized error handling
- Clean and readable code structure

---

## 🛠 Tech Stack

| Technology | Usage |
|---------|------|
| Node.js | Runtime |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | ODM |
| bcrypt | Password hashing |
| JSON Web Token (JWT) | Authentication |
| dotenv | Environment variables |

---

## 📁 Project Structure

user-product-backend-api/
│
├── controllers/
│ └── userProductController.js
│
├── models/
│ ├── user.js
│ └── product.js
│
├── routes/
│ └── routes.js
│
├── middlewares/
│ └── authMiddleware.js
│
├── config/
│ └── db.js
│
├── server.js
├── .env.example
├── package.json
├── README.md
└── LICENSE

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SECRET=your_jwt_secret
ADMIN_KEY=your_admin_key
🚀 Installation & Run
1️⃣ Clone the repository
bash
Copy code
git clone https://github.com/your-username/user-product-backend-api.git
2️⃣ Install dependencies
bash
Copy code
npm install
3️⃣ Start the server
bash
Copy code
npm start
Server runs at:

arduino
Copy code
http://localhost:5000
🔐 Authentication APIs
🔸 Signup User
http
Copy code
POST /api/signup
Request Body

json
Copy code
{
  "name": "Omeshwar",
  "email": "user@gmail.com",
  "password": "123456",
  "confirm_password": "123456",
  "admin_key": "optional"
}
🔸 Login User
http
Copy code
POST /api/login
Response

json
Copy code
{
  "token": "jwt_access_token",
  "refreshToken": "jwt_refresh_token"
}
📦 Product APIs (Protected)
Authorization Header

makefile
Copy code
Authorization: Bearer <JWT_TOKEN>
➕ Create Product
http
Copy code
POST /api/products
json
Copy code
{
  "name": "iPhone 15",
  "category": "Mobile",
  "price": 85000
}
📄 Get All Products (Pagination + Search)
http
Copy code
GET /api/products?page=1&limit=5&search=mobile
🔍 Get Product by ID
http
Copy code
GET /api/products/:id
✏️ Update Product
http
Copy code
PUT /api/products/:id
❌ Hard Delete Product
http
Copy code
DELETE /api/products/:id
🗑 Soft Delete Product
http
Copy code
PATCH /api/products/soft-delete/:id
🧪 Testing
Tested using Postman

JWT token required for protected routes

🚀 Future Enhancements
Refresh token persistence (DB / Redis)

Role-based middleware (Admin-only routes)

Product ownership validation

Swagger API documentation

File upload support

Rate limiting & security headers

👨‍💻 Author
Kona Omeshwar Reddy
Backend Developer | Node.js | MongoDB | JWT

