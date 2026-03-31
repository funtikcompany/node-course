import * as z from 'zod'
const currentYear = new Date().getFullYear()
const carsValidationSchema = z.object({
	name: z
		.string()
		.nonempty({ message: 'Назва автомобіля є обов\'язковою' })
		.min(2, { message: 'Назва автомобіля повинна бути не менше 2 символів' })
		.trim(),
    number: z
        .string()
        .trim()
        .min(1, { message: 'Номер автомобіля є обов\'язковим' })
        .transform((val) => val.replace(/[\s-]/g, '').toUpperCase()) 
        .refine((val) => /^[\p{L}\p{N}]+$/u.test(val), {
          message: 'Номер автомобіля повинен бути алфавітно-цифровим',
    }),
	age: z.coerce
		.number()
		.min(4, { message: 'Рік випуску автомобіля повинен дорівнювати 4 цифрам' })
		.gte(1940, { message: 'Рік випуску автомобіля повинен бути не менше 1940' })
		.lte(currentYear, { message: `Рік випуску автомобіля повинен бути не більше ${currentYear}` }),
	description: z.string().trim().optional(),
})

export default carsValidationSchema