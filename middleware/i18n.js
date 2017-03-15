export default function ({ store, params, error }) {
  let lang = params.lang || 'en'
  if (!store.state.lang.locales.includes(lang)) {
    lang = 'en'
  }
  return store.dispatch('lang/setLang', lang)
}
