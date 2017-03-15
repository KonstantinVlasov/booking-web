import axios from '~plugins/axios'

export const state = {
  locales: ['en', 'fr'], // available langages
  lang: null, // current lang
  _: {} // store for translations
}

export const mutations = {
  SET_LANG (state, lang) {
    state.lang = lang
  },
  SET_TRANSLATION (state, translation) {
    state._[state.lang] = translation
  }
}

export const actions = {
  setLang ({state, commit}, lang) {
    commit('SET_LANG', lang)
    if (!state._[lang]) {
      return axios.request({
        url: `/locales/${lang}.json`,
        baseURL: process.env.staticUrl,
        method: 'get'
      })
        .then(response => commit('SET_TRANSLATION', response.data))
        .catch(error => console.error('lang response', error))
    }
  }
}
