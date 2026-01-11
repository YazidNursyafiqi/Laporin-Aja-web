import { useState } from "react"
import registerAccount from "../../hooks/registerAccount"

function Register(){
    const [ registerForm , setRegisterForm ] = useState({
        username:"",
        password:""
    })

    const handleChange = (e)=>{
        setRegisterForm({...registerForm,[e.target.name]:e.target.value})
    }

    const handleRegister = (e)=>{
        e.preventDefault()
        registerAccount(registerForm)
    }

    return(
        <>
            <form onSubmit={handleRegister}>
                <label>
                    Username
                </label>
                <input type="text" value={registerForm.username} name="username" onChange={handleChange}></input>
                <br />
                <label>
                    Password
                </label>
                <input type="password" value={registerForm.password} name="password" onChange={handleChange}></input>
                <br />
                <button type="submit">Submit</button>
            </form>

        </>
    )
}

export default Register