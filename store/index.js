'use strict'

import Vuex from 'vuex'
import utils from '~plugins/utils'

import mutations from './mutations'
import actions from './actions'

import lang from './lang'

const state = {
  apiError: '',
  property: {},
  search: {},
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

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    lang
  }
})

export default () => store
