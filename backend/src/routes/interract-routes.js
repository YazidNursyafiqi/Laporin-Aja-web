import express from 'express'
import { interractController } from '../controller/interract-controller.js'
import checkAuthMiddleware from '../middlewares/checkAuth.js'

const interractRoutes = express.Router()
interractRoutes.use(checkAuthMiddleware)
interractRoutes.use(express.json())


interractRoutes.post('/comment',interractController)

export default interractRoutes