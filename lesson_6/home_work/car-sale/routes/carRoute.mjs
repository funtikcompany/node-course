import { Router } from 'express'
import CarController from '../controllers/carController.js'
import uploadMiddleware from '../middleware/uploadMiddleware.mjs'
import ZodValidateMiddleware from '../middleware/zodValidateMiddleware.js'
const router = Router()
router.get('/', CarController.getAllCars)
router.get('/create', CarController.showCarForm)
router.get('/update/:id', CarController.showCarForm)
router.get('/:id', CarController.getCarById)
router.post('/create',
    uploadMiddleware.single('image'),
    ZodValidateMiddleware.validate,
    CarController.createCar)
router.post('/update/:id',
    uploadMiddleware.single('image'),
    ZodValidateMiddleware.validate,
    CarController.updateCar)
router.delete('/', CarController.deleteCar)
export default router