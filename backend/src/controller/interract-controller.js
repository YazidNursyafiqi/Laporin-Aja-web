import { commentService } from "../services/interract-service.js";

export const interractController = async(req,res)=>{
    try{
        const username = req.cookies.username
        const comment = req.body.comment
        const postId = req.body.postID
        console.log(req.body)
        await commentService(comment,username,postId)
        res.json({status:"succeed"})
    }catch{
        res.json({status:"server-error"})
    }

}