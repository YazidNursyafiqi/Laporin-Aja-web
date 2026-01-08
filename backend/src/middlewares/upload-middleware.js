import multer from "multer";

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

export const uploadMiddleware = multer({storage:storage})