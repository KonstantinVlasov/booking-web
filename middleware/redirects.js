export default function ({ store, route, redirect }) {
  if (process.env.NODE_ENV === 'production') {
    if (route.name === 'lang-bookings-success' && !store.state.booked) {
      return redirect(`/${store.state.lang.lang}`)
    }
  }
}
