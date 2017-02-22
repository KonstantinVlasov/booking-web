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
      .b-page-header-background.m-dark
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
      nuxt-child
</template>

<script>
  import axios from 'axios'

  function fetchProperty (route) {
    console.log('fetchProperty route', route)
    return axios
      .request({
        url: `/public/properties/${route.params.id}/${route.params.unitId}`,
        method: 'get',
        baseURL: 'http://localhost:8181/api/'
      })
      .then(response => {
        console.log('property', response.data)
        return {
          property: response.data,
          carouselHeight: '450px',
          markerIcon: { url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEiIHdpZHRoPSI0MiIgaGVpZ2h0PSI0MiIgdmlld0JveD0iLTEgLTEgMjYgMjUiPg0KPHN0eWxlPg0KcGF0aCB7c3Ryb2tlLXdpZHRoOiAxcHg7c3Ryb2tlOiAjNjQ5MDFFO30NCjwvc3R5bGU+DQo8cGF0aCBkPSJNMTIsMEM4LjEsMCw1LDMuMSw1LDdjMCw2LDcsMTcsNywxN3M3LTExLjEsNy0xN0MxOSwzLjEsMTUuOSwwLDEyLDB6IE0xMiw5Yy0xLjEsMC0yLTAuOS0yLTIgYzAtMS4xLDAuOS0yLDItMnMyLDAuOSwyLDJDMTQsOC4xLDEzLjEsOSwxMiw5eiIgZmlsbD0iIzk2Yzg0NSI+PC9wYXRoPg0KPC9zdmc+' }
        }
      })
      .catch(error => {
        console.log('response', error)
        if (error.response) {
          return  {
            error: error.response.data
          }
        } else {
          return {
            error: error.message
          }
        }
      })
  }

  export default {
    scrollToTop: true,
    fetch ({store, route}) {
      return axios
        .request({
          url: `/public/properties/${route.params.id}/${route.params.unitId}`,
          method: 'get',
          baseURL: 'http://localhost:8181/api/'
        })
        .then(response => {
          console.log('property', response.data)
          store.commit('setProperty', response.data)
        })
        .catch(error => {
          console.log('response', error)
        })
    },
    data () {
      return {
        carouselHeight: '450px',
        markerIcon: { url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEiIHdpZHRoPSI0MiIgaGVpZ2h0PSI0MiIgdmlld0JveD0iLTEgLTEgMjYgMjUiPg0KPHN0eWxlPg0KcGF0aCB7c3Ryb2tlLXdpZHRoOiAxcHg7c3Ryb2tlOiAjNjQ5MDFFO30NCjwvc3R5bGU+DQo8cGF0aCBkPSJNMTIsMEM4LjEsMCw1LDMuMSw1LDdjMCw2LDcsMTcsNywxN3M3LTExLjEsNy0xN0MxOSwzLjEsMTUuOSwwLDEyLDB6IE0xMiw5Yy0xLjEsMC0yLTAuOS0yLTIgYzAtMS4xLDAuOS0yLDItMnMyLDAuOSwyLDJDMTQsOC4xLDEzLjEsOSwxMiw5eiIgZmlsbD0iIzk2Yzg0NSI+PC9wYXRoPg0KPC9zdmc+' }
      }
    },
    computed: {
      property () {
        return this.$store.state.property
      },
    },
    methods: {
      handleWindowResize (e) {
        let carouselContainer = document.getElementsByClassName('el-carousel__container')[0]
        this.carouselHeight = carouselContainer.clientWidth * 9 / 16 + 'px'
      }
    }
  }
</script>
