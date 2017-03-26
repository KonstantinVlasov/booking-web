<template lang="pug">
  .property-page
    .b-page-section.m-facture
      .container.m-medium
        .b-photos
          h2.b-title Photos
          .b-photos-content
            slider(v-bind:ratio="16/9")
              slider-item(
                v-for="photo in photos"
                v-bind:key="photo._id"
              )
                img(v-bind:src="photo.url")

    .b-page-section
      .container.m-medium
        h2 Interior
        p {{ property.description }}

        br
        br
        h2 Exterior
        p {{ property.address.description }}

        br
        br
        h2 Facilities
        amenities(v-bind:amenities="property.amenities")

        br
        br
        br
        h2 Location
        h3 {{ property.address.country }}, {{ property.address.city }}, {{ property.address.address }}
        .b-property-map
          gmap-map(
            v-bind:center="center"
            v-bind:zoom="14"
          )
            gmap-marker(
              v-bind:position="center"
              v-bind:icon="markerIcon"
            )

    .b-page-section.m-facture
      .container
        h2 Availability
        calendar(v-bind:vacancy="unit.vacancy")
</template>

<script>
  import Amenities from '~components/property/Amenities.vue'
  import Calendar from '~components/property/Calendar.vue'

  export default {
    scrollToTop: true,
    components: {
      Amenities,
      Calendar
    },
    head () {
      return {
        title: `${this.property.name} - iBookingNet`
      }
    },
    data () {
      return {
        markerIcon: { url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEiIHdpZHRoPSI0MiIgaGVpZ2h0PSI0MiIgdmlld0JveD0iLTEgLTEgMjYgMjUiPg0KPHN0eWxlPg0KcGF0aCB7c3Ryb2tlLXdpZHRoOiAxcHg7c3Ryb2tlOiAjNjQ5MDFFO30NCjwvc3R5bGU+DQo8cGF0aCBkPSJNMTIsMEM4LjEsMCw1LDMuMSw1LDdjMCw2LDcsMTcsNywxN3M3LTExLjEsNy0xN0MxOSwzLjEsMTUuOSwwLDEyLDB6IE0xMiw5Yy0xLjEsMC0yLTAuOS0yLTIgYzAtMS4xLDAuOS0yLDItMnMyLDAuOSwyLDJDMTQsOC4xLDEzLjEsOSwxMiw5eiIgZmlsbD0iIzk2Yzg0NSI+PC9wYXRoPg0KPC9zdmc+' }
      }
    },
    computed: {
      property () {
        return this.$store.state.property
      },
      center () {
        if (this.property && this.property.address) {
          return {
            lat: this.property.address.latitude,
            lng: this.property.address.longitude
          }
        } else {
          return {}
        }
      },
      unit () {
        if (!this.property) {
          return {}
        }
        return this.property.units[0]
      },
      photos () {
        if (!this.property) {
          return []
        }
        let photos = [].concat(this.property.photos)
        if (this.unit.photos) {
          photos = photos.concat(this.unit.photos)
        }
        return photos
      }
    }
  }
</script>

<style lang="scss">
  .property-page {
    .b-photos-content {
      padding: 1rem;
      background: white;
      box-shadow: 0 16px 64px -12px rgba(0,0,0,0.5);
      @media (max-width: 40rem) {
        padding: 0.5rem;
      }
    }

    .b-property-map {
      height: 300px;
      width: 100%;
      box-shadow: 0 0px 4px  rgba(0,0,0,0.3);

      .vue-map-container {
        height: 100%;
      }
    }
  }
</style>
