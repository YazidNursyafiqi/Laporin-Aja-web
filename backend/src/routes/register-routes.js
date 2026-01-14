import express from "express"

import {registerController} from '../controller/register-controller.js'

const registerRoute = express.Router()
registerRoute.use(express.json())

registerRoute.post('/', registerController)

export default registerRoute