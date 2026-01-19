import uploadService from "../services/upload-service.js"
import { put } from "@vercel/blob"

export const uploadController = async (req , res) => {
    const username = req.cookies.username

    try{
        //mengecek apakah user mengirim foto jika tidak maka tetap null
        let file = null
        if(req.file){  //ada file
            file = await put(`image/${Date.now()}-${username}.jpg`,req.file.buffer,{
                access:"public",
                contentType: req.file.mimetype
            })
            res.json({
                status:"Upload Berhasil!"
            })
        }

        await uploadService(req.body,file,username)
    }catch(err){
        console.log(err)
        res.json({
            status:"server-error"
        })
    }

}