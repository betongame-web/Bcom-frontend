import "../styles/profile.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "********",
    registration: "16/03/2026",
    phone: "",
    lastName: "",
    firstName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    documentType: "National ID card",
    documentNumber: "",
    documentIssueDate: "",
    country: "Pakistan",
    city: "",
    address: "",
  });

  const [editingField, setEditingField] = useState(null);

  const fieldLabels = {
    email: "Email",
    password: "Password",
    phone: "Phone",
    lastName: "Last name",
    firstName: "First name",
    dateOfBirth: "Date of birth",
    placeOfBirth: "Place of birth",
    documentNumber: "Document number",
    documentIssueDate: "Document issue date",
    address: "Permanent registered address",
  };

  function openEditor(field) {
    setEditingField(field);
  }

  function closeEditor() {
    setEditingField(null);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function saveField() {
    setEditingField(null);
  }

  return (
    <div className="profile-page">
      <header className="profile-topbar">
        <div className="profile-top-left">
          <div className="profile-logo">
            <div className="logo-row">
              <span className="logo-white">BET</span>
              <span className="logo-pill">ON</span>
            </div>
            <div className="logo-row">
              <span className="logo-green">GAME</span>
            </div>
          </div>
        </div>

        <div className="profile-top-right">
          <div className="balance-box">
            <div className="balance-left">
              <div className="balance-title-row">
                <span className="balance-title">Main account (PKR)</span>
                <span className="balance-arrow">⌄</span>
              </div>
              <span className="balance-amount">0</span>
            </div>

            <button
              className="balance-plus-btn"
              onClick={() => navigate("/deposit")}
            >
              +
            </button>
          </div>

          <div className="profile-user-wrap">
            <div className="profile-user-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c1.8-3.6 5-5 8-5s6.2 1.4 8 5" />
                <circle cx="12" cy="12" r="10.5" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <div className="profile-title-bar">Personal profile</div>

      <div className="profile-account-row">
        <span>Main account</span>
        <span>№1598145559</span>
      </div>

      <main className="profile-content">
        <div className="profile-form-card">
          <div className="profile-form-row">
            <div className="profile-label">Email</div>
            <div
              className={`profile-value ${!formData.email ? "muted danger-text" : ""}`}
            >
              {formData.email || "Not specified"}
            </div>
            <div className="profile-action-cell">
              <button
                className="profile-action-btn"
                onClick={() => openEditor("email")}
              >
                {formData.email ? "Change" : "Add"}
              </button>
            </div>
          </div>

          <div className="profile-form-row">
            <div className="profile-label">Password</div>
            <div className="profile-value">{formData.password}</div>
            <div className="profile-action-cell">
              <button
                className="profile-action-btn"
                onClick={() => openEditor("password")}
              >
                Change
              </button>
            </div>
          </div>

          <div className="profile-form-row">
            <div className="profile-label">Registration</div>
            <div className="profile-value"></div>
            <div className="profile-right-text">{formData.registration}</div>
          </div>

          <div className="profile-form-row">
            <div className="profile-label">Phone</div>
            <div className="profile-value">{formData.phone}</div>
            <div className="profile-action-cell">
              <button
                className="profile-action-btn"
                onClick={() => openEditor("phone")}
              >
                Change
              </button>
            </div>
          </div>

          <div className="profile-form-row">
            <div className="profile-label">
              Last name <span className="required-star">*</span>
            </div>
            <div className="profile-value">{formData.lastName}</div>
            <div className="profile-action-cell">
              <button
                className="profile-action-btn"
                onClick={() => openEditor("lastName")}
              >
                Change
              </button>
            </div>
          </div>

          <div className="profile-form-row">
            <div className="profile-label">
              First name <span className="required-star">*</span>
            </div>
            <div className="profile-value">{formData.firstName}</div>
            <div className="profile-action-cell">
              <button
                className="profile-action-btn"
                onClick={() => openEditor("firstName")}
              >
                Change
              </button>
            </div>
          </div>

          <div className="profile-form-row">
            <div className="profile-label">
              Date of birth <span className="required-star">*</span>
            </div>
            <div className="profile-value">{formData.dateOfBirth}</div>
            <div className="profile-action-cell">
              <button
                className="profile-action-btn"
                onClick={() => openEditor("dateOfBirth")}
              >
                Change
              </button>
            </div>
          </div>

          <div className="profile-form-row">
            <div className="profile-label">Place of birth</div>
            <div className="profile-value">{formData.placeOfBirth}</div>
            <div className="profile-action-cell">
              <button
                className="profile-action-btn"
                onClick={() => openEditor("placeOfBirth")}
              >
                Change
              </button>
            </div>
          </div>

          <div className="profile-form-row">
            <div className="profile-label">Type of document</div>
            <div className="profile-value"></div>
            <div className="profile-right-text">{formData.documentType}</div>
          </div>

          <div className="profile-form-row">
            <div className="profile-label">
              Document number <span className="required-star">*</span>
            </div>
            <div className="profile-value">{formData.documentNumber}</div>
            <div className="profile-action-cell">
              <button
                className="profile-action-btn"
                onClick={() => openEditor("documentNumber")}
              >
                Change
              </button>
            </div>
          </div>

          <div className="profile-form-row">
            <div className="profile-label">Document issue date</div>
            <div className="profile-value">{formData.documentIssueDate}</div>
            <div className="profile-action-cell">
              <button
                className="profile-action-btn"
                onClick={() => openEditor("documentIssueDate")}
              >
                Change
              </button>
            </div>
          </div>

          <div className="profile-form-row">
            <div className="profile-label">Country</div>
            <div className="profile-value"></div>
            <div className="profile-right-text">{formData.country}</div>
          </div>

          <div className="profile-form-row city-row">
            <div className="profile-label">City</div>
            <div className="profile-city-wrap">
              <select
                className="profile-city-select"
                name="city"
                value={formData.city}
                onChange={handleChange}
              >
                <option value="">Select city</option>
                <option>Abbottabad</option>
<option>Abdul Hakeem</option>
<option>Ahmedpur East</option>
<option>Ahmedpur Sial</option>
<option>Akora Khattak</option>
<option>Alipur</option>
<option>Arifwala</option>
<option>Attock</option>
<option>Badin</option>
<option>Bahawalnagar</option>
<option>Bahawalpur</option>
<option>Bannu</option>
<option>Basirpur</option>
<option>Batkhela</option>
<option>Bhakkar</option>
<option>Bhalwal</option>
<option>Bhimber</option>
<option>Burewala</option>
<option>Chakwal</option>
<option>Chaman</option>
<option>Charsadda</option>
<option>Chichawatni</option>
<option>Chiniot</option>
<option>Chishtian</option>
<option>Dadu</option>
<option>Daska</option>
<option>Dera Ghazi Khan</option>
<option>Dera Ismail Khan</option>
<option>Faisalabad</option>
<option>Ghotki</option>
<option>Gojra</option>
<option>Gujranwala</option>
<option>Gujrat</option>
<option>Gwadar</option>
<option>Hafizabad</option>
<option>Haripur</option>
<option>Hasilpur</option>
<option>Haveli Lakha</option>
<option>Hyderabad</option>
<option>Islamabad</option>
<option>Jacobabad</option>
<option>Jaranwala</option>
<option>Jhang</option>
<option>Jhelum</option>
<option>Kalat</option>
<option>Kamalia</option>
<option>Kamoke</option>
<option>Karachi</option>
<option>Kasur</option>
<option>Khairpur</option>
<option>Khanewal</option>
<option>Khanpur</option>
<option>Khuzdar</option>
<option>Kohat</option>
<option>Kot Addu</option>
<option>Kotli</option>
<option>Lahore</option>
<option>Larkana</option>
<option>Layyah</option>
<option>Lodhran</option>
<option>Mandi Bahauddin</option>
<option>Mansehra</option>
<option>Mardan</option>
<option>Matiari</option>
<option>Mianwali</option>
<option>Mingora</option>
<option>Mirpur</option>
<option>Mirpur Khas</option>
<option>Multan</option>
<option>Muzaffargarh</option>
<option>Nankana Sahib</option>
<option>Nawabshah</option>
<option>Nowshera</option>
<option>Okara</option>
<option>Pakpattan</option>
<option>Peshawar</option>
<option>Quetta</option>
<option>Rahim Yar Khan</option>
<option>Rawalpindi</option>
<option>Sadiqabad</option>
<option>Sahiwal</option>
<option>Sambrial</option>
<option>Sargodha</option>
<option>Shahdadkot</option>
<option>Sheikhupura</option>
<option>Shikarpur</option>
<option>Sialkot</option>
<option>Sukkur</option>
<option>Swabi</option>
<option>Swat</option>
<option>Tando Adam</option>
<option>Tando Allahyar</option>
<option>Turbat</option>
<option>Vehari</option>
<option>Wah Cantonment</option>
<option>Zhob</option>


              </select>
            </div>
          </div>

          <div className="profile-form-row address-row">
            <div className="profile-label multiline-label">
              Permanent registered address
            </div>
            <div className="profile-value">{formData.address}</div>
            <div className="profile-action-cell">
              <button
                className="profile-action-btn"
                onClick={() => openEditor("address")}
              >
                Change
              </button>
            </div>
          </div>

          <button className="save-btn full-save-btn">Save</button>
        </div>

        <button className="cancel-btn" onClick={() => navigate("/")}>
          Cancel
        </button>
      </main>

      {editingField && (
        <div className="edit-modal-overlay" onClick={closeEditor}>
          <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
            <h3 className="edit-modal-title">{fieldLabels[editingField]}</h3>

            {editingField === "address" ? (
              <textarea
                className="edit-input edit-textarea"
                name={editingField}
                value={formData[editingField]}
                onChange={handleChange}
                placeholder={`Enter ${fieldLabels[editingField]}`}
              />
            ) : (
              <input
                className="edit-input"
                type={
                  editingField === "dateOfBirth" ||
                  editingField === "documentIssueDate"
                    ? "date"
                    : editingField === "email"
                    ? "email"
                    : "text"
                }
                name={editingField}
                value={formData[editingField]}
                onChange={handleChange}
                placeholder={`Enter ${fieldLabels[editingField]}`}
              />
            )}

            <div className="edit-modal-actions">
              <button className="modal-btn modal-cancel" onClick={closeEditor}>
                Cancel
              </button>
              <button className="modal-btn modal-save" onClick={saveField}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}