import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/select-role.css";

export default function SelectRole() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  function handleWorkplaceClick() {
    setShowPopup(true);
  }

  function handleClosePopup() {
    setShowPopup(false);
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

      {showPopup && (
        <div className="role-popup-overlay" onClick={handleClosePopup}>
          <div
            className="role-popup-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="role-popup-close"
              onClick={handleClosePopup}
              aria-label="Close popup"
            >
              ×
            </button>

            <h2 className="role-popup-title">Notice</h2>

            <p className="role-popup-text">
              Workplace is not Active. Please contact your personal Manager.
            </p>

            <button
              className="role-popup-btn"
              onClick={handleClosePopup}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}