import { escapeRegex } from './helpers.mjs'
import { buildFilters } from '../../utils/buildFilters.mjs'
export const ALLOWED_FILTERS = {
  name: (v) => {
    const raw = String(v ?? '').trim()
    if (!raw) return undefined
    const safe = escapeRegex(raw)
    return { name: new RegExp(safe, 'i') }
  },
}

export function buildUserFilter(query) {
  return buildFilters(query, ALLOWED_FILTERS)
}
