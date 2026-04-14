import CarServices from '../services/carServises.mjs'
import carZodValidateSchema from '../validation/carZodValidateSchema.js'
import { deleteFile } from '../utils/utils.js'
export default class ZodValidateMiddleware {
    static async validate(req, res, next) {
        const id = req.params.id
        const result = carZodValidateSchema.safeParse(req.body)
        if (!result.success) {
            if (req.file) {
                deleteFile('uploads', req.file.filename)
            }
            const errors = result.error.issues
            const car = id ? await CarServices.getCarById(id) : null
            return res.status(400).render('cars/carForm', {
                car: car ? { _id: car._id, ...car, ...req.body } : req.body,
                title: id ? 'Редагувати автомобіль' : 'Додати автомобіль',
                activePage: 'cars',
                errors: errors.map(error => error.message)
            })
        }
        req.validatedData = result.data
        next()
    }
}