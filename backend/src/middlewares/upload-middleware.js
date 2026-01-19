import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        filesize: 5*1024*1024 //5mb
    }
})

export default upload