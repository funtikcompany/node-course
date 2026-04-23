import { z } from 'zod'

class UserValidator {
  static userSchema = z.object({
    password: z
      .string()
      .min(4, 'Password must be at least 4 characters long')
      .max(16, 'Password must be at most 16 characters long'),
    name: z
      .string()
      .min(3, 'Username must be at least 3 characters long')
      .max(50, 'Username must be at most 50 characters long')
      .nonempty('Name is required')
      .trim(),
  })

  static validate(req, res, next) {
    const result = UserValidator.userSchema.safeParse(req.body)
    if (!result.success) {
      req.validationErrors = result.error.issues.map((err) => err.message)
    } else {
      req.body = result.data
    }
    next()
  }
}

export default UserValidator
