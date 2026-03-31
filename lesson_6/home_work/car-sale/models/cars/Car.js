import DataFileManager from '../../services/dataFileManager.js'
class Car {
    static getAllCars() {
        return DataFileManager.loadData()
    }
    static getCarById(id) {
        return DataFileManager.getItemById(id)
    }
    static createCar(car) {
        return DataFileManager.addItem(car)
    }
    static updateCar(id, car) {
        return DataFileManager.updateItemById(id, car)
    }
    static deleteCarById(id) {
        return DataFileManager.deleteItemById(id)
    }
}
export default Car