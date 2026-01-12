# InterviewMate 🚀

InterviewMate is an AI-powered interview preparation platform designed to help users ace their technical interviews. By leveraging Google's Gemini AI, it provides personalized mock interviews, real-time feedback, and a comprehensive coding environment.

![Project Status](https://img.shields.io/badge/status-active-success.svg)

## ✨ Features

- **🤖 AI-Powered Interviews**: Practice with questions tailored to your skills using Google Gemini AI.
- **📝 Real-time Feedback**: Get instant analysis of your answers and code.
- **💻 Interactive Dashboard**: Track your progress, past sessions, and upcoming goals.
- **🔐 Secure Authentication**: User sign-up and login powered by JWT and secure password hashing.
- **🎨 Modern UI/UX**: A responsive and beautiful interface built with React, Tailwind CSS 4, and Framer Motion.
- **📂 Session Management**: Save and review your interview sessions.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **State Management**: Context API
- **Routing**: React Router DOM 7
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **AI Engine**: Google GenAI (Gemini)
- **Authentication**: JSON Web Tokens (JWT) & BCrypt
- **File Handling**: Multer

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (Local or Atlas URL)
- Google Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/interview-mate.git
cd interview-mate
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd ../frontend
npm install
```

Start the development server:
```bash
npm run dev
```

The application should now be running at `http://localhost:5173` (or the port shown in your terminal).

## 📂 Project Structure

```bash
InterviewMate/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   └── server.js
└── frontend/
    ├── assests/
    ├── src/
    │   ├── assets/
    │   ├── Components/
    │   ├── Context/
    │   ├── Pages/
    │   ├── Utils/
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    └── package.json
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
