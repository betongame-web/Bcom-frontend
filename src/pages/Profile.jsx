import "../styles/profile.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API_URL from "../config";

export default function Profile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    registration: "23/03/2026",
    phone: "",
    lastName: "",
    firstName: "",
    dateOfBirth: "",
    placeOfBirth: "",
    documentType: "National ID card",
    documentNumber: "",
    documentIssueDate: "",
    country: "Bangladesh",
    city: "",
    address: ""
  });

  const [fieldLocks, setFieldLocks] = useState({
    email: false,
    phone: false,
    lastName: false,
    firstName: false,
    dateOfBirth: false,
    placeOfBirth: false,
    documentNumber: false,
    documentIssueDate: false,
    city: false,
    address: false
  });

  const [editingField, setEditingField] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingField, setSavingField] = useState(false);
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
    address: "Permanent registered address"
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
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
        return;
      }

      const profile = data.user?.profile || {};
      const locks = data.user?.fieldLocks || {};

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
        country: profile.country || "Bangladesh",
        city: profile.city || "",
        address: profile.address || ""
      }));

      setFieldLocks({
        email: Boolean(locks.email),
        phone: Boolean(locks.phone),
        lastName: Boolean(locks.lastName),
        firstName: Boolean(locks.firstName),
        dateOfBirth: Boolean(locks.dateOfBirth),
        placeOfBirth: Boolean(locks.placeOfBirth),
        documentNumber: Boolean(locks.documentNumber),
        documentIssueDate: Boolean(locks.documentIssueDate),
        city: Boolean(locks.city),
        address: Boolean(locks.address)
      });
    } catch (error) {
      setMessage("Profile load failed");
    } finally {
      setLoadingProfile(false);
    }
  }

  function openEditor(field) {
    if (fieldLocks[field]) return;
    setEditingField(field);
    setMessage("");
  }

  function closeEditor() {
    setEditingField(null);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function saveField() {
    if (!editingField) return;

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    try {
      setSavingField(true);
      setMessage("");

      const res = await fetch(`${API_URL}/api/profile/save-field`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          field: editingField,
          value: formData[editingField]
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setMessage(data.message || "Field save failed");
        return;
      }

      const profile = data.user?.profile || {};
      const locks = data.user?.fieldLocks || {};

      setFormData((prev) => ({
        ...prev,
        email: profile.email || prev.email,
        phone: profile.phone || prev.phone,
        lastName: profile.lastName || prev.lastName,
        firstName: profile.firstName || prev.firstName,
        dateOfBirth: profile.dateOfBirth || prev.dateOfBirth,
        placeOfBirth: profile.placeOfBirth || prev.placeOfBirth,
        documentType: profile.documentType || prev.documentType,
        documentNumber: profile.documentNumber || prev.documentNumber,
        documentIssueDate: profile.documentIssueDate || prev.documentIssueDate,
        country: profile.country || prev.country,
        city: profile.city || prev.city,
        address: profile.address || prev.address
      }));

      setFieldLocks({
        email: Boolean(locks.email),
        phone: Boolean(locks.phone),
        lastName: Boolean(locks.lastName),
        firstName: Boolean(locks.firstName),
        dateOfBirth: Boolean(locks.dateOfBirth),
        placeOfBirth: Boolean(locks.placeOfBirth),
        documentNumber: Boolean(locks.documentNumber),
        documentIssueDate: Boolean(locks.documentIssueDate),
        city: Boolean(locks.city),
        address: Boolean(locks.address)
      });

      setEditingField(null);
      setMessage("Saved successfully");
    } catch (error) {
      setMessage("Field save failed");
    } finally {
      setSavingField(false);
    }
  }

  async function saveCityField() {
    if (fieldLocks.city) return;

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    if (!formData.city) {
      setMessage("Select city first");
      return;
    }

    try {
      setSavingField(true);
      setMessage("");

      const res = await fetch(`${API_URL}/api/profile/save-field`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          field: "city",
          value: formData.city
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setMessage(data.message || "City save failed");
        return;
      }

      const locks = data.user?.fieldLocks || {};

      setFieldLocks((prev) => ({
        ...prev,
        city: Boolean(locks.city)
      }));

      setMessage("Saved successfully");
    } catch (error) {
      setMessage("City save failed");
    } finally {
      setSavingField(false);
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
                <span className="balance-title">Main account (BDT)</span>
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
        <span>№1603944251</span>
      </div>

      {message ? <div className="profile-message-bar">{message}</div> : null}

      <main className="profile-content">
        <div className="profile-form-card">
          <div className="profile-form-row">
            <div className="profile-label">Email</div>
            <div className={`profile-value ${!formData.email ? "muted danger-text" : ""}`}>
              {formData.email || "Not specified"}
            </div>
            <div className="profile-action-cell">
              <button
                className="profile-action-btn"
                onClick={() => openEditor("email")}
                disabled={fieldLocks.email}
              >
                {formData.email ? "Change" : "Add"}
              </button>
            </div>
          </div>

          <div className="profile-form-row">
            <div className="profile-label">Password</div>
            <div className="profile-value">{formData.password}</div>
            <div className="profile-action-cell">
              <button className="profile-action-btn" disabled>
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
                disabled={fieldLocks.phone}
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
                disabled={fieldLocks.lastName}
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
                disabled={fieldLocks.firstName}
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
                disabled={fieldLocks.dateOfBirth}
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
                disabled={fieldLocks.placeOfBirth}
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
                disabled={fieldLocks.documentNumber}
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
                disabled={fieldLocks.documentIssueDate}
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
                disabled={fieldLocks.city}
              >
 <option value="">Select city</option>
<option>Abdullahpur</option>
<option>Abhaynagar</option>
<option>Adabar</option>
<option>Amtali</option>
<option>Andulia</option>
<option>Astagram</option>
<option>Atulia</option>
<option>Bamna</option>
<option>Bamundi</option>
<option>Barguna</option>
<option>Bauphal</option>
<option>Bayezid</option>
<option>Beanibazar</option>
<option>Bhola</option>
<option>Bhuapur</option>
<option>Bhurungamari</option>
<option>Chakaria</option>
<option>Chandanaish</option>
<option>Chandina</option>
<option>Chowgacha</option>
<option>Chowmuhani</option>
<option>Chuadanga</option>
<option>Debiganj</option>
<option>Delduar</option>
<option>Demra</option>
<option>Dohar</option>
<option>Domar</option>
<option>Domsar</option>
<option>Fulbaria</option>
<option>Fulgazi</option>
<option>Haripur</option>
<option>Harirampur</option>
<option>Hathazari</option>
<option>Kalkini</option>
<option>Kaliganj</option>
<option>Katiadi</option>
<option>Kishoreganj</option>
<option>Mithamoin</option>
<option>Meherpur</option>
<option>Mithapukur</option>
<option>Mouchak</option>
<option>Moulvibazar</option>
<option>Nangalkot</option>
<option>Narail</option>
<option>Narayanganj</option>
<option>Pabna</option>
<option>Palash</option>
<option>Puthia</option>
<option>Raozan</option>
<option>Rayganj</option>
<option>Shadullapur</option>
<option>Shahjadpur</option>
<option>Shyamnagar</option>
<option>Singair</option>
<option>Sirajdikhan</option>
<option>Tangail</option>
<option>Tarail</option>
<option>Tarakanda</option>
              </select>
            </div>
            <div className="profile-action-cell">
              <button
                className="profile-action-btn"
                onClick={saveCityField}
                disabled={fieldLocks.city || savingField}
              >
                {formData.city ? "Save" : "Save"}
              </button>
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
                disabled={fieldLocks.address}
              >
                Change
              </button>
            </div>
          </div>
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
            )}

            <div className="edit-modal-actions">
              <button className="modal-btn modal-cancel" onClick={closeEditor}>
                Cancel
              </button>
              <button className="modal-btn modal-save" onClick={saveField}>
                {savingField ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}