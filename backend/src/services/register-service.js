import db from "../application/firestore.js"
import admin from "../config/firebase.js"

const registerService = async(input)=>{
    //mengecek apakah ada akun dengan nama yang sama
    const snapshot = await db.collection('accounts').where('username','==',input.username).limit(1).get()
    if(snapshot.empty){
        await db.collection("accounts").add({
            ...input,
            expiredAt: admin.firestore.Timestamp.fromDate(Date().now + 1000 * 60 * 60 * 6) //expired dalam 6 jam
        })
        return {status:'succeed'}
    }
    return {status:'username is already taken'}


}

export default registerService