import registerService from "../services/register-service.js"

export const registerController = async(req,res)=>{
    try{
        const result = await registerService({...req.body , likes:[] , posts:[]})
        res.json(result)
    }catch{
        res.json({status:'server-error'})
    }
}