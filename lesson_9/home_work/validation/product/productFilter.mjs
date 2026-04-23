import { escapeRegex } from './helpers.mjs'
import { buildFilters } from '../../utils/buildFilters.mjs'
export const ALLOWED_FILTERS = {
  title: (v) => {
    const raw = String(v ?? '').trim()
    if (!raw) return undefined
    const safe = escapeRegex(raw)
    return { title: new RegExp(safe, 'i') }
  },
  price: (v) => {
    const raw = String(v ?? '').trim().replace(',', '.')
    if (!raw) return undefined
    const n = Number.parseFloat(raw)
    if (!Number.isFinite(n)) return undefined
    return { price: n }
  },
  count: (v) => {
    const raw = String(v ?? '').trim()
    if (!raw) return undefined
    const n = Number.parseInt(raw)
    if (!Number.isFinite(n)) return undefined
    return { count: n }
  },
}

export function buildProductFilter(query) {
  return buildFilters(query, ALLOWED_FILTERS)
}
