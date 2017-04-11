<template lang="pug">
  .page
    .b-page-content
      .b-page-section.m-facture
        .container
          .panel.m-landing
            h4 Information
            h2 Contact Us
            contact-us
</template>

<script>
  import ContactUs from '~components/landings/ContactUs.vue'

  export default {
    scrollToTop: true,
    components: {
      ContactUs
    },
    head () {
      return {
        title: 'Contact Us - iBookingNet'
      }
    }
  }
</script>
