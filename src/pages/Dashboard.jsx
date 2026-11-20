import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <section className="page-card">
      <h1>Welcome to Dashboard</h1>
      <p>This page is protected. Only logged-in users can access it.</p>
      <p><strong>Logged-in user's email:</strong> {user?.email}</p>
    </section>
  );
}
