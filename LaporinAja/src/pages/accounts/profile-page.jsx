import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./account-page.module.css";
import { getAccountInfo , logout } from "../../hooks/manageAccount";

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState('Loading... ');

  const loadUsername = async()=>{
    const result = await getAccountInfo();
    if (result && result.username) {
      setUser(result.username);
    } else {
      window.location.replace("/Login");
    }
  }

  useEffect(() => {
    loadUsername()
  }, []);

  const handleLogout = async() => {
    try {
      await logout();
    } catch(e) {}
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    alert("Anda berhasil keluar!");
    window.location.replace("/Login");
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.card}>
          <div style={{ marginBottom: "30px", textAlign: "left" }}>
            <label className={styles.label}>Username</label>
            <div className={styles.input} style={{ backgroundColor: "#e2e8f0", color: "#555" }}>
              {user}
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
          <button 
            onClick={()=>navigate('/ViewProblems/Laporan')} 
            className={styles.button}
            style={{ backgroundColor: "#005eff" }}
          >
            Kembali
          </button>

        </div>
      </div>

    </div>

  );
}

export default ProfilePage;