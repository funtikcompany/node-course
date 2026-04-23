import MongooseCRUDManager from "../MongooseCRUDManager.mjs";
import Product from "./Product.mjs";

class ProductsDBService extends MongooseCRUDManager {
    async getProductList(filter = {}, sort = { price: 1 }) {
        console.log('filter', filter)
        console.log('sort', sort)
        try {
            return await Product.find(filter).sort(sort).exec();
        } catch (error) {
            return error.message;
        }

    }
    async addProductItem(data) {
        try {
            await super.create(data);
        } catch (error) {
            return error.message;
        }
    }
}
export default new ProductsDBService(Product);