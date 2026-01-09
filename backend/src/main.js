import express from "express"
import cors from "cors"

//import semua routing
import uploadRoute from "./routes/upload-routes.js"
import viewRoute from "./routes/view-routes.js"

const app = express()
app.use(cors())

//routes API
app.use("/upload",uploadRoute) 
app.use("/view",viewRoute)

app.listen(3000,()=>{
    console.log("server berhasil di jalankan")
})