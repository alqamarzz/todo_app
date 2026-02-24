# DevTrack – Task Manager

DevTrack is a full-stack MERN (MongoDB, Express, React, Node.js) CRUD web application. It features a modern, clean interface built with React and Tailwind CSS, providing users with a simple dashboard to track their tasks, view statistics, and manage completion states securely.

## Features
- **User Authentication**: Secure JWT-based registration and login system.
- **Task Management**: Full CRUD (Create, Read, Update, Delete) capability for user-specific tasks.
- **Dashboard Statistics**: Dynamic overview of total, pending, and completed tasks.
- **Filters & Searching**: Easily find tasks using title/description search or status filtering.
- **Responsive UI**: Intuitive, visually appealing design utilizing Tailwind CSS.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Axios, React Router DOM, Lucide React (Icons).
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JSON Web Tokens (JWT), Bcrypt.js.

---

## 🚀 Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally on port `27017` (or a MongoDB Atlas URI string).

### 1. Backend Setup

Open a terminal and navigate to the `backend` directory:
```bash
cd backend
npm install
```

**Configure Environment Variables:**
The `.env` file should already be present in the `backend` directory. If missing, create one with the following format:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/devtrack
JWT_SECRET=supersecretjwtkey_devtrack_secure_string
```
*(If you are using MongoDB Atlas, replace `MONGO_URI` with your connection string).*

**Start Backend Server:**
```bash
npm run server
# Note: You can also use `node server.js`
# The backend will run on http://localhost:5000/
```

### 2. Frontend Setup

Open a new terminal and navigate to the `frontend` directory:
```bash
cd frontend
npm install --legacy-peer-deps
```
*(Note: `--legacy-peer-deps` may be required to resolve React 19 dependency conflicts depending on your npm setup).*

**Start Frontend Development Server:**
```bash
npm run dev
```

### 3. Usage
- Open your browser and navigate to `http://localhost:5173/` (or the port Vite provides).
- You will be redirected to the Login page. 
- Create a new account from the "Register" screen.
- Start tracking your tasks!
