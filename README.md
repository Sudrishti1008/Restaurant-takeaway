# Food Delivery Platform

This is a **full-stack food delivery application** built with **React (Vite)** for the frontend, a dedicated **admin dashboard**, and a **Node.js/Express** backend powered by **MongoDB**. The platform allows customers to browse and order food, while admins can manage products, delivery slots, and orders via a secure admin interface.

---

## Features

### Customer Interface
- User registration and login system
- Add to cart, update cart quantity, and checkout
- Real-time delivery slot selection
- Order placement with a confirmation popup
- Order tracking dashboard for past orders

### Admin Dashboard
- Admin login
- Add, update, and remove food items
- Manage published/draft status for food
- Manage delivery slots (add/remove/update availability)
- View all customer orders with status management

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- React Toastify
- Context API

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Cloudinary (for image storage)
- Multer (for handling file uploads)

---

## 📁 Folder Structure Overview

```
Restaurant-takeaway-main/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── uploads/ (ignored via .gitignore)
│   ├── config/
│   └── index.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── context/
│   └── App.jsx
│
├── admin/
│   ├── components/
│   ├── pages/
│   └── App.jsx
│
├── .env
├── .gitignore
└── README.md
```

---

## Tech Stack

| Layer    | Tech Used                                  |
|----------|---------------------------------------------|
| Frontend | React, Vite, Tailwind CSS (or custom CSS)   |
| Admin    | React, Vite                                 |
| Backend  | Node.js, Express, MongoDB, JWT, Multer |
| Auth     | JSON Web Tokens (JWT) for admin login       |
| Cloudinary  | For uploading images in the cloud               |

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
- Stores media files in the Cloudinary which is cloud storage
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
npm install
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
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

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

## Cloudinary

Stores the images in the cloud.
---

## Notes

- Ensure MongoDB is up and running.
- Ensure you have an account for Cloudinary inorder to get the api keys.
- Use tools like [MongoDB Compass](https://www.mongodb.com/products/compass) to view your database.
- CORS is enabled for frontend-admin-backend communication.

---
