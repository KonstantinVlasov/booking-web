'use strict'

import moment from 'moment'
import axios from '~plugins/axios'
import utils from '~plugins/utils'

import * as types from './mutation-types'

const actions = {
  clearApiError,

  extendSearchQuery,
  searchProperties,

  extendQuoteQuery,
  fetchProperty,
  setProperty,
  quoteProperty,

  completeBooking,
  resetBooking
}

function clearApiError ({commit}) {
  commit(types.API_FAILED, '')
}

function extendSearchQuery ({state, commit}, query) {
  commit(types.SEARCH_QUERY_EXTENDED, query)
}

function searchProperties ({state, commit, dispatch}) {
  dispatch('clearApiError')
  return new Promise(function (resolve, reject) {
    axios
      .request({
        url: '/public/properties/search',
        method: 'get',
        params: state.query
      })
      .then(response => {
        commit(types.SEARCH_PRODUCED, response.data.result || {})
        resolve()
      })
      .catch(error => {
        console.error('searchProperties error', error)
        commit(types.SEARCH_PRODUCED, {})
        commit(types.API_FAILED, error)
        reject(error)
      })
  })
}

function extendQuoteQuery ({state, commit}, query) {
  commit(types.QUOTE_QUERY_EXTENDED, query)
}

/**
 * @param params.id
 * @param params.unitId
 * @returns {Promise}
 */
function fetchProperty ({commit, dispatch}, params) {
  dispatch('clearApiError')
  return axios
    .request({
      url: `/public/properties/${params.id}/${params.unitId}`,
      method: 'get'
    })
    .then(response => {
      commit(types.PROPERTY_CHANGED, response.data)
      commit(types.QUOTE_CODE_CHANGED, response.data)
    })
    .catch(error => {
      console.error('fetchProperty error', error)
      commit(types.API_FAILED, error)
    })
}
function setProperty ({commit}, property) {
  commit(types.PROPERTY_CHANGED, property)
}

function quoteProperty ({state, commit, dispatch}) {
  dispatch('clearApiError')
  console.info('quoteProperty quote', state.quote)
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
        if (!response.data.error) {
          response.data.total = utils.addTax(response.data.total, {places: 2})
          commit(types.QUOTE_QUERY_EXTENDED, response.data)
          console.info('new quote', state.quote)
          resolve()
        } else {
          commit(types.QUOTE_QUERY_EXTENDED, {total: undefined})
          console.error('quoteProperty error response.data:', response.data)
          reject(response.data.error)
          commit(types.API_FAILED, response.data.error)
        }
      })
      .catch(error => {
        commit(types.QUOTE_QUERY_EXTENDED, {total: undefined})
        commit(types.API_FAILED, error)
        reject(error)
      })
  })
}

function completeBooking ({commit}) {
  commit(types.BOOKING_COMPLETED)
}

function resetBooking ({commit}) {
  commit(types.BOOKING_RESET)
  commit(types.QUOTE_QUERY_EXTENDED, {total: undefined})
}

export default actions
