import { Router } from 'express'
import UserController from '../controllers/userController.mjs'
import UserValidator from '../validation/user/userValidate.mjs'
const router = Router()
router.get('/login', UserController.registerForm)
router.post('/login', UserValidator.validate, UserController.login)
export default router