"use client";
import React, { useState, useEffect } from "react";
import ApiClient from "@/Services/APIs";
import "./editprofile.css";

const EditProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    password: "",
    password_confirmation: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await ApiClient.get("merchant/me");
        if (res?.data) {
          setProfileData({
            ...profileData,
            name: res.data.name || "",
            email: res.data.email || "",
            phone: res.data.phone || "",
            company: res.data.company || "",
            address: res.data.address || "",
          });
        }
      } catch (err) {
        console.error("❌ Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSaveClick = async () => {
    if (!validateEmail(profileData.email)) {
      alert("❌ البريد الإلكتروني غير صحيح");
      return;
    }

    try {
      const dataToSend = { ...profileData };
      if (!dataToSend.password) delete dataToSend.password;
      if (!dataToSend.password_confirmation)
        delete dataToSend.password_confirmation;

      const res = await ApiClient.put("merchant/profile", dataToSend);
      console.log("✅ Profile updated:", res);
      setIsEditing(false);
      setProfileData({
        ...profileData,
        password: "",
        password_confirmation: "",
      });
      alert("تم حفظ التغييرات بنجاح!");
    } catch (err) {
      console.error("❌ Error updating profile:", err);
      alert(err?.response?.data?.message || "حصل خطأ أثناء حفظ التغييرات");
    }
  };

  return (
    <div className="editprofile-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="editprofile-content">
          <div className="profile-section">
            <div className="profile-header">
              <h2>{profileData.name}</h2>
              <button
                className={isEditing ? "save-btn" : "edit-btn"}
                onClick={isEditing ? handleSaveClick : () => setIsEditing(true)}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  disabled={!isEditing}
                  className={isEditing ? "editable" : ""}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  disabled={!isEditing}
                  className={isEditing ? "editable" : ""}
                  placeholder="ادخل ايميل جديد"
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={profileData.phone}
                  onChange={(e) =>
                    setProfileData({ ...profileData, phone: e.target.value })
                  }
                  disabled={!isEditing}
                  className={isEditing ? "editable" : ""}
                />
              </div>

              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  value={profileData.company}
                  onChange={(e) =>
                    setProfileData({ ...profileData, company: e.target.value })
                  }
                  disabled={!isEditing}
                  className={isEditing ? "editable" : ""}
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={(e) =>
                    setProfileData({ ...profileData, address: e.target.value })
                  }
                  disabled={!isEditing}
                  className={isEditing ? "editable" : ""}
                />
              </div>

              {isEditing && (
                <>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      name="password"
                      value={profileData.password}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          password: e.target.value,
                        })
                      }
                      className="editable"
                      placeholder="ادخلي كلمة السر الجديدة"
                    />
                  </div>

                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      name="password_confirmation"
                      value={profileData.password_confirmation}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          password_confirmation: e.target.value,
                        })
                      }
                      className="editable"
                      placeholder="تأكيد كلمة السر"
                    />
                  </div>
                </>
              )}
            </div>

            {isEditing && (
              <div className="action-buttons">
                <button
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
