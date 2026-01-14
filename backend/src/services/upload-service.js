import { json } from "stream/consumers"
import db from "../application/firestore.js"

const uploadService = (data,image)=>{
    const imageDest = image?.filename || "no-image"
    const date = Date.now()
    db.collection("reports").add({
        ...data,
        ["yang_terkait"]: JSON.parse(data.yang_terkait),
        imagePath:imageDest, //path gambar
        date:date, //waktu server saat di post
        comments:[], //objek kosong tempat simpan comment
        likes:0, //jumlah like
        id: `${date}${Math.round(Math.random()*100000)}`
    })

}

export default uploadService