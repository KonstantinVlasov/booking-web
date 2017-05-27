<style lang="scss">
  @import "../assets/css/vars.scss";

  footer {
    text-align: center;
    background: $color-dark;
    padding: 3rem 1rem;
    color: white;
    font-size: 0.875rem;
    line-height: 1.5;

    a {
      color: white;
      text-decoration: none;
      &:hover, &:visited, &:active {
        color: inherit;
        text-decoration: underline;
      }
    }

    &>.b-links {
      padding: 0 2rem;
      text-align: left;
      display: inline-block;

      &>.b-link {
        display: block;
        padding: 0 0.5rem;
      }
    }

    &>.b-copyright {
      text-align: center;
      font-size: 0.875rem;
    }
  }
</style>

<template lang="pug">
  footer
    .b-copyright
      | {{ $t('footer.address') }}
      br
      | {{ $t('footer.copyright') }}
    br
    br
    .b-links
      nuxt-link.b-link(v-bind:to="`/${lang}/about`") {{ $t('menu.about') }}
      nuxt-link.b-link(v-bind:to="`/${lang}/channels`") {{ $t('menu.channels') }}
      nuxt-link.b-link(v-bind:to="`/${lang}/partners`") {{ $t('menu.partners') }}

    .b-links
      nuxt-link.b-link(v-bind:to="`/${lang}/policy`") {{ $t('menu.policy') }}
      nuxt-link.b-link(v-bind:to="`/${lang}/terms`") {{ $t('menu.terms') }}
      nuxt-link.b-link(v-bind:to="`/${lang}/contact`") {{ $t('menu.contact') }}

    .b-links
      a.b-link(href="https://www.facebook.com/I-Booking-Net-461713700833268") Facebook
      a.b-link(href="https://twitter.com/ibookingn") Twitter
      a.b-link(href="https://www.instagram.com/ibookingnet") Instagram
</template>

<script>
  /**
   * @param this.$store
   */
  export default {
    computed: {
      lang () {
        return this.$store.state.lang.lang
      }
    }
  }
</script>
