import uploadService from "../services/upload-service.js"

export const uploadController = async (req , res) => {
    const username = req.cookies.username
    try{
        await uploadService(req.body,req.file,username)
    }catch{
        console.log('database error')
    }

    res.status(200).json({
        status:"selesai wak!!"
    })
}