# 🚀 Freelance Marketplace Platform

**A modern, full-stack platform connection Freelancers with Clients.**

![Project Banner](https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80) 
*(Note: You can replace this image with a screenshot of your actual dashboard later)*

## 🌟 Overview

This project is a robust Web Application designed to simulate real-world freelance marketplaces like Upwork or Bionluk. It features a complete ecosystem where:
- **Clients** can post detailed job listings, manage budgets, and review proposals.
- **Freelancers** can browse jobs, filter by category/skills, and submit professional proposals.
- **Admins** have full control to manage users and moderate content.

Built with **Scalability** and **User Experience** in mind.

## 🛠️ Technology Stack

### Backend (The Core)
- **NestJS**: For a modular, scalable server-side architecture.
- **TypeScript**: Ensuring type safety and code reliability.
- **TypeORM & SQLite**: Efficient database management and relations (1:N, N:M).
- **JWT & Passport**: Secure, stateless authentication and Role-Based Access Control (RBAC).

### Frontend (The Interface)
- **React 19 & Vite**: Blazing fast performance and modern capability.
- **TailwindCSS**: For a beautiful, responsive, and custom design system.
- **Lucide React**: Modern and clean iconography.
- **Axios**: Optimized HTTP requests with interceptors.

## ✨ Key Features

### 🔐 Authentication & Roles
- Secure Login/Register with JWT tokens.
- **Role Guards**: Specific dashboards for Clients, Freelancers, and Admins.

### 💼 Job Management
- Create, Edit, and Delete Job listings.
- Rich categories (Web Dev, Design, SEO, etc.) and difficulty levels.
- Real-time proposal tracking.

### 📝 Proposal System
- Freelancers can bid on jobs with price and cover letters.
- Clients can review and **Accept** proposals.
- Automated status updates (Jobs move to "In Progress" upon acceptance).

### 👤 Profile & Skills
- Dynamic User Profiles.
- **Skill Tagging System**: Users can manage their technical skills (N:M Relation).

---

## 🚀 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Garfest0/freelance-marketplace-platform.git
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Visit the App**
   Open `http://localhost:5173` in your browser.

---

## 👨‍💻 Developer

**Hasan Toğmuş**
*Full Stack Developer | Typescript Enthusiast*

---
*Built as a final project for CENG 307.*
