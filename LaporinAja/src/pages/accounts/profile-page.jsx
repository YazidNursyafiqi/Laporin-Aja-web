import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./account-page.module.css";
import Header from "../../container/header/header";


function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "Pengguna", email: "user@example.com" });

  useEffect(() => {
    // Coba ambil data user dari localStorage (jika ada)
    // Sesuaikan key-nya dengan sistem login kamu
    const savedUser = localStorage.getItem("user"); 
    if (savedUser) {
      // Jika dismpan sebagai JSON string
      // setUser(JSON.parse(savedUser));
      // Atau jika cuma simpan username string:
      setUser({ ...user, username: savedUser });
    }
  }, []);

  const handleLogout = () => {
    // 1. Hapus data sesi
    localStorage.clear(); // Hapus token, user, dll
    
    // 2. Redirect ke login atau home
    alert("Anda berhasil keluar!");
    navigate("/login");
  };

  return (
    <div>
      <div>
        <Header/>
      </div>

      <div className={styles.container}>
        <div className={styles.card}>
          <div style={{ marginBottom: "30px", textAlign: "left" }}>
            <label className={styles.label}>Username</label>
            <div className={styles.input} style={{ backgroundColor: "#e2e8f0", color: "#555" }}>
              {user.username}
            </div>

            <br/>
            
            <label className={styles.label}>Status Akun</label>
            <div className={styles.input} style={{ backgroundColor: "#e2e8f0", color: "#555" }}>
              Aktif
            </div>
          </div>

          <button 
            onClick={handleLogout} 
            className={styles.button}
            style={{ backgroundColor: "#ff4d4d" }}
          >
            Logout / Keluar
          </button>

        </div>
      </div>

    </div>

  );
}

export default ProfilePage;