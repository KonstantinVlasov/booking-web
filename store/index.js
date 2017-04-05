'use strict'

import moment from 'moment'
import axios from '~plugins/axios'
import utils from '~plugins/utils'

export const state = {
  property: {
    title: 'test'
  },
  query: {
    term: undefined,
    page: 1,
    checkIn: utils.defaultDates.checkIn,
    checkOut: utils.defaultDates.checkOut,
    guests: 2
  },
  quote: {
    code: undefined,
    checkIn: utils.defaultDates.checkIn,
    checkOut: utils.defaultDates.checkOut,
    guests: 2,
    total: undefined
  },
  booked: false
}

export const mutations = {
  // property mutations
  setProperty (state, property) {
    state.property = property
    state.quote.code = `${property.providerId}.${property.unit.id}`
  },
  // query mutations
  updateQuery (state, value) {
    console.log('updateQuery', value)
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
    console.log('updateQuote with', quote)
    state.quote = quote || state.quote
  },
  updateQuoteCheckIn (state, checkIn) {
    state.quote.checkIn = checkIn || state.checkIn
  },
  updateQuoteCheckOut (state, checkOut) {
    state.quote.checkOut = checkOut || state.checkOut
  },
  updateQuoteGuests (state, guests) {
    state.quote.guests = guests || state.guests
  },
  updateQuoteTotal (state, total) {
    state.quote.total = total
  },
  completeBooking (state) {
    state.booked = true
  },
  resetBooking (state) {
    state.booked = false
  }
}

export const actions = {
  fetchProperty,
  quoteProperty
}

// query mutations
function updateQueryTerm (state, value) {
  state.query.term = value ? value.toString().trim() : ''
}
function updateQueryCheckIn (state, value) {
  state.query.checkIn = moment(value).toDate()
}
function updateQueryCheckOut (state, value) {
  state.query.checkOut = moment(value).toDate()
}
function updateQueryGuests (state, value) {
  state.query.guests = +value || 2
}
function updateQueryPage (state, value) {
  state.query.page = +value || 1
}

function fetchProperty ({commit, route}) {
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

function quoteProperty ({state, commit}) {
  return new Promise(function (resolve, reject) {
    axios
      .request({
        url: '/public/bookings/quote',
        params: {
          code: state.quote.code,
          checkIn: moment(state.quote.checkIn).format('YYYY-MM-DD'),
          checkOut: moment(state.quote.checkOut).format('YYYY-MM-DD'),
          guests: state.quote.guests
        },
        method: 'get'
      })
      .then(response => {
        console.log('response.data', response.data)
        if (!response.data.error) {
          response.data.total = utils.addTax(response.data.total, {places: 2})
          commit('updateQuote', response.data)
          console.log('total', state.quote.total)
          resolve()
        } else {
          reject(response.data.error)
        }
      })
      .catch(reject)
  })
}
