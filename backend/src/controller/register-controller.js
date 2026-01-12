import registerService from "../services/register-service.js"

export const registerController = async(req,res)=>{
    console.log(req.body,"    .loading")
    await registerService(req.body)
    console.log('the end')
    res.end("berhasil")
}