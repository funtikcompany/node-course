export class Sanitizer {
  constructor(allowedFields) {
    this.allowedFields = allowedFields
  }
  sanitizeInput(input) {
    const sanitized = {}
    for (const key of this.allowedFields) {
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        sanitized[key] = input[key]
      }
    }
    return sanitized
  }
}