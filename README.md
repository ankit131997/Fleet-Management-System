# 🚗 Fleet Management System 🛠️

## 🌍 Overview
Fleet Management System (FLEEMAN) is a 🏗️ microservices-based application designed for efficient 🚗 vehicle reservations, 🔄 handovers, and 🔙 returns. The system includes a ⚛️ React.js frontend and robust backends powered by ⚙️ ASP.NET Core & ☕ Spring Boot.

## ⭐ Key Features
- **🔗 Microservices Architecture**: Modular services for 📅 booking, 👥 user management, and 🚘 vehicle inventory.
- **🔐 Secure Authentication & Authorization**: Implemented using 🔑 JWT.
- **🔏 Strong Password Encryption**: Protects user credentials using #️⃣ hashing 
- **📜 Comprehensive Logging & Monitoring**: Centralized 📝 logging with industry-standard tools.
- **💻 Cross-Platform Compatibility**: A seamless ⚛️ React.js frontend communicating via 🌐 REST APIs.

## 🏗️ Tech Stack
### 🎨 Frontend:
- ⚛️ React.js
- 🎨 Bootstrap
- 📡 Fetch for API communication

### 🔙 Backend (⚙️ ASP.NET Core Microservices):
- .NET 8️⃣
- 🏛️ Entity Framework Core (EF Core) with 🐬 MySQL
- 🛡️ ASP.NET Identity for authentication
- 📝 Serilog for structured logging

### 🔙 Backend (☕ Spring Boot Microservices):
- 🌱 Spring Boot 6️⃣
- 🔐 Spring Security with 🔑 JWT
- 🏛️ Hibernate & JPA for database interactions
- 📜 Logback for logging

### 🗄️ Database:
- 🐬 MySQL

### 🚀 DevOps & Deployment:
- 🐳 Docker for containerization
- 🤖 GitHub Actions for CI/CD automation

## ⚙️ Installation & Setup

### 📌 Prerequisites:
- 🎭 Node.js (for ⚛️ React.js frontend)
- 🛠️ .NET SDK (for ⚙️ ASP.NET Core services)
- ☕ Java 17+ (for 🌱 Spring Boot services)
- 🐬 MySQL Server

### 📥 Clone the Repository:
```sh
$ git clone https://github.com/yourusername/fleman.git
$ cd fleman
```

### 🔙 Backend Setup
#### ⚙️ ASP.NET Core Services
```sh
$ cd backend-dotnet
$ dotnet restore
$ dotnet run
```

#### ☕ Spring Boot Services
```sh
$ cd backend-springboot
$ ./mvnw spring-boot:run
```

### 🎨 Frontend Setup
```sh
$ cd frontend
$ npm install
$ npm start
```

## 📜 API Documentation
API endpoints & usage details can be found in `docs/api-spec.md` or in a 📩 Postman collection.





