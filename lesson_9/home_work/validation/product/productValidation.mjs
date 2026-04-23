import { z } from 'zod'

class ProductValidator {
  static productSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long').max(50, 'Title must be at most 50 characters long').nonempty('Title is required').trim(),
    price: z.coerce.number().min(0, 'Price must be at least 0').max(1000000, 'Price must be at most 1000000'),
    count: z.coerce.number().min(0, 'Count must be at least 0').max(100, 'Count must be at most 1000'),
    image: z.string().optional(),
  })

  static validate(req, res, next) {
    const result = ProductValidator.productSchema.safeParse(req.body)
    if (!result.success) {
      req.validationErrors = result.error.issues.map((err) => err.message)
    } else {
      req.body = result.data
    }
    next()
  }
}

export default ProductValidator
