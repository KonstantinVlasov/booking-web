<style lang="scss">
  @import "~assets/css/vars.scss";

  .featured-properties {
    margin: 2rem auto 6rem;
    text-align: center;
    max-width: 60rem;

    @media (max-width: 30rem) {
      margin: 2rem auto 3rem;
    }

    .b-list {
      margin: 0 -0.5rem;
    }
  }
</style>

<template lang="pug">
  .featured-properties(v-if="properties && properties.length")
    h4 {{ subtitle }}
    h2.b-title {{ title }}
    .b-list
      featured-property(
        v-for="property in properties"
        v-bind:key="property.id"
        v-bind:property="property"
      )
</template>

<script>
import FeaturedProperty from '~components/landings/FeaturedProperty.vue'

export default {
  name: 'FeaturedProperties',
  components: {
    FeaturedProperty
  },
  props: [
    'properties',
    'title',
    'subtitle'
  ]
}
</script>
