import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setErrorText("");

    if (!userId.trim() || !password.trim()) {
      setErrorText("User ID এবং password দিন");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorText(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.userId);

      navigate("/select-role");
    } catch (error) {
      setErrorText("Server connection failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-overlay"></div>

      <main className="login-center">
        <form className="login-card" onSubmit={handleLogin}>
          <div className="login-topbar">
            <div className="login-logo-wrap">
  <div className="login-brand">
    <span className="brand-white">BET</span>

    <span className="brand-toggle">
      <span className="brand-toggle-circle"></span>
    </span>

    <span className="brand-white brand-n">N</span>
    <span className="brand-green">GAME</span>
    <span className="brand-management">Management</span>
  </div>
</div>

            <div className="lang-box">🇬🇧 EN </div>
          </div>

          <div className="input-group">
            <span className="input-icon">👤</span>
            <input
              type="text"
              placeholder="Enter username"
              className="portal-input"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>

          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              placeholder="Enter password"
              className="portal-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorText ? <p className="login-error">{errorText}</p> : null}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "LOGGING IN..." : "LOG IN"}
          </button>
        </form>
      </main>
    </div>
  );
}