<template lang="pug">
  header
    nuxt-link.b-title(v-bind:to="`/${lang}`")
      .b-logo(v-html="logo")
      | iBookingNet

    .b-menu
      nuxt-link.b-menu-item(v-bind:to="`/${lang}`") {{ $t('menu.home') }}
      nuxt-link.b-menu-item(v-bind:to="`/${lang}/channels`") {{ $t('menu.channels') }}
      nuxt-link.b-menu-item(v-bind:to="`/${lang}/pms`") {{ $t('menu.pms') }}
      nuxt-link.b-menu-item(v-bind:to="`/${lang}/partners`") {{ $t('menu.partners') }}
</template>

<style lang="scss">
  @import "~assets/css/vars.scss";

  header {
    position: relative;
    z-index: 2;
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 4rem;
    line-height: 5rem;
    height: 5rem;
    background-color: white;

    @media (max-width: 40rem) {
      display: block;
      line-height: 3rem;
      height: auto;
      text-align: center;
      padding: 0;
    }

    a.b-title {
      display: inline-block;
      color: inherit;
      text-decoration: none;
      font-size: 1.125rem;

      @media (max-width: 40rem) {
        margin-top: 0.5rem;
        height: 3rem;
      }

      &:hover {
        color: inherit;
      }
    }
    .b-logo {
      display: inline-block;
      height: 4rem;
      vertical-align: top;
      margin-right: 0.5rem;

      @media (max-width: 40rem) {
        height: 3rem;
        line-height: 3rem;
      }

      &>svg {
        fill: #444;
        width: 2rem;
        vertical-align: middle;
      }
    }

    .b-menu {
    }

    a.b-menu-item {
      display: inline-block;
      color: inherit;
      height: 4rem;
      line-height: 4rem;
      font-size: 1rem;
      margin: 0 0 0 2rem;
      text-transform: uppercase;
      text-decoration: none;
      border-bottom: 2px solid white;
      @media (max-width: 40rem) {
        line-height: 3rem;
        height: 3rem;
        margin: 0 0 0 1.5rem;

        &:first-child {
          margin: 0;
        }
      }
    }
  }
</style>

<script>
  import logo from '~assets/svg/new-logo.svg'

  export default {
    computed: {
      lang () {
        return this.$store.state.lang.lang
      }
    },
    data () {
      return {
        logo
      }
    }
  }
</script>
