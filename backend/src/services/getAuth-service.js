import db from "../application/firestore.js";

const getAuthService = async (token)=>{
    const search =  await db.collection("sessions").where("token","==",token).limit(1).get()
    return search.docs[0].data().user
}

export default getAuthService