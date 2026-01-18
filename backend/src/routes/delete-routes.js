import express from 'express'
import { deleteController } from '../controller/delete-controler.js'
import checkAuthMiddleware from '../middlewares/checkAuth.js'

const deleteRoute = express.Router()
deleteRoute.use(checkAuthMiddleware)
deleteRoute.delete('/:postId',deleteController)

export default deleteRoute