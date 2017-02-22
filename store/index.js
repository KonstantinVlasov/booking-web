import Vuex from 'vuex'
import axios from '~plugins/axios'

const store = new Vuex.Store({
  state: {
    property: {
      title: 'test'
    },
    quote: {}
  },
  mutations: {
    setProperty (state, property) {
      state.property = property
    }
  },
  actions: {
    fetchProperty
  }
})

function fetchProperty ({commit, route}, query) {
  return axios
    .request({
      url: `/public/properties/${route.params.id}/${route.params.unitId}`,
      method: 'get'
    })
    .then(response => {
      console.log('property', response.data)
      commit('setProperty', response.data)
    })
    .catch(error => {
      console.log('response', error)
    })
}

export default store
