import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddLauncherPage from "./pages/AddLauncherPage";
import PageDetailsLaunche from "./pages/PageDetailsLaunche";
import Navbar from "./components/Navbar";
import UpdatePage from "./pages/UpdatePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/register"
          element={
            <ProtectedRoute allowedTypes={["admin"]}>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute allowedTypes={["admin", "air_force", "intel"]}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-launcher"
          element={
            <ProtectedRoute allowedTypes={["admin", "intel"]}>
              <AddLauncherPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/launcher/:id"
          element={
            <ProtectedRoute allowedTypes={["admin", "air_force", "intel"]}>
              <PageDetailsLaunche />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute allowedTypes={["admin", "intel"]}>
              <UpdatePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>

  )
}

export default App