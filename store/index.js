import axios from '~plugins/axios'
import moment from 'moment'

const checkIn = moment.utc().add(3, 'days').startOf('day').toDate()
const checkOut = moment.utc().add(10, 'days').startOf('day').toDate()

export const state = {
  property: {
    title: 'test'
  },
  query: {
    term: undefined,
    page: 1,
    checkIn: checkIn,
    checkOut: checkOut,
    guests: 2
  },
  quote: {
    code: undefined,
    checkIn: moment.utc(checkIn),
    checkOut: moment.utc(checkOut),
    guests: 2,
    total: undefined
  }
}

export const mutations = {
  // property mutations
  setProperty (state, property) {
    state.property = property
    state.quote.code = `${property.providerId}.${property.unit.id}`
  },
  // query mutations
  updateQuery (state, value) {
    updateQueryTerm(state, value.term)
    updateQueryCheckIn(state, value.checkIn)
    updateQueryCheckOut(state, value.checkOut)
    updateQueryGuests(state, value.guests)
    updateQueryPage(state, value.page)
  },
  updateQueryTerm,
  updateQueryCheckIn,
  updateQueryCheckOut,
  updateQueryGuests,
  updateQueryPage,
  // quote mutations
  updateQuote (state, quote) {
    state.quote = quote
  },
  updateQuoteCheckIn (state, checkIn) {
    state.quote.checkIn = checkIn
  },
  updateQuoteCheckOut (state, checkOut) {
    state.quote.checkOut = checkOut
  },
  updateQuoteGuests (state, guests) {
    state.quote.guests = guests
  }
}

export const actions = {
  fetchProperty
}

// query mutations
function updateQueryTerm (state, value) {
  state.query.term = value ? value.toString().trim() : ''
}
function updateQueryCheckIn (state, value) {
  state.query.checkIn = moment.utc(value).toDate()
}
function updateQueryCheckOut (state, value) {
  state.query.checkOut = moment.utc(value).toDate()
}
function updateQueryGuests (state, value) {
  state.query.guests = +value || 2
}
function updateQueryPage (state, value) {
  state.query.page = +value || 1
}

function fetchProperty ({commit, route}, query) {
  return axios
    .request({
      url: `/public/properties/${route.params.id}/${route.params.unitId}`,
      method: 'get'
    })
    .then(response => {
      commit('setProperty', response.data)
    })
    .catch(error => {
      console.error('response', error)
    })
}
