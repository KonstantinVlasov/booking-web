<style lang="scss">
  @import "../../assets/css/mixins.scss";
  @import "../../assets/css/vars.scss";

  .property-item {
    @include clearfix;
    margin-bottom: 1.5rem;
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    color: $color-font;
    border-radius: 2px;
    overflow: hidden;
    text-decoration: none;
    transition: 0.5s all ease;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    @media (max-width: 50rem) {
      display: block;
    }

    &:visited {
      color: $color-font;
    }
    &:hover {
      box-shadow: 0 3px 8px rgba(0,0,0,0.2);
    }

    &.m-loading {
      opacity: 0.3;
    }

    .b-property-photo {
      flex: 0 0 180px;
      float: left;
      width: 180px;
      position: relative;
      overflow: hidden;
      border-radius: 2px 0 0 2px;
      box-shadow: 0 0 6px rgba(0,0,0,0.15);

      &:before {
        display: block;
        content: "";
        width: 100%;
        padding-top: 3/4 * 100%;
        @media (max-width: 32rem) {
        padding-top: 9/16 * 100%;
        }
      }
      >img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        transition: 0.3s all ease;
      }
      @media (max-width: 32rem) {
        float: none;
        width: 100%;
      }
    }

    .b-property-info {
      flex-grow: 1;
      padding: 1rem 1rem 0;
      @media (max-width: 50rem) {
        margin: 0 0 0 180px;
      }
      @media (max-width: 32rem) {
        margin: 0;
        padding: 1rem;
      }
    }

    .b-property-quote {
      flex: 0 0 200px;
      float: right;
      text-align: right;
      width: 200px;
      padding: 1rem 1.25rem 0 0;
      @media (max-width: 50rem) {
        background-color: #e2edf1;
        width: 100%;
        padding: 1rem 1.25rem;
      }
    }

    .b-property-title  {
      font-family: $font-family-title;
      font-size: 1.25rem;
      color: black;
      margin-bottom: 0.5rem;
    }

    .b-property-type {
      text-transform: capitalize;
    }

    .b-dot {
      &:before {
        content: '\2022';
        margin: 0 0.4rem;
        font-size: 0.75rem;
        color: lighten($color-font, 20%);
      }
    }

    .b-property-price {
      margin-left: 0.5rem;
      font-family: $font-family-text-bold;
      font-size: 1.5rem;
      font-weight: 400;
      color: black;
    }

    .b-quote {
      display: inline-block;
      margin-bottom: 0.75rem;
      @media (max-width: 35rem) {
        margin: 0;
      }
    }

    .b-property-show {
      vertical-align: bottom;
      margin-left: 1rem;
    }
    .b-property-quote-info {
      @media (max-width: 50rem) {
        display: inline-block;
        margin-left: 0.5rem;
      }
      @media (max-width: 35rem) {
        display: block;
        margin: 0;
      }
    }
  }
</style>

<template lang="pug">
  nuxt-link.property-item(
    v-if="property"
    v-bind:to="url"
    v-bind:class="{'m-loading': loading}"
  )

    .b-property-photo
      img(v-bind:src="photoUrl")

    .b-property-info
      .b-property-title {{ property.name }}
      .b-property-type {{ property.details.type }}
        span.b-dot {{ property.address.city }}, {{ property.address.country }}
      .b-property-rooms
        span {{ property.unit.details.maximumOccupancy }} Persons
        span.b-dot {{ property.unit.details.roomsCount }} Rooms
        span.b-dot {{ property.unit.details.bedroomsCount }} Bedrooms

    .b-property-quote
      .b-quote
        span from
        span.b-property-price USD {{ dailyMin }}
        .b-property-quote-info per property for 1 night
      .button.b-property-show View details
</template>

<script>
  import utils from '~plugins/utils'

  export default {
    name: 'propertyItem',
    computed: {
      lang () {
        return this.$store.state.lang.lang
      },
      url () {
        return `/${this.lang}/property/${this.property.id}/${this.property.unit.id}`
      },
      photoUrl () {
        let url = (this.property.photo && this.property.photo.url) ? this.property.photo.url : undefined
        if (url) {
          url = this.formatImage(url)
        }
        return url
      },
      dailyMin () {
        let self = this
        if (!self.property.unit || !self.property.unit.rates) {
          return 0
        }
        let currentRate = self.property.unit.rates[0]
        if (self.checkIn) {
          self.property.unit.rates.forEach(function (rate) {
            if (new Date(rate.startDate).getTime() <= self.checkIn &&
                new Date(rate.endDate).getTime() > self.checkIn) {
              currentRate = rate
            }
          })
        }

        if (currentRate.dailyMin) {
          return utils.addTax(currentRate.dailyMin)
        }
        return 0
      }
    },
    methods: {
      // width 360, height 270, crop fill, quality auto
      formatImage (url) {
        let result = url.split('/upload/')
        result[0] += '/upload/w_360,h_270,c_fill,q_auto/'
        return result.join('')
      }
    },
    props: [
      'property',
      'loading',
      'checkIn',
      'checkOut'
    ]
  }
</script>
