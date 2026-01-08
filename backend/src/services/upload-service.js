import db from "../application/firestore.js"

const uploadService = (field)=>{
    db.collection("reports").add(field)
}

export default uploadService