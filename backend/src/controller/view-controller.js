import viewService from "../services/view-service.js"

const viewController = async (req,res)=>{
    const param = req.params.type
    await viewService(param)
    res.end("selesai")
}

export default viewController