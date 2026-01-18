import db from "../application/firestore.js";
import admin from "../config/firebase.js";

const deleteService = async(username,postId)=>{
    const userAccount = await db.collection('accounts').where('username','==',username).limit(1).get()
    console.log(userAccount.docs[0].data())
    //memeriksa apakah yang request merupakan pemilik akun sendiri
    const userPostList = userAccount.docs[0].data().posts
    if(!userPostList.includes(postId)){
        return {status:'userAccount-not-match'}
    }

    //hapus postingan dari akun
    await userAccount.docs[0].ref.update({
        posts : admin.firestore.FieldValue.arrayRemove(postId)
    })
    //hapus postingan dari reports
    const postData = await db.collection('reports').where('id','==',postId).limit(1).get()
    await postData.docs[0].ref.delete()
    return {status:'succeed'}
}

export default deleteService