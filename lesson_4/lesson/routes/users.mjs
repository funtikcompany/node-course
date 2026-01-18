import { Router } from 'express'
import { UserController } from '../controllers/userController.mjs'
const router = Router()
router.get('/', UserController.getUsers)
export default router