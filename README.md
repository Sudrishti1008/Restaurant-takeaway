# Food Delivery Platform

This is a **full-stack food delivery application** built with **React (Vite)** for the frontend, a dedicated **admin dashboard**, and a **Node.js/Express** backend powered by **MongoDB**. The platform allows customers to browse and order food, while admins can manage products, delivery slots, and orders via a secure admin interface.

---

## Project Structure

```
food_delivery-main/
│
├── frontend/      # Customer-facing app (React + Vite)
├── admin/         # Admin dashboard (React + Vite)
└── backend/       # REST API + MongoDB
```

---

## Tech Stack

| Layer    | Tech Used                                  |
|----------|---------------------------------------------|
| Frontend | React, Vite, Tailwind CSS (or custom CSS)   |
| Admin    | React, Vite                                 |
| Backend  | Node.js, Express, MongoDB, JWT, Multer |
| Auth     | JSON Web Tokens (JWT) for admin login       |
| Uploads  | Multer for food image uploads               |

---

##  Features

### **Frontend (Customer App)**

- Browse and view food items by category
- Add to cart and place orders
- Payment integration with Stripe (simulated or live)
- Responsive and user-friendly UI

### **Admin Dashboard**

- **Login authentication** using JWT
- Add, update, and delete food items
- Manage delivery time slots (toggle availability)
- View, update and track customer orders
- Hamburger menu for responsive navigation

### **Backend (API)**

- RESTful APIs for food items, cart, user, orders, and delivery slots
- Secure routes using JWT middleware
- Image upload support via Multer
- Stores media files in `uploads/`
- MongoDB as the primary database

---

## Dependencies

### Backend

- `express`
- `mongoose`
- `cors`
- `dotenv`
- `jsonwebtoken`
- `bcrypt`
- `multer`
- `body-parser`
- `validator`
- `nodemon` (dev only)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Restaurant-takeaway.git
cd Restaurant-takeaway.git
```

### 2. Backend Setup

```bash
cd backend
npm install
```

- Create a `.env` file:
```env
ADMIN_EMAIL=your_admin_email_here
ADMIN_PASSWORD=your_password_here
PORT=4000
MONGODB_URL=your_mongo_url_here
JWT_SECRET=your_jwt_here

```

- Start the backend server:
```bash
npm run dev
```

### 3. Admin Panel

```bash
cd ../admin
npm install
npm run dev
```

### 4. Customer Frontend

```bash
cd ../frontend
npm install
npm run dev
```

---

## Admin Access

To seed an admin user, use the `seedAdmin.js` file in the backend:

```bash
node seedAdmin.js
```

This will create an admin user in your MongoDB database. Login using those credentials in the `/` route of the admin panel.

---

## Uploads

Uploaded food images are stored in the `/uploads` folder. Ensure this folder exists in your backend root.

---

## Notes

- Ensure MongoDB is up and running.
- Use tools like [MongoDB Compass](https://www.mongodb.com/products/compass) to view your database.
- CORS is enabled for frontend-admin-backend communication.

---
