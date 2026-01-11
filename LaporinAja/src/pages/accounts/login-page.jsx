import { useState } from "react"
import loginAccount from "../../hooks/loginAccount"

function Login(){
    const [ loginForm , setLoginForm ] = useState({
        username:"",
        password:""
    })

    const handleChange = (e)=>{
        setLoginForm({...loginForm,[e.target.name]:e.target.value})
    }

    const handleLogin = (e)=>{
        e.preventDefault()
        console.log(loginForm)
        loginAccount(loginForm)
    }

    return(
        <>
            <form onSubmit={handleLogin}>
                <label>
                    Username
                </label>
                <input type="text" value={loginForm.username} name="username" onChange={handleChange}></input>
                <br />
                <label>
                    Password
                </label>
                <input type="password" value={loginForm.password} name="password" onChange={handleChange}></input>
                <br />
                <button type="submit">Submit</button>
            </form>

        </>
    )
}

export default Login