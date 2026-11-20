import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <section className="page-card">
      <h1>Welcome to Home Page</h1>
      <p>This is the public home page. Anyone can visit this page.</p>
      {user ? (
        <p>You are logged in as <strong>{user.email}</strong>.</p>
      ) : (
        <p><Link to="/login">Login</Link> or <Link to="/register">create an account</Link> to access protected pages.</p>
      )}
    </section>
  );
}
