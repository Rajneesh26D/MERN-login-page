Its a Full Stack MERN login-signup page 
#MelodyVerse Web Application
forntend: localhost: 3000
backend: localhost: 8080
#Project Overview
MelodyVerse is a full-stack MERN (MongoDB, Express, React, Node.js) web application featuring user authentication with signup, login, and home pages. The backend is powered by Node.js with MongoDB, and the frontend is built using React. The application includes features like password visibility toggle, email notifications, and JWT-based authentication.

#Features
#Authentication:
Users are redirected to the login page by default.
If not registered, users are redirected to the signup page.
Upon successful signup, users are logged in and redirected to the home page.
"Remember me" checkbox stores user credentials in localStorage.
Password reset functionality is available.
#Notifications:
User-friendly toast notifications (using react-toastify) for errors like empty fields or failed validation.
#Security:
JWT-based Authentication: JSON Web Tokens (JWT) manage user sessions and secure routes.
Bcrypt Password Hashing: Passwords are securely hashed before storage.
Rate Limiting: Protects against brute force login attempts.
#Middleware:
Authentication middleware ensures routes are protected.
Error handling middleware provides consistent API responses.
#Additional Features:
Password visibility toggle on both login and signup forms.
Simulated welcome email notification upon successful signup (for demo purposes).
#Tech Stack
Frontend: React, React Router, React Toastify
Backend: Node.js, Express, MongoDB, JWT, bcrypt
Database: MongoDB (Cloud-based or Local)
Styling: CSS
#Pages & Functionalities:
Signup Page:
Requires users to fill in name, email, and password.
Users must agree to the terms and conditions (checkbox).
Password visibility toggle.
On successful signup, a welcome message is displayed (simulated welcome email).
Displays error notifications for any missing required fields.
Login Page:
"Remember me" option stores user credentials in localStorage for future logins.
Displays error notifications for incorrect credentials.
Password Reset:
Users can request password reset links and update their password after token validation.
