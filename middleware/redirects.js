export default function ({ store, route, redirect }) {
  console.log('redirects', store.state.booked, store.state.lang.lang, route)

  if (process.env.NODE_ENV === 'production') {
    if (route.name === 'lang-bookings-success' && !store.state.booked) {
      return redirect(`/${store.state.lang.lang}`)
    }
  }
}
