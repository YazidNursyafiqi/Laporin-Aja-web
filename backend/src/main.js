import express from "express"
import multer from "multer"

const upload = multer({dest:"../uploads/"})
const app = express()

app.post("/upload",upload.single("image"),(req,res)=>{
    console.log("file:")
    console.log(req.file)
    console.log("gambar:")
    console.log(req.body)
    res.end("selesai")
})

app.listen(3000,()=>{
    console.log("server berhasil di jalankan")
})