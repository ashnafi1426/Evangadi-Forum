import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AboutPage from "./components/About/About";
import Home from "./pages/Home/Home";
import SignUp from "./pages/SignUp/SignUp";
// import SignIn from "./pages/SignIn/SignIn";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import AnswerPage from "./pages/Answers/Answers";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/Login/Login";

function App() {
  return (
    <>
      {/* Header appears on all pages */}
      <Header />

      <main>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<AboutPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
     />
          <Route
            path="/ask"
            element={
              <ProtectedRoute>
                <AskQuestion />
              </ProtectedRoute>
            }
          />

          <Route
            path="/questions/:id"
            element={
              <ProtectedRoute>
                <AnswerPage />
              </ProtectedRoute>
            }
          />
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {/* Footer visible on all pages */}
      <Footer />
    </>
  );
}

export default App;

