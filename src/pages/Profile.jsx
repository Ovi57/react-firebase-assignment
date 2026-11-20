import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <section className="page-card">
      <h1>Profile Page</h1>
      <p>This page is protected. Only logged-in users can access it.</p>
      <p><strong>Logged-in user's email:</strong> {user?.email}</p>
      <button className="primary-button profile-logout" type="button" onClick={handleLogout}>
        Logout
      </button>
    </section>
  );
}
