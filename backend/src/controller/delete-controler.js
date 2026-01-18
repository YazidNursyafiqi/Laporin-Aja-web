import deleteService from "../services/delete-service.js";

export const deleteController = async(req,res)=>{
    const username = req.cookies.username
    const postId = req.params.postId
    try{
        const result = await deleteService(username,postId)
        res.json({...result})
    }catch{
        res.json({status:"server-error"})
    }
}