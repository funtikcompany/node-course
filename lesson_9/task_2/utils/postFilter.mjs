import { escapeRegex } from './helpers.mjs'

import mongoose from 'mongoose'

export const ALLOWED_FILTERS = {
  post: (v) => {
    const raw = String(v ?? '').trim()
    if (!raw) return undefined
    const safe = escapeRegex(raw)
    return { post: new RegExp(safe, 'i') }
  },

  authors: (v) => {
    if (!v) return undefined
    try {
      return { authors: new mongoose.Types.ObjectId(v) }
    } catch {
      return undefined
    }
  },
}

export function buildPostFilter(query) {
  const filter = {}
  for (const key in ALLOWED_FILTERS) {
    if (query[key] !== undefined && query[key] !== '') {
      const value = ALLOWED_FILTERS[key](query[key])
      if (value !== undefined && value !== null) {
        Object.assign(filter, value)
      }
    }
  }
  return filter
}