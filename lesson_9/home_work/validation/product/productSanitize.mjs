import { Sanitizer } from '../../utils/sanitizer.mjs'
const productAllowedFields = ['title', 'price', 'count', 'image',]

export function sanitizeProductInput(input) {
  return new Sanitizer(productAllowedFields).sanitizeInput(input)
}

export default sanitizeProductInput