<style scoped lang="scss">

</style>

<template lang="pug">
  .page
    .b-page-header
      .b-page-header-background
        img(src="https://image.shutterstock.com/z/stock-photo-beautiful-luxury-home-with-swimming-pool-at-sunset-297923627.jpg")
      h1 iBookingNet


    .b-page-content
      .b-page-section.m-facture
        .b-page-overlay
          search-form.landing-form
            
        .container
          featured-properties(
            v-if="italy && italy.properties.length"
            v-bind:properties="italy.properties"
            v-bind:title="italy.title"
            v-bind:subtitle="'Fashion'"
          )
          featured-properties(
            v-if="spain && spain.properties.length"
            v-bind:properties="spain.properties"
            v-bind:title="spain.title"
            v-bind:subtitle="'Sunny'"
          )
          featured-properties(
            v-if="france && france.properties.length"
            v-bind:properties="france.properties"
            v-bind:title="france.title"
            v-bind:subtitle="'Romantic'"
          )
</template>

<script>
import axios from 'axios'

import SearchForm from '~components/landings/SearchForm.vue'
import FeaturedProperties from '~components/landings/FeaturedProperties.vue'

function fetchProperties () {
  let italy = featuredProperties('Italy')
  let spain = featuredProperties('Spain')
  let france = featuredProperties('France')

  return axios.all([italy, spain, france])
    .then(axios.spread(function (italy, spain, france) {
      console.log(italy, spain, france)
      return {
        italy: {
          title: 'New in Italy',
          properties: italy.data.result.docs
        },
        spain: {
          title: 'New in Spain',
          properties: spain.data.result.docs
        },
        france: {
          title: 'New in France',
          properties: france.data.result.docs
        }
      }
    }))
}

function featuredProperties (term) {
  return axios
      .request({
        url: '/public/properties/featured',
        method: 'get',
        baseURL: 'http://localhost:8181/api/',
        params: {
          limit: 3,
          term
        }
      })
      // .then(response => {
      //   return {
      //     [term]: {
      //       title: term,
      //       properties: response.data.result.docs
      //     }
      //   }
      // })
}

export default {
  scrollToTop: true,
  components: {
    SearchForm,
    FeaturedProperties
  },
  data (context) {
    return fetchProperties()
  }
}
</script>
