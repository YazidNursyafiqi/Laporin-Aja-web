import express from 'express'
import { commentController , likeController } from '../controller/interract-controller.js'
import checkAuthMiddleware from '../middlewares/checkAuth.js'

const interractRoutes = express.Router()
interractRoutes.use(checkAuthMiddleware)
interractRoutes.use(express.json())


interractRoutes.post('/comment',commentController)
interractRoutes.post('/like',likeController)

export default interractRoutes