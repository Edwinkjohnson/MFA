# Multi-Factor Authentication (MFA) System 🔐

A secure authentication system implementing **three-step Multi-Factor Authentication (MFA)** to enhance login security. This project demonstrates how layered authentication can significantly reduce unauthorized access using multiple verification factors.

## 🔐 Authentication Flow
This system verifies the user in **three sequential steps**:

### 1️⃣ Password Authentication (Something You Know)
- User logs in using a registered **username & password**
- Basic credential validation

### 2️⃣ Email OTP Verification (Something You Have)
- A **One-Time Password (OTP)** is sent to the user’s registered email
- OTP must be verified within a limited time window

### 3️⃣ Color Pattern Verification (Something You Know)
- User selects a predefined **color sequence**
- Acts as an additional cognitive security layer
- Prevents access even if password and OTP are compromised

## 🚀 Features
- Three-layer MFA security
- Email-based OTP verification
- Custom color-based authentication
- Secure and user-friendly flow
- Modular and scalable code structure

## 🛠 Tech Stack
- **React.js**
- **Vite**
- **JavaScript (ES6+)**
- **Node.js**
- **Express.js**
- **Nodemailer** (Email OTP service)
