import { Router } from 'express'
import IndexController from '../controllers/indexController.js'
const router = Router()
router.get('/', IndexController.getMainPage)
router.get('/about', IndexController.getAboutPage)

export default router