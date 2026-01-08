import admin from "firebase-admin"
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const firebaseConfig = require('../../key/firebase-private-key.json')

admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig)
})

export default admin