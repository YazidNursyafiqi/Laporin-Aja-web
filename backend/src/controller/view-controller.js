import {viewService , getProvinceStatusService , getLikesService , getMyPostsService} from "../services/view-service.js"

export const viewController = async (req,res)=>{
    const param = req.params.type
    const postId = req.query.postId
    const province = req.query.province? req.query.province.replaceAll('+',' ') : null
    const type = req.query.type? req.query.type.replaceAll('+',' ') : null

    const forward = req.query.forward === "true" || req.query.forward === undefined

    const result = await viewService(param,postId,province,type,forward)
    res.json(result)
}

export const getProvinceStatusController = async(req,res)=>{
    try{
        const result = await getProvinceStatusService()
        res.json({status:"succeed",content:result})
    }catch{
        res.json({status:"server-error"})
    }
}

export const getLikesController = async(req,res)=>{
    const username = req.cookies.username
    const forward = req.query.forward === "true" || req.query.forward === undefined
    const postId = req.query.postId

    try{
        const result = await getLikesService(username,postId,forward)
        res.json(result)
    }catch{
        res.json({status:'server-error'})
    }
}

export const getMyPostsController = async(req,res)=>{
    try{
        const username = req.cookies.username
        const result = await getMyPostsService(username)
        res.json({...result,status:'succeed'})
    }catch{
        res.json({status:'server-error'})
    }

}