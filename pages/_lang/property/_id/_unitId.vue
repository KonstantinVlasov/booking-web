<style lang="scss">
  .property-page {
    .b-property-type {
      text-transform: capitalize;
    }

    .b-dot {
      &:before {
        content: '\2022';
        margin: 0 0.4rem 0;
        font-size: 0.75rem;
            vertical-align: middle;
      }
    }
  }
</style>

<template lang="pug">
  .page.property-page(v-if="property && property.units")
    .b-page-header
      .b-page-header-background.m-darken
        img(v-if="property.photos" v-bind:src="property.photos[0].url")
      h1 {{ property.name }}
      p.b-property-type
        span {{ property.units[0].details.type }}
        span.b-dot
        span {{ property.address.city }}, {{ property.address.country }}
        br
        span {{ property.units[0].details.maximumOccupancy }} Persons
        span.b-dot {{ property.units[0].details.roomsCount }} Rooms
        span.b-dot {{ property.units[0].details.bedroomsCount }} Bedrooms

    .b-page-content
      .b-page-section.m-no-padding.m-facture
        .b-page-overlay.m-fit
          check-availability.landing-form
      nuxt-child
</template>

<script>
  import axios from '~plugins/axios'
  import CheckAvailability from '~components/property/CheckAvailability.vue'

  export default {
    scrollToTop: true,
    components: {
      CheckAvailability
    },
    fetch ({store, route, query}) {
      return new Promise(function (resolve, reject) {
        axios
          .request({
            url: `/public/properties/${route.params.id}/${route.params.unitId}`,
            method: 'get'
          })
          .then(response => {
            if (Object.keys(query).length !== 0) {
              store.commit('updateQuery', query)
              store.commit('updateQuote', query)
            }

            store.commit('setProperty', response.data)

            if (Object.keys(query).length !== 0) {
              store.dispatch('quoteProperty')
                .then(() => {
                  console.log('success')
                  resolve()
                })
                .catch((error) => {
                  console.log('error', error)
                  reject()
                })
            } else {
              resolve()
            }
          })
          .catch(error => {
            console.error('response', error)
            reject()
          })
      })
    },
    computed: {
      property () {
        return this.$store.state.property
      }
    }
  }
</script>
