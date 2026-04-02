# User-Product Backend API

RESTful Backend API built with **Node.js**, **Express.js**, and **MongoDB**.  
Implements JWT authentication, role-based access control, and CRUD operations for Users and Products.

## Features

- User authentication & authorization using JWT
- Role-based access: Admin & Regular Users
- CRUD operations for Users and Products
- MongoDB database integration with Mongoose
- Structured MVC architecture
- Error handling and proper HTTP status codes


## Installation

```bash
git clone https://github.com/omeshwarreddykona/user-product-backend-api.git
cd user-product-backend-api
npm install
cp .env.example .env
# Update your .env with MongoDB URI and JWT secret
npm run start


