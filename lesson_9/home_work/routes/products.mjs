import { Router } from 'express'

import upload from '../middleware/UploadManager.mjs'
import ProductController from '../controllers/productControllers.mjs'
import ProductValidator from '../validation/product/productValidation.mjs'
const router = Router()

router.get('/', ProductController.renderProductList)
router.get('/create', ProductController.createProductForm)

router.post('/create', upload.single('image'), ProductValidator.validate, ProductController.addNewProduct)

export default router