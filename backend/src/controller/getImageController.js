import { fileURLToPath } from "url"
import path from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const getImageController = (req,res)=>{
    const fileName = req.params.name
    console.log(path.join(__dirname,"..","..","uploads",fileName))
    res.sendFile(path.join(__dirname,"..","..","uploads",fileName))


}
