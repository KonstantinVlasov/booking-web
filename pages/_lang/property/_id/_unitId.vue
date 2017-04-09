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
  import CheckAvailability from '~components/property/CheckAvailability.vue'

  export default {
    scrollToTop: true,
    components: {
      CheckAvailability
    },
    fetch ({store, query, params}) {
      store.dispatch('extendQuoteQuery', query)
      return store.dispatch('fetchProperty', params)
    },
    computed: {
      property () {
        return this.$store.state.property
      }
    }
  }
</script>
