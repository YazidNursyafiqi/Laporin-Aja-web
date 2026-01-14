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