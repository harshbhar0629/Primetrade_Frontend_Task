# 📰 Blog Application – MERN Stack

A modern **full-stack Blog Application** built using the **MERN stack**, featuring secure authentication, role-based authorization, and complete blog & profile management.

This project demonstrates real-world frontend and backend integration with a focus on **security, usability, and clean architecture**.

---

## ✨ Key Highlights

* 🔐 **Secure Authentication & Authorization** (JWT)
* 🧑‍💻 **User Dashboard** with Profile & Blog Management
* 📝 **Full Blog CRUD** (Create, Read, Update, Delete)
* 🛡️ **Password-protected Account Deletion**
* 🚀 **Smooth and Responsive UI**

---

## 🚀 Features Overview

### 🌎 Public Access
* View all published blogs.
* View individual blog details without login.

### 🔐 Authentication & Authorization
* User Signup & Login using JWT.
* Protected dashboard and routes.
* Only logged-in users can create or manage blogs.

### 📝 Blog Management
* Create a blog (authenticated users only).
* Users can only edit or delete their **own** blogs.
* View all personal blogs under the **My Blogs** section.

### 👤 User Dashboard
* Update profile information.
* View personal blogs.
* Delete account securely by entering a password.

### 🛡️ Security
* Password hashing for stored credentials.
* JWT-based protected APIs for all sensitive actions.
* Authorization checks to ensure users can only modify their own data.

---

## 🛠️ Tech Stack

### 🎨 Frontend
| Technology | Purpose |
| :--- | :--- |
| **React.js** | Core JavaScript library for UI development |
| **Redux Toolkit** | State management |
| **React Router DOM** | Declarative routing |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **Axios** | HTTP client for API communication |

### ⚙️ Backend
| Technology | Purpose |
| :--- | :--- |
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web framework for building APIs |
| **MongoDB** | NoSQL database |
| **Mongoose** | ODM (Object Data Modeling) library for MongoDB |
| **JSON Web Token (JWT)** | Secure authentication and authorization |

---

## 📂 Project Structure

A clean, separated structure for frontend and backend components:
Primetrade_Frontend_Task/ ├── frontend/ # React App (Client) │ ├── src/ │ ├── components/ │ ├── pages/ │ └── redux/ │ ├── backend/ # Node/Express App (Server) │ ├── controllers/ # Business logic for routes │ ├── models/ # Mongoose schemas │ ├── routes/ # API endpoint definitions │ ├── middleware/ # Custom middleware (e.g., JWT authentication) │ └── server.js # Entry point │ └── README.md

---

## ⚙️ Environment Variables

Create a `.env` file inside the **`backend/`** folder with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/blog_app
JWT_SECRET=your_strong_secret_key_here

# ▶️ How to Run the Project Locally
# 1️⃣ Clone the Repository
git clone [https://github.com/harshbhar0629/Primetrade_Frontend_Task.git]
cd Primetrade_Frontend_Task

# Install Dependencies
# Navigate to each directory and install dependencies:

# Install Backend dependencies
cd backend
npm install

# Install Frontend dependencies
cd ../frontend
npm install

# Start the Application
# Open two separate terminal tabs for the backend and frontend.

# Start Backend

cd backend
npm run dev
Backend Server: http://localhost:5000

# Start Frontend

cd frontend
npm run dev
Frontend Application: http://localhost:5173

🔗 GitHub Repository
👉 https://github.com/harshbhar0629/Primetrade_Frontend_Task

# 👨‍💻 Author
# Harsh Bhardwaj