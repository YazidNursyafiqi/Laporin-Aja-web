import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

//import semua routing
import uploadRoute from "./routes/upload-routes.js"
import viewRoute from "./routes/view-routes.js"
import registerRoute from "./routes/register-routes.js"
import loginRoute from "./routes/login-routes.js"

const app = express()
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())

//routes API
app.use("/upload",uploadRoute) 
app.use("/view",viewRoute)
app.use("/register",registerRoute)
app.use("/login",loginRoute)

app.listen(3000,()=>{
    console.log("server berhasil di jalankan")
})