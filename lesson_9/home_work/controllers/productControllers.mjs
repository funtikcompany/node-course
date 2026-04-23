import ProductsDBService from '../models/products/ProductDBServices.mjs'
import ProductSanitizer from '../validation/product/productSanitize.mjs'
class ProductController {
    static async createProductForm(req, res) {
        res.render('products/addProduct', { activePage: 'products' })
    }
    static async renderProductList(req, res) {
        try {
            // sort є в сесії після логіну / додавання товару; інакше беремо дефолт
            const sort = req.session.sort ?? { price: 1 }
            const products = await ProductsDBService.getProductList({}, sort)
            res.render('products/productList', {
                products,
                activePage: 'products',
            })
        } catch (err) {
            res.send(err.message).status(400)
        }
    }
    static async addNewProduct(req, res) {
        try {
            req.session.sort = { count: 1 }
            const sanitizedData = ProductSanitizer(req.body)
            if (req.file) {
                sanitizedData.image = `data:image;base64,${req.file.buffer.toString('base64')}`
            }
            await ProductsDBService.addProductItem(sanitizedData)
            res.redirect('/products')
        } catch (err) {
            res.send('not add').status(400)
        }
    }
}

export default ProductController