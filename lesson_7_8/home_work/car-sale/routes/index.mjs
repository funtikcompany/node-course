import { Router } from 'express'
import IndexController from '../controllers/IndexController.js'
const router = Router()
router.get('/', IndexController.getMainPage)
router.get('/about', IndexController.getAboutPage)

export default router