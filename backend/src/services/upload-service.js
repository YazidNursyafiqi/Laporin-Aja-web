import { json } from "stream/consumers"
import db from "../application/firestore.js"
import admin from "../config/firebase.js"

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
    //update status jumlah postingan di wilayah tertentu
    db.collection('regions').doc('general').update(
        {[data.provinsi]: admin.firestore.FieldValue.increment(1)}
    )

}

export default uploadService