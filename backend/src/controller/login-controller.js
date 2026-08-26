import loginService from "../services/login-service.js"
//import cookieParser from "cookie-parser"

export const loginController = async(req,res)=>{
    const input = req.body
    console.log(input)
    const result = await loginService(input)
    //kirim token ke coockie client (jika ada)
    if("sessionToken" in result){
        console.log("iyo ada")
        const isProd = process.env.NODE_ENV === "production";
        const cookieOptions = {
            httpOnly: true,
            secure: isProd,
            sameSite: isProd ? "none" : "lax",
            maxAge: 6 * 60 * 60 * 1000,
            path: "/"
        };
        res.cookie("token", result.sessionToken, cookieOptions);
        res.cookie("username", input.username, cookieOptions);
    }

    res.json(result)
} 