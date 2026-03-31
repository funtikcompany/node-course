import { body, validationResult } from 'express-validator'
class CarValidate {
    static createCarChainValidation() {
        return [
            body('name').notEmpty()
            .withMessage('Назва автомобіля є обов\'язковою')
            .isLength({ min: 2 })
            .withMessage('Назва автомобіля повинна бути не менше 2 символів')
            .trim().escape(),
            body('number').notEmpty()
            .withMessage('Номер автомобіля є обов\'язковим')
            .isAlphanumeric()
            .withMessage('Номер автомобіля повинен бути алфавітно-цифровим')
            .trim().escape(),
            body('age').notEmpty().withMessage('Рік випуску автомобіля є обов\'язковим')
            .matches(/^\d{4}$/)
			.withMessage('Рік випуску повинен дорівнювати 4 цифрам')
            .isInt({ min: 1940, max: new Date().getFullYear() })
            .withMessage(`Рік випуску автомобіля повинен бути від 1940 до ${new Date().getFullYear()}`)
            .trim().escape(),
        ]
    }
    static createCarSchemaValidation = {
        name: {
            in: 'body',
            isString: true,
            notEmpty: true,
            isLength: {
                options: { min: 2 },
                errorMessage: 'Назва автомобіля повинна бути не менше 2 символів',
            },
            errorMessage: 'Назва автомобіля є обов\'язковою',
        },
        number: {
            in: 'body',
            isString: true,
            notEmpty: true,
            errorMessage: 'Номер автомобіля є обов\'язковим',
            isAlphanumeric: true,
            errorMessage: 'Номер автомобіля повинен бути алфавітно-цифровим',
        },
        age: {
            in: 'body',
            isInt: true,
            notEmpty: true,
            errorMessage: 'Рік випуску автомобіля є обов\'язковим',
            matches: {
                options: /^\d{4}$/,
                errorMessage: 'Рік випуску повинен дорівнювати 4 цифрам',
            },
            isInt: {
                options: { min: 1940, max: new Date().getFullYear() },
                errorMessage: `Рік випуску автомобіля повинен бути від 1940 до ${new Date().getFullYear()}`,
            },
        },
    }
        
    
}
export default CarValidate