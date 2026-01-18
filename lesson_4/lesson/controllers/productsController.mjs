import ProductsModel from '../models/productsModel.mjs'
class ProductsController {
    static getProducts(req, res) {
        try {
            const products = ProductsModel.getAllProducts()

            res.render('products/productsList', { title: 'Products', products })
        } catch (error) {
            res.status(500).render('error', { message: error.message,error })
        }
    }

    static getProductById(req, res) {
        try {
            const id = req.params.id
            const product = ProductsModel.getProductById(id)
            res.render('products/productDetail', { title: 'Product', product })
        } catch (error) {
            res.status(500).render('error', { message: error.message,error })
        }
    }
    static createProduct(req, res) {
        try {
            const { name, price } = req.body
            ProductsModel.createProduct(name, price)
            res.redirect('/products')
        } catch (error) {
            res.status(500).render('error', { message: error.message,error })
        }
    }
    static updateProduct(req, res) {
        try {
            const id = req.params.id
            const { name, price } = req.body
            ProductsModel.updateProduct(id, name, price)
            res.redirect('/products')
        } catch (error) {
            res.status(500).render('error', { message: error.message,error })
        }
    }
    
    static getProductForm(req, res) {
        const id = req.params.id
        const product = id ? ProductsModel.getProductById(id) : { name: '', price: '' }
        res.render('products/productForm', { title: 'Create/Update Product',
        product })
    }

    static deleteProduct(req, res) {
        try {
            const { id } = req.body
            ProductsModel.deleteProductById(id)
            res.status(200).json({ message: 'Product deleted successfully' })
        } catch (error) {
            res.status(500).render('error', { message: error.message,error })
        }
    }
}
export default ProductsController