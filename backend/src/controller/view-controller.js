import viewService from "../services/view-service.js"

const viewController = async (req,res)=>{
    const param = req.params.type
    const result = await viewService(param)
    res.json(result)
}

export default viewController