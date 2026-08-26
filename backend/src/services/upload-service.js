import { json } from "stream/consumers"
import db from "../application/firestore.js"
import admin from "../config/firebase.js"

const uploadService = async(data, image, username) => {
    const imageDest = image == null ? 'no-image' : (typeof image === 'string' ? image : (image.url || 'no-image'));
    const date = Date.now();
    const id = `${date}${Math.round(Math.random()*100000)}`;

    let yangTerkaitParsed = {};
    if (data.yang_terkait) {
        try {
            yangTerkaitParsed = typeof data.yang_terkait === 'string' ? JSON.parse(data.yang_terkait) : data.yang_terkait;
        } catch (e) {
            console.log("Error parsing yang_terkait JSON:", e.message);
            yangTerkaitParsed = {};
        }
    }

    await db.collection("reports").add({
        ...data,
        ["yang_terkait"]: yangTerkaitParsed,
        imagePath: imageDest, // path gambar
        date: date, // waktu server saat di post
        comments: [], // objek kosong tempat simpan comment
        likes: 0, // jumlah like
        id: id
    });

    // update status jumlah postingan di wilayah tertentu
    try {
        if (data.provinsi) {
            const updateObj = {};
            updateObj[`${data.provinsi}.total`] = admin.firestore.FieldValue.increment(1);
            if (data.jenis_pengaduan) {
                updateObj[`${data.provinsi}.type.${data.jenis_pengaduan}`] = admin.firestore.FieldValue.increment(1);
            }
            await db.collection('regions').doc('general').update(updateObj);
        }
    } catch (regErr) {
        console.log("Region stats update error (ignored):", regErr.message);
    }

    // tambah id postingan di akun user
    try {
        if (username) {
            const account = await db.collection('accounts').where('username', '==', username).limit(1).get();
            if (!account.empty) {
                await account.docs[0].ref.update({
                    posts: admin.firestore.FieldValue.arrayUnion(id)
                });
            }
        }
    } catch (accErr) {
        console.log("Account update error (ignored):", accErr.message);
    }
}

export default uploadService