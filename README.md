# 💰 ArthaSarthi — AI-Powered Financial Advisor

ArthaSarthi is a backend-first, AI-powered financial advisory system that analyzes user financial behavior and provides intelligent, personalized recommendations using rule-based logic and Generative AI.

The system follows a **Backend → GenAI → Frontend** architecture, ensuring scalability, modularity, and real-world production readiness.

---

## 🚀 Vision

To build a smart financial assistant that:

* Understands user spending patterns
* Tracks financial health over time
* Provides actionable, personalized financial advice
* Uses **Generative AI (LLMs)** for intelligent reasoning

---

## 🏗️ System Architecture

```
Frontend (React / Chat UI)
        ↓
Spring Boot Backend (Core Logic)
        ↓
GenAI Layer (LLM Integration)
        ↓
Financial Logic + Rules Engine
        ↓
Database Layer (MariaDB + MongoDB)
```

---

## ⚙️ Tech Stack

### 🔹 Backend

* Java
* Spring Boot
* Spring Data JPA
* REST APIs

### 🔹 Frontend (Planned)

* React.js
* Tailwind CSS
* Chat-based UI

### 🔹 Database

* MariaDB (Relational data)
* MongoDB (Chat history & AI context)

### 🔹 AI / GenAI

* OpenAI API / LLaMA (planned)
* Prompt Engineering
* Context-aware reasoning

### 🔹 DevOps & Tools

* Maven
* Docker (planned)
* Git & GitHub
* IntelliJ IDEA

---

## 📂 Project Structure

```
controller → API endpoints  
service → business logic  
repository → database access  
entity → database models  
dto → request/response  
enums → constants  
exceptions → error handling  
```

---

## 🔌 Core Features

### 1️⃣ Transaction Management

* Add income & expense transactions
* Categorize financial data
* Maintain user history

---

### 2️⃣ Financial Analysis Engine

* Computes:

    * Total income
    * Total expenses
    * Savings
* Generates insights:

    * Low savings alerts
    * High expense warnings

---

### 3️⃣ Intelligent Advice System

* Rule-based recommendations
* Future GenAI-based insights:

    * Personalized advice
    * Financial planning suggestions

---

### 4️⃣ AI Chat System (Upcoming)

* Conversational financial assistant
* Context-aware responses
* Memory using MongoDB

---

## 🔌 API Endpoints

### ➤ Add Transaction

```
POST /transactions
```

```json
{
  "userId": 1,
  "amount": 10000,
  "type": "INCOME",
  "category": "Salary",
  "description": "Monthly salary"
}
```

---

### ➤ Get Financial Analysis

```
GET /analysis/{userId}
```

**Response:**

```json
{
  "income": 10000,
  "expense": 4000,
  "savings": 6000,
  "advice": [
    "Reduce unnecessary expenses"
  ]
}
```

---

## 🧠 GenAI Integration 

ArthaSarthi will integrate LLMs to:

* Interpret financial data
* Provide human-like advice
* Answer user queries conversationally
* Perform long-term financial planning

Example:

```
User: "Can I afford a vacation next month?"
AI: "Based on your savings and expense patterns..."
```

---

## 🖥️ Frontend

* React-based dashboard
* Financial summary visualization
* Chat interface for AI interaction
* Responsive UI

---

## 🐳 Containerization 

The application will be containerized using Docker:

* Backend container (Spring Boot)
* Database containers (MariaDB, MongoDB)
* Frontend container (React)

### Example:

```
docker-compose up --build
```

Benefits:

* Easy setup
* Environment consistency
* Scalable deployment

---

## ☁️ Deployment 

Deployment strategy:

* Backend → AWS / Render / Railway
* Database → Managed DB services
* Frontend → Vercel / Netlify
* Docker-based deployment pipeline

CI/CD (future):

* GitHub Actions
* Automated builds & deployments

---

## 🔄 Development Roadmap

### ✅ Phase 1 

* Backend architecture
* Transaction APIs
* Financial analysis

### 🚧 Phase 2 

* Financial profile system
* Advice history tracking

### 🔜 Phase 3

* GenAI integration
* Chat system

### 🔮 Phase 4

* Frontend development
* Deployment & scaling

---

## ⚙️ Setup Instructions

1. Clone repository:

```
git clone https://github.com/<your-username>/ArthaSarthi.git
```

2. Navigate:

```
cd ArthaSarthi/backend
```

3. Configure DB:

```
application.properties
```

4. Run backend:

```
mvn spring-boot:run
```

---

## 📌 Key Design Principles

* Clean Architecture
* Separation of Concerns
* Backend-first development
* AI-ready system design
* Scalable microservice-friendly structure

---

## ⭐ Why This Project Stands Out

* Combines **Backend + AI + System Design**
* Real-world fintech use case
* Designed for **GenAI integration from day one**
* Extensible to full-stack production system

---

## 👤 Author

**Rishabh Srivastava**<br>
Backend Developer | AI Enthusiast

---

## 📬 Future Scope

* Investment recommendations
* Credit scoring system
* Budget optimization
* Portfolio management system

---

> 🚀 ArthaSarthi aims to bridge financial data with intelligent decision-making using Backend Engineering and Generative AI.
