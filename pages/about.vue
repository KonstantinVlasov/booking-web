<template lang="pug">
  .page
    .b-page-header
      .b-page-header-background
        img(src="/web/public/images/landing-bg-2000.jpg")
      h1 About Us

    .b-page-content
      .b-page-section
        .container
          p About Us coming soon
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
