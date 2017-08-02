<template lang="pug">
  .page.pms-page
    .b-page-header
      .b-page-header-background.m-dark
        img(src="/web/public/images/landing-bg-2000.jpg")
      h1 Property Management System

    .b-page-content
      .b-page-section
        .container.m-short
          p We have a great solution for your business when it comes to having an easy-to-use and functional booking system and PMS for you vacation rental. If you run a hostel, B & B, lodging, guest house, small hotels or vacation our app is a perfect tool for you.
          p Besides the vacation rental PMS, iBookingNet also comes with an booking engine We want to provide you with a  system that is complete for the small properties and enables to have the total overview over reservations, calendar,  payment information, etc.
          p When it comes to vacation rental PMS, we can offer the solution that fits your business perfectly. Here is some of the system features

      .b-page-section.m-facture
        .container.m-short
          h2 Integrated dashboard
          img(src="/web/public/images/pms/dashboard.png")

      .b-page-section
        .container.m-short
          h2 Property management module
          img(src="/web/public/images/pms/property-edit.png")

      .b-page-section.m-facture
        .container.m-short
          h2 Cahnnel selection
          img(src="/web/public/images/pms/channels.png")

      .b-page-section
        .container.m-short
          h2 Integrated calendar
          img(src="/web/public/images/pms/calendar.png")

      .b-page-section.m-facture
        .container
          .panel.m-landing
            h2 Please contact us for a free demo
            contact-us
</template>

<script>
  import ContactUs from '~components/landings/ContactUs.vue'

  export default {
    scrollToTop: true,
    components: {
      ContactUs
    },
    asyncData ({ req }) {
      return {
        name: req ? 'server' : 'client'
      }
    },
    head () {
      return {
        title: 'About iBookingNet'
      }
    }
  }
</script>

<style lang="scss">
  .pms-page {
    img {
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
      border-radius: 4px;
    }
  }
</style>
