import express from "express"
import multer from "multer"
import { diskStorage } from "multer"
import cors from "cors"

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename : (req,file,cb)=>{
        const cap = Date.now()
        const name = cap + file.originalname
        cb(null,name)
    }
})

const upload = multer({storage:storage})
const app = express()

app.use(cors())

app.post("/upload",upload.single("image"),(req,res)=>{
    console.clear()
    console.log("file:")
    console.log(req.file)
    console.log("gambar:")
    console.log(req.body)
    res.status(200).json({
        message:"selesai wak!!"
    })
})

app.listen(3000,()=>{
    console.log("server berhasil di jalankan")
})