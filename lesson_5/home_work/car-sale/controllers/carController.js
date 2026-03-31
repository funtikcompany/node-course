import Car from '../models/cars/Car.js'
import { deleteFile } from '../utils/utils.js'
import { validationResult, matchedData } from 'express-validator'

class CarController {
    static getAllCars(req, res) {
        const cars = Car.getAllCars()
        res.render('cars/carList', { cars,
            title: 'Список автомобілів',
            activePage: 'cars'
        })
    }
    static getCarById(req, res) {
        const car = Car.getCarById(req.params.id)
        res.render('cars/carDetail', { car,
            title: 'Детальна інформація про автомобіль',
            activePage: 'cars'
         })
    }
    static showCarForm(req, res) {
        const id = req.params.id
        const car = id ? Car.getCarById(id) : null
        res.render('cars/carForm', {
            car: car,
            title: 'Додати автомобіль',
            activePage: 'cars'
        })
    }
    static createCar(req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).render('cars/carForm', {
                car: req.body,
                title: 'Додати автомобіль',
                activePage: 'cars',
                errors: errors.array()
            })
        }
        const carData = matchedData(req,{ locations: ['body'] })
        let image = null
        if(req.file) {
            image = req.file.filename  
        }
        const car = Car.createCar({ ...carData, image })
        res.redirect('/cars')
    }
    static updateCar(req, res) {   
        const id = req.params.id
        const carData = Car.getCarById(id)

        const { name, number, age } = req.body
        let image = carData.image
        if(req.file) {
            if(carData.image) {
                deleteFile('uploads', carData.image)
            }
            image = req.file.filename
        }
        const car = Car.updateCar(id, { name, number, age, image })
        res.redirect('/cars')
    }
    static deleteCar(req, res) {
        const id = req.body.id
        const car = Car.getCarById(id)
        if(car.image) {
            deleteFile('uploads', car.image)
        }
        Car.deleteCarById(id)
        res.status(200).json({ success: true })
    }
}
export default CarController