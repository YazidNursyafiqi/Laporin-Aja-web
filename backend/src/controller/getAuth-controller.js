import getAuthService from "../services/getAuth-service.js";

export const getAuthController = async(req,res)=>{
    const result = await getAuthService(req.cookies.token)
    res.json({user:result,status:"succeed"})
}