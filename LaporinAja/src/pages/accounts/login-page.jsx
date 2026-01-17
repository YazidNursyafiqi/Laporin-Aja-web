import { useState } from "react"
import loginAccount from "../../hooks/loginAccount"
import { useNavigate, Link } from "react-router-dom"
import styles from "./account-page.module.css";

function Login(){
    const navigate = useNavigate()
    const [ statusLogin , setStatusLogin ] = useState("-")

    const [ loginForm , setLoginForm ] = useState({
        username:"",
        password:""
    })

    const handleChange = (e)=>{
        setLoginForm({...loginForm,[e.target.name]:e.target.value})
    }

    const handleLogin = async(e)=>{
        e.preventDefault()
        console.log(loginForm)
        const result = await loginAccount(loginForm)
        console.log(result)
        setStatusLogin(result.status)
        if(result.status == "Succed"){
            navigate('/')
        }
    }

    return(
        <>
            <div className={styles.container}>
                <div className={styles.card}>
                    <h1 className={styles.title}>
                    Laporin<span className={styles.highlight}>Aja</span>
                    </h1>
                    <p className={styles.subtitle}>Silahkan Login terlebih dahulu</p>

                    <form onSubmit={handleLogin}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Username</label>
                        <input
                        className={styles.input}
                        type="text"
                        name="username"
                        value={loginForm.username}
                        onChange={handleChange}
                        placeholder="Masukkan username"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Password</label>
                        <input
                        className={styles.input}
                        type="password"
                        name="password"
                        value={loginForm.password}
                        onChange={handleChange}
                        placeholder="Masukkan password"
                        />
                    </div>

                    <button type="submit" className={styles.button}>
                        Login
                    </button>
                    </form>

                    <p className={styles.footerText}>
                    Belum punya akun? 
                    <Link to="/register" className={styles.link}>Register</Link>
                    </p>

                    {statusLogin && <p style={{color: 'red', marginTop: '10px'}}>{statusLogin}</p>}
                </div>
            </div>
        </>
    )
}

export default Login