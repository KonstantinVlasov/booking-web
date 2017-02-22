//import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'

if (process.BROWSER_BUILD) {
  let VueGoogleMaps = require('vue2-google-maps')
  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyAJW-Haxbnx4HgVL5HI-RlOkh35L7WZI3c'
    }
  })
}
