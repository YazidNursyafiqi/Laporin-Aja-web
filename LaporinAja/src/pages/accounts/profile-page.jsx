import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./account-page.module.css";
import Header from "../../container/header/header";
import { getAccountInfo , logout } from "../../hooks/manageAccount";

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState('Loading... ');

  const loadUsername = async()=>{
    const result = await getAccountInfo()
    setUser(result.username)
  }

  useEffect(() => {
    loadUsername()
  }, []);

  const handleLogout = async() => {
    await logout()
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