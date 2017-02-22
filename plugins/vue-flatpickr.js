import Vue from 'vue'
//import VueFlatpickr from 'vue-flatpickr'
import 'vue-flatpickr/theme/airbnb.css'

if (process.BROWSER_BUILD) {
  let Flatpickr = require('vue-flatpickr')
  console.log(Flatpickr)
  Vue.component(Flatpickr)
}
