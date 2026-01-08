export const uploadController = async (req , res) => {
    console.clear()
    console.log("file:")
    console.log(req.file)
    console.log("gambar:")
    console.log(req.body)
    res.status(200).json({
        message:"selesai wak!!"
    })
}