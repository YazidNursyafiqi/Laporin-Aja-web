import admin from "firebase-admin"
import "dotenv/config";

const key = JSON.parse(process.env.FIREBASE_PRIVATE_KEY)

admin.initializeApp({
    credential: admin.credential.cert(key)
})

export default admin