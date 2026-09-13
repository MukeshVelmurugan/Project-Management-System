# 🚀 Project Management System

A **Full-Stack Project Management System** built using **React, Node.js, Express, MySQL, Sequelize, and JWT Authentication**. This application enables users to manage projects, organize tasks, monitor progress through interactive dashboards, receive deadline notifications, and export reports in PDF and Excel formats.

---

# 📌 Overview

The Project Management System is designed as a professional web application for managing software or business projects. It provides secure authentication, project and task management, analytics dashboards, notifications, audit logs, and cloud deployment using modern full-stack technologies.

---

# ✨ Features

## 🔗 Deployment URL : https://project-management-system-six-livid.vercel.app/

## 📃 API Documentation : [Project Management System API Documentation.pdf](https://github.com/user-attachments/files/32159374/Project.Management.System.API.Documentation.pdf)

## 📊 Database Schema : [Project Management System Database Schema.pdf](https://github.com/user-attachments/files/32159434/Project.Management.System.Database.Schema.pdf)

## 🔑 Demo Login

Use the following demo account to explore the application.

| **Field**    | **Value**             |
| ------------ | --------------------- |
| **Email**    | `demouser@gmail.com` |
| **Password** | `User@123`              |

> **Note:** These credentials are provided for demonstration and evaluation purposes only.


## 🔐 Authentication

* User Registration
* Secure Login with JWT Authentication
* Password Encryption using bcrypt
* Protected Routes
* Automatic Token Authorization

## 📊 Dashboard

* Total Projects
* Total Tasks
* Completed Tasks
* Pending Tasks
* In Progress Projects
* Interactive Pie Chart
* Interactive Bar Chart
* Recent Activity Timeline

## 📁 Project Management

* Create Project
* View All Projects
* Update Project
* Delete Project
* Search Projects
* Filter by Status
* Pagination
* Sorting

## ✅ Task Management

* Create Task
* Edit Task
* Delete Task
* Mark Task as Completed
* Priority Levels
* Due Date Tracking
* Search & Filter Tasks

## 🔔 Notifications

* Due Today Alerts
* Upcoming Deadline Alerts
* Overdue Task Alerts
* Notification Bell Dropdown

## 📄 Reports

* Export Projects to PDF
* Export Projects to Excel

## 📱 Responsive UI

* Professional Dashboard Design
* Mobile Friendly Layout
* Sidebar Navigation
* Modern Card-Based Interface
* Fully Responsive for Desktop, Tablet & Mobile

## 📝 Audit Logs

* Project Created
* Project Updated
* Project Deleted
* Task Created
* Task Completed
* Task Deleted

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* React Router DOM
* Axios
* Recharts
* Lucide React
* React Hot Toast

## Backend

* Node.js
* Express.js
* Sequelize ORM
* JWT Authentication
* bcrypt
* Helmet
* Morgan
* CORS

## Database

* MySQL (Railway)

## Deployment

* Frontend – Vercel
* Backend – Render
* Database – Railway

---

# 📂 Project Structure

```text
Project-Management-System/
│
├── client/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── public/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---

# ⭐ Bonus Features

In addition to the core Project Management functionalities, this application includes several advanced features that enhance usability, security, and overall user experience.

## 🔐 JWT Authentication & Protected Routes

* Secure user registration and login system
* Password hashing using **bcrypt**
* JWT token-based authentication
* Protected routes for authorized users only
* Automatic token attachment using Axios interceptors

## 📊 Interactive Analytics Dashboard

* Real-time project and task statistics
* Total Projects, Tasks, Completed & Pending counts
* Pie Chart for task completion analysis
* Bar Chart for overall project analytics
* Recent activity timeline with audit records

## 🔍 Smart Search, Filter & Pagination

* Search projects by name
* Filter projects by status
* Filter tasks by status and priority
* Server-side pagination for improved performance
* Sort projects by newest, oldest, or status

## 🔔 Intelligent Deadline Notifications

* Notification bell with live notification count
* Due Today task reminders
* Upcoming deadline alerts (within 3 days)
* Overdue task warnings with day count

## 📝 Automatic Audit Log System

Every important user action is recorded automatically, including:

* Project Creation
* Project Update
* Project Deletion
* Task Creation
* Task Completion
* Task Deletion

This provides complete activity tracking within the dashboard.

## 📄 PDF & Excel Report Generation

* Export project data as professional PDF reports
* Export project data to Excel spreadsheets
* One-click download for reporting and documentation

## 📱 Fully Responsive User Interface

* Optimized for Desktop, Tablet, and Mobile
* Responsive sidebar navigation
* Modern dashboard with Tailwind CSS
* Professional card-based design and adaptive layouts

## ☁️ Cloud Deployment

The complete application is deployed using modern cloud platforms:

| Service  | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | Railway MySQL |

## 🚀 Performance & Security Enhancements

* Secure REST APIs with JWT authorization
* Helmet for HTTP security headers
* CORS configuration for secure API access
* Morgan request logging
* Sequelize ORM for efficient database operations
* Responsive and optimized React + Vite architecture


# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/your-username/Project-Management-System.git
cd Project-Management-System
```

## 2. Install Frontend

```bash
cd client
npm install
```

## 3. Install Backend

```bash
cd ../server
npm install
```

---

# 🔑 Environment Variables

## Server (`server/.env`)

```env
PORT=5000

DB_HOST=your_mysql_host
DB_PORT=your_mysql_port
DB_NAME=your_database
DB_USER=your_username
DB_PASSWORD=your_password

JWT_SECRET=your_secret_key
JWT_EXPIRES=7d
```

## Client (`client/.env`)

```env
VITE_API_URL=http://localhost:5000
```

---

# ▶️ Running the Project

## Start Backend

```bash
cd server
npm start
```

Backend runs at:

```text
http://localhost:5000
```

## Start Frontend

```bash
cd client
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# 🌐 API Endpoints

## Authentication

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register User |
| POST   | `/api/auth/login`    | Login User    |

## Projects

| Method | Endpoint            | Description      |
| ------ | ------------------- | ---------------- |
| GET    | `/api/projects`     | Get All Projects |
| POST   | `/api/projects`     | Create Project   |
| PUT    | `/api/projects/:id` | Update Project   |
| DELETE | `/api/projects/:id` | Delete Project   |

## Tasks

| Method | Endpoint                  | Description   |
| ------ | ------------------------- | ------------- |
| GET    | `/api/tasks`              | Get All Tasks |
| POST   | `/api/tasks`              | Create Task   |
| PUT    | `/api/tasks/:id`          | Update Task   |
| DELETE | `/api/tasks/:id`          | Delete Task   |
| PATCH  | `/api/tasks/:id/complete` | Complete Task |

## Dashboard

| Method | Endpoint         | Description          |
| ------ | ---------------- | -------------------- |
| GET    | `/api/dashboard` | Dashboard Statistics |

## Notifications

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| GET    | `/api/notifications` | Get Deadline Notifications |

---

# 🗄️ Database Schema

## Users

| Field    | Type    |
| -------- | ------- |
| id       | Integer |
| fullName | String  |
| email    | String  |
| password | String  |

## Projects

| Field       | Type    |
| ----------- | ------- |
| id          | Integer |
| name        | String  |
| description | Text    |
| status      | Enum    |
| startDate   | Date    |
| endDate     | Date    |
| userId      | Integer |

## Tasks

| Field       | Type    |
| ----------- | ------- |
| id          | Integer |
| name        | String  |
| description | Text    |
| priority    | Enum    |
| status      | Enum    |
| dueDate     | Date    |
| projectId   | Integer |

## Audit Logs

| Field     | Type    |
| --------- | ------- |
| id        | Integer |
| action    | String  |
| tableName | String  |
| userId    | Integer |
| createdAt | Date    |

---

# 📈 Dashboard Analytics

The dashboard provides real-time insights into project performance.

* 📁 Total Projects
* ✅ Completed Tasks
* ⏳ Pending Tasks
* 🚀 In Progress Projects
* 🥧 Task Completion Pie Chart
* 📊 Overall Statistics Bar Chart
* 📝 Recent Activity Timeline

---

# 📄 Export Functionality

Generate professional reports directly from the application.

* Export Projects as PDF
* Export Projects as Excel
* Download formatted reports instantly

---

# 🔒 Security Features

* JWT Authentication
* Password Hashing with bcrypt
* Protected REST APIs
* User Authorization
* Secure HTTP Headers (Helmet)
* CORS Configuration
* Token-based Session Management

---

# ☁️ Deployment

| Service  | Platform |
| -------- | -------- |
| Frontend | Vercel   |
| Backend  | Render   |
| Database | Railway  |

---

# 🎯 Learning Outcomes

This project demonstrates practical implementation of:

* Full Stack Web Development
* RESTful API Design
* Authentication & Authorization
* MySQL Database Management
* Sequelize ORM
* Responsive UI Design
* Data Visualization
* Cloud Deployment
* Report Generation
* Secure Application Development

---

# 👨‍💻 Author

**Mukesh V**

Full Stack Developer

* React.js
* Node.js
* Express.js
* MySQL
* Tailwind CSS

---

# 📜 License

This project is developed for **educational and academic purposes**.

---

## ⭐ If you like this project, consider giving it a star on GitHub!
