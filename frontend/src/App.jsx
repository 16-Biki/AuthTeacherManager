import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Teachers from "./pages/Teachers";

const Nav = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <nav className="nav">
      <div className="logo">Auth-Teachers</div>
      <div>
        {!user && <Link to="/register">Register</Link>}
        {!user && <Link to="/login">Login</Link>}
        {user && <Link to="/users">Users</Link>}
        {user && <Link to="/teachers">Teachers</Link>}
        {user && (
          <button
            className="link-btn"
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Nav />
      <div className="container">
        <Routes>
          {/* Root route: redirect depending on login */}
          <Route
            path="/"
            element={
              !user ? <Navigate to="/login" /> : <Navigate to="/users" />
            }
          />

          {/* Register page accessible only if not logged in */}
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/users" />}
          />

          {/* Login page accessible only if not logged in */}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/users" />}
          />

          {/* Protected routes */}
          <Route
            path="/users"
            element={user ? <Users /> : <Navigate to="/login" />}
          />
          <Route
            path="/teachers"
            element={user ? <Teachers /> : <Navigate to="/login" />}
          />

          {/* Catch-all unknown paths */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
