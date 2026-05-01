# TeamFlow - Premium Team & Project Management System

TeamFlow is a full-stack, modern team management application designed with a sleek "Glassmorphism" aesthetic. It allows teams to manage projects, track tasks via a Kanban-style board, and manage organization members with role-based access control.

## ✨ Features

- **📊 Dynamic Dashboard**: Real-time statistics for pending tasks, completed work, and active projects.
- **📁 Project Management**: Create and manage multiple projects with dedicated administrative controls.
- **📋 Kanban Task Board**: Visual task tracking with priority levels (High, Medium, Low) and member assignments.
- **👥 Team Management**: Centralized member directory with Admin/Member roles.
- **🔐 Secure Authentication**: JWT-based authentication with protected routes and password hashing.
- **💎 Premium UI**: Modern dark-mode interface built with Vanilla CSS and Lucide icons.

## 🛠️ Technology Stack

- **Frontend**: React.js, Vite, Axios, Lucide-React, React Router
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB Atlas
- **Auth**: JSON Web Tokens (JWT), Bcrypt.js

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hamidkhan99/team-management.git
   cd team-management
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_secret_key
   ```
   Start the backend:
   ```bash
   node server.js
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📸 Screenshots
*(Add your screenshots here)*

## 📄 License
This project is licensed under the MIT License.
