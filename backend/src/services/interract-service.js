import db from "../application/firestore.js";
import admin from "../config/firebase.js";

export const commentService = async(comment,username,postID)=>{
    const snapshot = await db.collection("reports").where("id","==",postID).limit(1).get()
    const docRef = snapshot.docs[0].ref
    docRef.update({
        "comments": admin.firestore.FieldValue.arrayUnion({
            username:username,
            comment:comment,
            date:Date.now()
        })
    })
}

export const likeService = async(postID,username)=>{
    const snapshotPost = await db.collection('reports').where('id','==',postID).limit(1).get()
    const docRef = snapshotPost.docs[0].ref
    //mengecek sebelumnya apakah user sudah like atau belum
    const userAccount = await db.collection('accounts').where('username','==',username).limit(1).get()
    const userLikeList = userAccount.docs[0].data().likes
    if(userLikeList.includes(postID)){ //jika user sudah like
        //hapus dari akun
        userAccount.docs[0].ref.update({
            likes : admin.firestore.FieldValue.arrayRemove(postID)
        })
        //kurangi 1 dari postingan
        docRef.update({
            likes: admin.firestore.FieldValue.increment(-1)
        })
        return 'dislike'
    }else{  // jika user belum like
         //tambahkan ke akun
         userAccount.docs[0].ref.update({
            likes : admin.firestore.FieldValue.arrayUnion(postID)
         })
         //tambah 1 dari postingan
         docRef.update({
            likes: admin.firestore.FieldValue.increment(1)
         })
         return 'like'
         
    }
}