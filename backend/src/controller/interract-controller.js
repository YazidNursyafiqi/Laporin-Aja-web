import { commentService , likeService } from "../services/interract-service.js";

export const commentController = async(req,res)=>{
    try{
        const username = req.cookies.username
        const comment = req.body.comment
        const postId = req.body.postID
        console.log(req.body)
        await commentService(comment,username,postId)
        res.json({status:"succeed",name:username})
    }catch{
        res.json({status:"server-error"})
    }
    
}

export const likeController = async(req,res)=>{
    try{
        const postID = req.body.postID
        await likeService(postID)
        res.json({status:"succeed"})
    }catch{
        res.json({status:"server-error"})
    }
}