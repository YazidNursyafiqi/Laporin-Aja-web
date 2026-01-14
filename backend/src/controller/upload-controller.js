import uploadService from "../services/upload-service.js"

export const uploadController = async (req , res) => {
    try{
        await uploadService(req.body,req.file)
    }catch{
        console.log('database error')
    }

    res.status(200).json({
        status:"selesai wak!!"
    })
}