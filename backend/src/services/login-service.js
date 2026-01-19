import db from "../application/firestore.js"
import crypto from 'crypto'
import admin from "../config/firebase.js"

const loginService = async (input)=>{
    const snapshot = await db.collection("accounts").where("username","==",input.username).limit(1).get()
    if(!snapshot.empty){
        if(snapshot.docs[0].data().password == input.password){
            //generate session token
            const token = crypto.randomBytes(32).toString("hex")
            //simpan di database
            db.collection('sessions').add({
                token:token,
                user:input.username,
                expiredAt: admin.firestore.Timestamp.fromDate(new Date(Date.now() + 1000 * 60 * 60 * 6)) //expired dalam 6 jam
            })
    
            return {status:"Succed",sessionToken:token}
        }
        return {status:"wrong"}
    }
    return {status:"not-found"}
}

export default loginService