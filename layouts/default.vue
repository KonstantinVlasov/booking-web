<template lang="pug">
  .layout
    app-header
    nuxt.content
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

<style lang="scss" src="~assets/css/public.scss"></style>
<style lang="scss">
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .content {
    flex: 1;
  }
</style>
