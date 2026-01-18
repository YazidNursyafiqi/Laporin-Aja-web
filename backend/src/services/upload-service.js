import { json } from "stream/consumers"
import db from "../application/firestore.js"
import admin from "../config/firebase.js"

const uploadService = async(data,image,username)=>{
    const imageDest = image?.filename || "no-image"
    const date = Date.now()
    const id = `${date}${Math.round(Math.random()*100000)}`

    await db.collection("reports").add({
        ...data,
        ["yang_terkait"]: JSON.parse(data.yang_terkait),
        imagePath:imageDest, //path gambar
        date:date, //waktu server saat di post
        comments:[], //objek kosong tempat simpan comment
        likes:0, //jumlah like
        id: id
    })
    //update status jumlah postingan di wilayah tertentu
    await db.collection('regions').doc('general').update(
        {[`${data.provinsi}.total`] : admin.firestore.FieldValue.increment(1),
        [`${data.provinsi}.type.${data.jenis_pengaduan}`]: admin.firestore.FieldValue.increment(1)
        })
    //tambah id postingan di akun user
    const account = await db.collection('accounts').where('username','==',username).limit(1).get()
    await account.docs[0].ref.update({
        posts:admin.firestore.FieldValue.arrayUnion(id)
    })

}

export default uploadService