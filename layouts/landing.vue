<style lang="scss" src="~assets/css/public.scss"></style>

<template lang="pug">
  div
    app-header
    nuxt
    app-footer
</template>

<script>
import AppHeader from '~components/Header.vue'
import AppFooter from '~components/Footer.vue'

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>
