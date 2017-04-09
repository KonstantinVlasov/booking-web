import * as types from './mutation-types'

export default {
  [types.API_FAILED] (state, apiError) {
    state.apiError = apiError
  },

  [types.SEARCH_PRODUCED] (state, search) {
    state.search = search
  },
  [types.SEARCH_QUERY_EXTENDED] (state, query) {
    Object.assign(state.query, query)
  },

  [types.PROPERTY_CHANGED] (state, property) {
    state.property = property
  },
  [types.QUOTE_CODE_CHANGED] (state, property) {
    state.quote.code = `${property.providerId}.${property.unit.id}`
  },
  [types.QUOTE_QUERY_EXTENDED] (state, quote) {
    Object.assign(state.quote, quote)
  },

  [types.BOOKING_COMPLETED] (state) {
    state.booked = true
  },
  [types.BOOKING_RESET] (state) {
    state.booked = false
  }
}
