import Car from '../models/cars/Car.js'

class CarServices {
    static async getAllCars() {
        return await Car.find().populate('owner');
    }
    static async getCarById(id) {
        return await Car.findById(id).populate('owner');
    }
    static async createCar(carData) {
        const car = new Car(carData);
        return await car.save();
    }
    static async updateCar(id, carData) {
        return await Car.findByIdAndUpdate(id, carData, { new: true, runValidators: true });
    }
    static async deleteCarById(id) {
        return await Car.findByIdAndDelete(id);
    }
}
export default CarServices;