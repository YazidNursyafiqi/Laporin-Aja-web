import { getUsername , logOut } from "../controller/manageAccount-controller.js";
import express from "express";
import checkAuthMiddleware from "../middlewares/checkAuth.js";

const manageAccountRoute = express.Router()

// Allow logout routes without checkAuthMiddleware blocking them
manageAccountRoute.delete('/logout', logOut)
manageAccountRoute.post('/logout', logOut)
manageAccountRoute.get('/logout', logOut)

manageAccountRoute.use(checkAuthMiddleware)
manageAccountRoute.get('/info', getUsername)

export default manageAccountRoute

