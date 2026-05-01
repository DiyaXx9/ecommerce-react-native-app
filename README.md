# 🛍️ Full Stack E-commerce Mobile App

A **production-level E-commerce mobile application** built using **React Native (Expo)** with a scalable backend powered by **Node.js, Express, and MongoDB**.

This app replicates core functionalities of platforms like **Amazon / Flipkart**, including cart management, wishlist persistence, checkout flow, address management, and order tracking.

---

## 🚀 Features

### 🔐 Authentication

* JWT-based Login & Signup
* Secure user session handling

---

### 🏠 Home Screen

* Product grid with modern UI
* Search with debounce
* Category filters & sorting

---

### 📦 Product Details

* Image slider with pagination
* Fullscreen image zoom
* Product description & ratings
* Add to Cart / Buy Now

---

### 🛒 Cart System

* Add / Remove / Update quantity
* Real-time cart updates
* Cart badge on bottom navigation

---

### ❤️ Wishlist

* Add / Remove items
* Persistent storage using AsyncStorage
* Data remains after app restart

---

### 📍 Address Management ✅

* Add new address
* Edit / delete address
* Select address for checkout
* Clean form-based UI

---

### 📦 Order Management ✅

* Order placement flow
* Order history screen
* Order details view

---

### 🚚 Order Tracking ✅

* Track order status (Placed → Shipped → Delivered)
* Real-time UI updates

---

### 🔔 Push Notifications (Demo) ✅

* Simulated order updates
* User engagement flow

---

### 💳 Payment (Demo Mode) ✅

* Checkout flow simulation
* Order confirmation screen

---

### 🔄 Navigation

* Bottom Tab Navigation
* Stack Navigation for seamless flow

---

## 🛠️ Tech Stack

### 📱 Frontend

* React Native (Expo)
* TypeScript
* Redux Toolkit
* React Navigation
* Axios

### ⚙️ Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## 📁 Project Structure

```
E-commerce-App/
│
├── ecommerce-app/        # React Native App
│   ├── components/
│   ├── screens/
│   ├── redux/
│   ├── navigation/
│   └── utils/
│
├── ecommerce-backend/    # Backend Server
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/your-username/ecommerce-fullstack-app.git
cd ecommerce-fullstack-app
```

---

### 2️⃣ Run Backend

```
cd ecommerce-backend
npm install
npm start
```

---

### 3️⃣ Run Frontend

```
cd ../ecommerce-app
npm install
npx expo start
```

---

## 📸 Screenshots (Recommended)

* Home Screen
* Product Details
* Cart
* Wishlist
* Address Management
* Order History
* Checkout

---

## ✨ Key Highlights

* Production-level UI/UX similar to real e-commerce apps
* Persistent state management (Wishlist, Cart)
* Modular & scalable architecture
* Real-world application flow (Auth → Cart → Checkout → Orders)
* Clean code with reusable components

---

## 🚀 Future Enhancements

* Real payment integration (Stripe / Razorpay)
* Live order tracking (API-based)
* Push notification integration (Firebase)
* Performance optimization

---

## 👩‍💻 Author

**Diya Khandelwal**

* GitHub: https://github.com/DiyaXx9
* LinkedIn: (https://www.linkedin.com/in/diya-khandelwal-915593300/)

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
