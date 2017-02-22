<style lang="scss">
  @import "../../assets/css/mixins.scss";
  @import "../../assets/css/vars.scss";

  .featured-property {
    @include clearfix;
    padding: 0 0.5rem;
    width: 33.3%;
    margin-bottom: 1rem;
    position: relative;
    display: inline-block;
    vertical-align: top;
    text-align: left;
    color: $color-font;
    text-decoration: none;
    transition: 0.5s all ease;

    @media (max-width: 60rem) {
      width: 50%;
      &:last-child {
        display: none;
      }
    }
    @media (max-width: 30rem) {
      width: 100%;
    }

    &:visited {
      color: $color-font;
    }
    &.m-loading {
      opacity: 0.3;
    }

    &>.b-container {
      background: white;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      transition: 0.4s all ease;
      border-radius: 2px;

      &:hover {
        box-shadow: 0 3px 8px rgba(0,0,0,0.2);
        .b-property-photo img {
          width: 105%;
        }
      }
    }

    .b-property-photo {
      width: 100%;
      position: relative;
      overflow: hidden;
      border-radius: 2px 2px 0 0;
      background-color: #ededef;

      &:before {
        content: 'Sorry. Image not found';
        position: absolute;
        width: 100%;
        line-height: 4rem;
        text-align: center;
      }
      &:after {
        display: block;
        content: "";
        width: 100%;
        padding-top: 3/5 * 100%;
      }
      >img {
        transition: 0.5s all ease;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        filter: brightness(0.85);
      }
    }

    .b-property-info {
      padding: 1rem;
      color: $color-dark;
    }

    .b-dot {
      &:before {
        content: '\2022';
        margin: 0 0.4rem;
        font-size: 0.75rem;
      }
    }

    .b-property-price {
      font-size: 1.25rem;
    }
  }
</style>

<template lang="pug">
  nuxt-link.featured-property(
    v-if="property"
    v-bind:to="url"
    v-bind:class="{'m-loading': loading}"
  )
    .b-container
      .b-property-photo
        img(v-bind:src="photoUrl")

      .b-property-info
        .b-property-price USD {{ unit.rates[0].dailyMin}}

        | {{ title }}
        span.b-dot {{ property.address.city }}
</template>

<script>
  export default {
    name: 'featuredProperty',
    computed: {
      url () {
        return `/property/${this.property.id}/${this.unit.id}`
      },
      photoUrl () {
        let url = this.photo.url ? this.photo.url : undefined
        if (url) {
          url = url.split('/upload/')
          // width 360, height 270, crop fill, quality auto
          url[0] += '/upload/w_360,h_270,c_fill,q_auto/'
          url = url.join('');
        }
        return url
      },
      photo () {
        return this.property.photos ? this.property.photos[0] : {}
      },
      unit () {
        return this.property.units ? this.property.units[0] : {}
      },
      title () {
        return this.property.name.substring(0, 24)
      }
    },
    props: [
      'property',
      'loading'
    ]
  }
</script>
