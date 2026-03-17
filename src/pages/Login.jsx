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

      navigate("/profile");
    } catch (error) {
      setErrorText("Server connection failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="bg-orb orb-top-left"></div>
      <div className="bg-orb orb-top-right"></div>
      <div className="bg-orb orb-center"></div>
      <div className="bg-orb orb-bottom-left"></div>

      <header className="login-brand login-brand-top">
        <span className="brand-white">BET</span>
        <span className="brand-pill">ON</span>
        <span className="brand-green">GAME</span>
      </header>

      <main className="portal-wrap">
        <h1 className="portal-title">USER PORTAL</h1>

        <form className="login-card" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="user id"
            className="portal-input"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <input
            type="password"
            placeholder="password"
            className="portal-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {errorText ? <p className="login-error">{errorText}</p> : null}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </main>

      <footer className="login-brand login-brand-bottom">
        <span className="brand-white">BET</span>
        <span className="brand-pill">ON</span>
        <span className="brand-green">GAME</span>
      </footer>
    </div>
  );
}