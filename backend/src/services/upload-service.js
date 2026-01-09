import db from "../application/firestore.js"

const uploadService = (data,image)=>{
    const imageDest = image?.filename || "no-image"
    db.collection("reports").add({
        ...data,
        imagePath:imageDest
    })

}

export default uploadService