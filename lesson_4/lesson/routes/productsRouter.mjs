import { Router } from 'express'
import ProductsController from '../controllers/productsController.mjs'
const router = Router()
router.get('/', ProductsController.getProducts)
router.get('/create', ProductsController.getProductForm);
router.get('/update/:id', ProductsController.getProductForm);
router.get('/:id', ProductsController.getProductById)

router.post('/create', ProductsController.createProduct);

router.post('/update/:id', ProductsController.updateProduct);

router.delete('/', ProductsController.deleteProduct);

export default router