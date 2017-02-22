<style lang="scss">
  @import "../../assets/css/vars.scss";

  .amenities {
    max-width: 60rem;

    .b-amenity {
      display: inline-block;
      width: 25%;
      padding-right: 1rem;
      line-height: 2rem;
      @media (max-width: 60rem) {
        width: 33%;
      }
      @media (max-width: 40rem) {
        width: 50%;
      }
      @media (max-width: 25rem) {
        width: 100%;
        padding: 0 0 0 2rem;
      }
    }

    .b-amenity-icon {
      display: inline-block;
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
      fill: $color-green;
      vertical-align: middle;
    }
  }
</style>

<template lang="pug">
  .amenities
    .b-amenity(v-for="amenity in amenities")
      .b-amenity-icon(v-html="ok")
      | {{ amenity }}
</template>

<script>
import ok from '~assets/svg/ok.svg'
export default {
  name: 'Amenities',
  data () {
    return {
      ok
    }
  },
  props: [
    'amenities'
  ]
}
</script>
