import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { firebaseConfigured } from "./firebase";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

export default function App() {
  const { authError } = useAuth();

  return (
    <div className="app-shell">
      <Navbar />

      {!firebaseConfigured && (
        <div className="setup-warning" role="status">
          Firebase is not configured yet. Copy <code>.env.example</code> to <code>.env</code>, add your Firebase web app settings, then restart the server.
        </div>
      )}

      {authError && (
        <div className="setup-warning" role="alert">
          Authentication setup issue: {authError}
        </div>
      )}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* All routes nested here require an authenticated Firebase user. */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">React Router + Firebase Authentication Assignment</footer>
    </div>
  );
}
