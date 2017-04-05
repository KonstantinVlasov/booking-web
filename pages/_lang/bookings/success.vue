<template lang="pug">
  .booking-success-page
    .b-logo(v-html="logo")
    .b-title Booking Successful

    .b-content We just sent you email with confirmation and will send email with reservation details soon.

    br
    nuxt-link.b-back(v-bind:to="`/${lang}`") Back to site
</template>

<script>
  import logo from '~assets/svg/new-logo.svg'

  export default {
    layout: 'empty',
    computed: {
      lang () {
        return this.$store.state.lang.lang
      }
    },
    data () {
      return {
        logo
      }
    },
    mounted () {
      this.$store.commit('resetBooking')
    }
  }
</script>

<style lang="scss">
  body {
    background-color: #f4f4f4;
  }

  .booking-success-page {
    max-width: 30rem;
    padding: 6rem;
    margin: 0 auto;
    background-color: white;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    border-radius: 3px;
    color: black;

    @media (max-width: 30rem) {
      padding: 2.5rem;
    }

    .b-logo {
      width: 4rem;
      margin: 0 auto;

      @media (max-width: 30rem) {
        width: 3rem;
      }
    }

    .b-title {
      font-size: 2rem;
      text-align: center;
      margin-bottom: 2rem;

      @media (max-width: 30rem) {
        font-size: 1.75rem;
      }
    }
  }
</style>