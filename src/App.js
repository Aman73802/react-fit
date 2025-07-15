import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SavedPlans from "./pages/SavedPlans";
import ProtectedRoute from "./components/ProtectedRoute";
import Progress from "./pages/Progress";


import Feedback from "./pages/Feedback";
import AdminFeedback from "./pages/AdminFeedback";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/progress"
          element={
            <ProtectedRoute>
              <Progress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/plans"
          element={
            <ProtectedRoute>
              <SavedPlans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-feedback"
          element={
            <ProtectedRoute>
              <AdminFeedback />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
