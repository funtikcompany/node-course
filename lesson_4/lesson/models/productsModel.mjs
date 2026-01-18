import DataFileManager from '../services/DataFileManager.js'
class ProductsModel {
    constructor(id, name, price, description) {
        this.id = id
        this.name = name
        this.price = price
        this.description = description
    }

    static getAllProducts() {
        return DataFileManager.loadData()
    }

    static getProductById(id) {
        return DataFileManager.getItemById(id)
    }
    static createProduct(name, price) {
        return DataFileManager.addItem({
            id:new Date().getTime(),
            name, price})
    }
    static updateProduct(id, name, price) {
        return DataFileManager.updateItemById(id, { name, price })
    }

    static deleteProductById(id) {
        return DataFileManager.deleteItemById(id)
    }
}
export default ProductsModel