import Car from '../models/cars/Car.js'
import { deleteFile } from '../utils/utils.js'
import CarServices from '../services/carServises.mjs'
class CarController {
    static async getAllCars(req, res) {
        const cars = await CarServices.getAllCars()
        res.render('cars/carList', { cars,
            title: 'Список автомобілів',
            activePage: 'cars'
        })
    }
    static async getCarById(req, res) {
        const car = await CarServices.getCarById(req.params.id)
        res.render('cars/carDetail', { car,
            title: 'Детальна інформація про автомобіль',
            activePage: 'cars'
         })
    }
    static async showCarForm(req, res) {
        const id = req.params.id
        const car = id ? await CarServices.getCarById(id) : null
        res.render('cars/carForm', {
            car,
            title: 'Додати автомобіль',
            activePage: 'cars'
        })
    }
    static async createCar(req, res) {
        const carData = req.validatedData
        let image = null
        if(req.file) {
            image = req.file.filename  
        }
        const car = await CarServices.createCar({ ...carData, image })
        res.redirect('/cars')
    }
    static async updateCar(req, res) {   
        const id = req.params.id
        const existingCar = await CarServices.getCarById(id)

        let image = existingCar.image
        if(req.file) {
            if(existingCar.image) {
                deleteFile('uploads', existingCar.image)
            }
            image = req.file.filename
        }
        const car = await CarServices.updateCar(id, { ...req.validatedData, image })
        res.redirect('/cars')
    }
    static async deleteCar(req, res) {
        const id = req.body.id
        const car = await CarServices.getCarById(id)
        if(car.image) {
            deleteFile('uploads', car.image)
        }
        await CarServices.deleteCarById(id)
        res.status(200).json({ success: true })
    }
}
export default CarController