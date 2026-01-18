import { getUsername , logOut } from "../controller/manageAccount-controller.js";
import express from "express";
import checkAuthMiddleware from "../middlewares/checkAuth.js";

const manageAccountRoute = express.Router()
manageAccountRoute.use(checkAuthMiddleware)

manageAccountRoute.get('/info',getUsername) //dapatkan username
manageAccountRoute.delete('/logout',logOut) //logut/hapus sesi di browser

export default manageAccountRoute

