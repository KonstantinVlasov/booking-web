<style lang="scss">
  @import "../assets/css/vars.scss";

  footer {
    background: $color-dark;
    padding: 4rem 1rem;
    color: white;
    font-size: 0.875rem;

    a {
      color: white;
      text-decoration: none;
      &:hover, &:visited, &:active {
        color: inherit;
        text-decoration: underline;
      }
    }

    &>.b-links {
      text-align: center;

      &>.b-link {
        display: inline-block;
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
      | 2300 Irving St, San Francisco, CA USA
      br
      | © 2017 iBookingNet | All Rights Reserved
    br
    br
    .b-links
      nuxt-link.b-link(to="/channels") Channels
      nuxt-link.b-link(to="/partners") Partners
      nuxt-link.b-link(to="/terms") Terms and Conditions
</template>
