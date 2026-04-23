export function buildFilters(query, allowedFilters) {
    const filter = {}
    for (const key in allowedFilters) {
      if (query[key] !== undefined && query[key] !== '') {
        const value = allowedFilters[key](query[key])
        if (value !== undefined && value !== null) {
          Object.assign(filter, value)
        }
      }
    }
    return filter
  }
