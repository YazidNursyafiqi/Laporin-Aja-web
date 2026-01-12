import db from "../application/firestore.js"

const registerService = async(input)=>{
    await db.collection("accounts").add(input)
    console.log('registrasi berhasil')
}

export default registerService