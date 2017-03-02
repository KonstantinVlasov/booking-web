<template lang="pug">
  .page
    .b-page-header
      .b-page-header-background.m-dark
        img(src="/web/public/images/landing-bg-2000.jpg")
      h1 About Us

    .b-page-content
      .b-page-section
        .container.m-short
          h3 Book instantly over 40,000 quality tested holiday homes and apartments online!
          p No matter what you’re looking for, iBookingNet can satisfy just about any request with more than 40.000 online bookable holiday homes and apartments in 34 countries. Whether it’s a mountain chalet, a villa with pool, a city apartment, a cottage or a castle – you will find the right property for you!
</template>

<script>
export default {
  scrollToTop: true,
  data ({ req }) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  head () {
    return {
      title: `About Page (${this.name}-side)`
    }
  }
}
</script>
