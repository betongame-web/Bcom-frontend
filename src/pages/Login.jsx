import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    navigate("/profile");
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
            placeholder="username"
            className="portal-input"
          />

          <input
            type="password"
            placeholder="password"
            className="portal-input"
          />

          <button type="submit" className="login-btn">
            Login
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
