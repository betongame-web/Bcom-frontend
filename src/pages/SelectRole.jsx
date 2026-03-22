import { useNavigate } from "react-router-dom";
import "../styles/select-role.css";

export default function SelectRole() {
  const navigate = useNavigate();

  function handleWorkplaceClick() {
    alert("Workplace is not Active. Please contact your personal Manager.");
  }

  function handleTeamLeaderClick() {
    navigate("/profile");
  }

  return (
    <div className="select-role-page">
      <div className="select-role-overlay"></div>

      <main className="select-role-wrap">
        <div className="select-role-card">
          <h1 className="select-role-title">Choose Option</h1>
          <p className="select-role-subtitle">
            Please select one option to continue
          </p>

          <div className="select-role-actions">
            <button
              className="select-role-btn"
              onClick={handleWorkplaceClick}
            >
              Workplace
            </button>

            <button
              className="select-role-btn"
              onClick={handleTeamLeaderClick}
            >
              Team Leader
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}