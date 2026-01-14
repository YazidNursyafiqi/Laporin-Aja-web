import { useState } from "react"
import loginAccount from "../../hooks/loginAccount"
import { useNavigate } from "react-router-dom"

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
            <p>{statusLogin}</p>

        </>
    )
}

export default Login