import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

//import semua routing
import uploadRoute from "./routes/upload-routes.js"
import viewRoute from "./routes/view-routes.js"
import registerRoute from "./routes/register-routes.js"
import loginRoute from "./routes/login-routes.js"
import checkAuthRoutes from "./routes/checkAuth-routes.js"
import getImageRoute from "./routes/getImage-routes.js"
import interractRoutes from "./routes/interract-routes.js"
import deleteRoute from "./routes/delete-routes.js"
import manageAccountRoute from "./routes/manageAccount-routes.js"

const app = express()
app.use(cookieParser())

//setup cors
const allowedOrigins = [
  "http://localhost:5173",
  "https://laporin-aja-jbndcubil-yazid-nursyafiqis-projects.vercel.app/"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS ditolak"));
    }
  },
  credentials: true
}));

app.options("*", cors());

//routes API
app.use("/upload",uploadRoute) 
app.use("/view",viewRoute)
app.use("/register",registerRoute)
app.use("/login",loginRoute)
app.use("/checkAuth",checkAuthRoutes)
app.use("/images",getImageRoute)
app.use("/interract",interractRoutes)
app.use("/delete",deleteRoute)
app.use("/account",manageAccountRoute)

export default app