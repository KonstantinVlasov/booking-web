<template lang="pug">
  .page
    .b-page-header
      .b-page-header-background
        img(src="/web/public/images/landing-bg-2000.jpg")
      h1 iBookingNet

    .b-page-content
      .b-page-section.m-no-padding.m-facture
        .b-page-overlay
          search-form.landing-form

      .b-page-section.m-facture
        .container
          featured-properties(
            v-if="italy && italy.properties.length"
            v-bind:properties="italy.properties"
            v-bind:title="$t('home.featured.italy.title')"
            v-bind:subtitle="$t('home.featured.italy.subtitle')"
          )
          featured-properties(
            v-if="spain && spain.properties.length"
            v-bind:properties="spain.properties"
            v-bind:title="$t('home.featured.spain.title')"
            v-bind:subtitle="$t('home.featured.spain.subtitle')"
          )
          featured-properties(
            v-if="france && france.properties.length"
            v-bind:properties="france.properties"
            v-bind:title="$t('home.featured.france.title')"
            v-bind:subtitle="$t('home.featured.france.subtitle')"
          )
</template>

<script>
import axios from '~plugins/axios'

import SearchForm from '~components/landings/SearchForm.vue'
import FeaturedProperties from '~components/landings/FeaturedProperties.vue'

function fetchProperties () {
  let italy = featuredProperties('Italy')
  let spain = featuredProperties('Spain')
  let france = featuredProperties('France')

  return Promise.all([italy, spain, france])
    .then(function (response) {
      return {
        italy: {
          title: 'New in Italy',
          properties: response[0].data.result.docs
        },
        spain: {
          title: 'New in Spain',
          properties: response[1].data.result.docs
        },
        france: {
          title: 'New in France',
          properties: response[2].data.result.docs
        }
      }
    })
    .catch(error => {
      console.error(error)
      return {
        italy: {
          properties: []
        },
        spain: {
          properties: []
        },
        france: {
          properties: []
        }
      }
    })
}

function featuredProperties (term) {
  return axios
    .request({
      url: '/public/properties/featured',
      method: 'get',
      params: {
        limit: 3,
        term
      }
    })
}

export default {
  scrollToTop: true,
  components: {
    SearchForm,
    FeaturedProperties
  },
  asyncData () {
    return fetchProperties()
  }
}
</script>
