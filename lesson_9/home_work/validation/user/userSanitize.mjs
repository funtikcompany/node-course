import { Sanitizer } from '../../utils/sanitizer.mjs'
const userAllowedFields = ['name', 'password']

export function sanitizeUserInput(input) {
  return new Sanitizer(userAllowedFields).sanitizeInput(input)
}

export default sanitizeUserInput