import { useState } from "react"
import registerAccount from "../../hooks/registerAccount"
import { Link } from "react-router-dom";
import styles from "./account-page.module.css";
import { useNavigate } from "react-router-dom";

function Register(){
    const [ registerForm , setRegisterForm ] = useState({
        username:"",
        password:"",
        confirmPassword:""
    })

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e)=>{
        setRegisterForm({...registerForm,[e.target.name]:e.target.value})
        if (errorMessage) setErrorMessage("");
        if (successMessage) setSuccessMessage("");
    }

    const handleRegister = async (e)=>{
        e.preventDefault()
        if (registerForm.password !== registerForm.confirmPassword) {
            setErrorMessage("Password dan Konfirmasi Password tidak cocok!");
            return; // Stop, jangan lanjut ke bawah
        } 

        // 2. PANGGIL FUNGSI REGISTER & TUNGGU HASILNYA
        try {
            // Kita anggap registerAccount mengembalikan status atau string "Succed"
            // (Sesuaikan logic ini dengan isi file registerAccount.js Anda)
            const result = await registerAccount(registerForm);

            console.log("Hasil Register:", result); // Cek di console browser

            // 3. CEK HASIL DARI BACKEND/FIREBASE
            // Ganti kondisi ini sesuai apa yang dikembalikan registerAccount.js
            // Bisa jadi if (result === "Succed") atau if (result.status === "Succed")
            if (result === "Succed" || result?.status === "Succed") { 
            setErrorMessage(""); // Hapus error jika ada
            setSuccessMessage("Registrasi Berhasil! Mengalihkan...");
            
            // Redirect otomatis setelah 2 detik
            setTimeout(() => {
                navigate('/login'); 
            }, 2000);

            return;
            }

        } catch (error) {
            console.error(error);
            setErrorMessage("Terjadi kesalahan sistem.");
        }
    };

    const getBorderColor = () => {
    if (errorMessage) return '#ff4d4d'; // Merah
    if (successMessage) return '#3aa436'; // Hijau
    return 'transparent';
    
    }

    return(
        <>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1 className={styles.title}>
                    Laporin<span className={styles.highlight}>Aja</span>
                    </h1>
                    <p className={styles.subtitle}>Silahkan Register terlebih dahulu</p>

                    <form onSubmit={handleRegister}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Username</label>
                        <input
                        className={styles.input}
                        type="text"
                        name="username"
                        value={registerForm.username}
                        onChange={handleChange}
                        placeholder="Buat username"
                        required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Password</label>
                        <input
                        className={styles.input}
                        style={{ borderColor: getBorderColor() }}
                        type="password"
                        name="password"
                        value={registerForm.password}
                        onChange={handleChange}
                        placeholder="Buat password"
                        required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Confirm Password</label>
                        <input
                        className={styles.input}
                        style={{ borderColor: getBorderColor() }}
                        type="password"
                        name="confirmPassword"
                        value={registerForm.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm password"
                        required
                        />
                    </div>

                    <button type="submit" className={styles.button}>
                        Register
                    </button>
                    </form>

                    {errorMessage && (
                        <div style={{ color: "#ff4d4d", marginBottom: "15px", marginTop: "15px", fontSize: "0.9rem" }}>
                        {errorMessage}
                        </div>
                    )}

                    {successMessage && (
                        <div style={{ color: "#4bb543", marginBottom: "15px", marginTop: "15px", fontSize: "0.9rem" }}>
                        {successMessage}
                        </div>
                    )}

                    <p className={styles.footerText}>
                    Sudah punya akun? 
                    <Link to="/login" className={styles.link}>Login</Link>
                    </p>
                </div>
                </div>

        </>
    )
}

export default Register