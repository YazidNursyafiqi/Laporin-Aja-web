import {viewService , getProvinceStatusService} from "../services/view-service.js"

export const viewController = async (req,res)=>{
    const param = req.params.type
    const date = Number.parseInt(req.query.start_end_at)
    console.log(date)
    const forward = req.query.forward === "true" || req.query.forward === "undefined" 
    const result = await viewService(param,date,forward)
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