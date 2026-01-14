import loginService from "../services/login-service.js"
//import cookieParser from "cookie-parser"

export const loginController = async(req,res)=>{
    const input = req.body
    console.log(input)
    const result = await loginService(input)
    //kirim token ke coockie client (jika ada)
    if("sessionToken" in result){
        console.log("iyo ada")
        res.cookie("token",result.sessionToken,{
            httpOnly:true
        })
        res.cookie("username",input.username,{
            httpOnly:true
        })
    }

    res.json(result)
} 