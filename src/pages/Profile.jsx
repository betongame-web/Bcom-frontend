import "../styles/profile.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API_URL from "../config";

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
  const [profileLocked, setProfileLocked] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [message, setMessage] = useState("");

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

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      setLoadingProfile(true);
      setMessage("");

      const res = await fetch(`${API_URL}/api/profile/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
        return;
      }

      const profile = data.user?.profile || {};

      setProfileLocked(Boolean(data.user?.profileLocked));

      setFormData((prev) => ({
        ...prev,
        email: profile.email || "",
        phone: profile.phone || "",
        lastName: profile.lastName || "",
        firstName: profile.firstName || "",
        dateOfBirth: profile.dateOfBirth || "",
        placeOfBirth: profile.placeOfBirth || "",
        documentType: profile.documentType || "National ID card",
        documentNumber: profile.documentNumber || "",
        documentIssueDate: profile.documentIssueDate || "",
        country: profile.country || "Pakistan",
        city: profile.city || "",
        address: profile.address || "",
      }));
    } catch (error) {
      setMessage("Profile load failed");
    } finally {
      setLoadingProfile(false);
    }
  }

  function openEditor(field) {
    if (profileLocked) {
      setMessage("Profile already submitted and locked");
      return;
    }
    setEditingField(field);
    setMessage("");
  }

  function closeEditor() {
    setEditingField(null);
  }

  function handleChange(e) {
    if (profileLocked) return;

    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function saveField() {
    setEditingField(null);
  }

  async function handleSaveProfile() {
    if (profileLocked) {
      setMessage("Profile already submitted and locked");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      setSavingProfile(true);
      setMessage("");

      const payload = {
        email: formData.email,
        phone: formData.phone,
        lastName: formData.lastName,
        firstName: formData.firstName,
        dateOfBirth: formData.dateOfBirth,
        placeOfBirth: formData.placeOfBirth,
        documentType: formData.documentType,
        documentNumber: formData.documentNumber,
        documentIssueDate: formData.documentIssueDate,
        country: formData.country,
        city: formData.city,
        address: formData.address,
      };

      const res = await fetch(`${API_URL}/api/profile/save-once`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setMessage(data.message || "Profile save failed");
        return;
      }

      const profile = data.user?.profile || {};

      setFormData((prev) => ({
        ...prev,
        email: profile.email || "",
        phone: profile.phone || "",
        lastName: profile.lastName || "",
        firstName: profile.firstName || "",
        dateOfBirth: profile.dateOfBirth || "",
        placeOfBirth: profile.placeOfBirth || "",
        documentType: profile.documentType || "National ID card",
        documentNumber: profile.documentNumber || "",
        documentIssueDate: profile.documentIssueDate || "",
        country: profile.country || "Pakistan",
        city: profile.city || "",
        address: profile.address || "",
      }));

      setProfileLocked(true);
      setEditingField(null);
      setMessage("Profile saved successfully and locked forever");
    } catch (error) {
      setMessage("Profile save failed");
    } finally {
      setSavingProfile(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  }

  if (loadingProfile) {
    return (
      <div className="profile-page">
        <div className="profile-loading">Loading profile...</div>
      </div>
    );
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
            <div className="profile-user-icon" onClick={() => navigate("/profile")}>
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

      {message ? (
        <div className="profile-message-bar">{message}</div>
      ) : null}

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
                disabled={profileLocked}
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
                disabled={profileLocked}
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
                disabled={profileLocked}
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
                disabled={profileLocked}
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
                disabled={profileLocked}
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
                disabled={profileLocked}
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
                disabled={profileLocked}
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
                disabled={profileLocked}
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
                disabled={profileLocked}
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
                disabled={profileLocked}
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
                disabled={profileLocked}
              >
                Change
              </button>
            </div>
          </div>

          <button
            className="save-btn full-save-btn"
            onClick={handleSaveProfile}
            disabled={profileLocked || savingProfile}
          >
            {profileLocked
              ? "Profile Locked"
              : savingProfile
              ? "Saving..."
              : "Save"}
          </button>
        </div>

        <button className="cancel-btn" onClick={handleLogout}>
          Logout
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
         