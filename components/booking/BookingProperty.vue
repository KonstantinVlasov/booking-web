<style lang="scss">
  @import "../../assets/css/mixins.scss";
  @import "../../assets/css/vars.scss";

  .booking-property {
    @include clearfix;
    margin-bottom: 1.5rem;
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    color: $color-font;
    border-radius: 2px;
    overflow: hidden;
    text-decoration: none;
    transition: 0.5s all ease;

    display: block;

    .b-property-photo {
      flex: 0 0 180px;
      float: left;
      width: 270px;
      position: relative;
      overflow: hidden;
      border-radius: 2px 0 0 2px;
      box-shadow: 0 0 6px rgba(0,0,0,0.15);
      margin-right: 1rem;

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

    .b-info {
      padding: 1rem 1rem 0;
      margin-bottom: 0.5rem;
      vertical-align: top;
      @media (max-width: 32rem) {
        margin: 0;
        padding: 1rem;
      }
    }

    .b-info-title  {
      font-family: $font-family-title;
      font-size: 1.25rem;
      color: black;
      margin-bottom: 0.5rem;
    }

    .b-info-text {
      font-size: 1.125rem;
      color: black;
      @media (max-width: 30rem) {
        font-size: 1rem;
      }
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

    .b-property-quote {
      flex: 0 0 200px;
      float: right;
      text-align: right;
      background-color: #e2edf1;
      width: 100%;
      padding: 1rem 1.25rem;
    }

    .b-quote {
      display: inline-block;
      margin: 0;
      font-size: 1.125rem;
      color: $color-dark;
      @media (max-width: 30rem) {
        font-size: 1rem;
      }
    }
    .b-quote-info {
      @media (max-width: 60rem) {
        display: inline-block;
        margin-left: 0.5rem;
      }
      @media (max-width: 25rem) {
        margin-left: 0.375rem;
      }
    }
    .b-property-price {
      margin-left: 0.5rem;
      font-family: $font-family-text-bold;
      font-size: 1.5rem;
      font-weight: 400;
      color: black;
      @media (max-width: 25rem) {
        font-size: 1.25rem;
        margin-left: 0.375rem;
      }
    }
    .b-property-quote-info {
      @media (max-width: 30rem) {
        display: block;
      }
    }
  }
</style>

<template lang="pug">
  .booking-property
    .b-property-photo
      img(v-bind:src="photoUrl")

    .b-info
      .b-info-title {{ property.name }}
      .b-info-text
        span.b-property-type {{ property.details.type }}
        span.b-dot {{ property.address.city }}, {{ property.address.country }}

      .b-info-text
        span {{ property.unit.details.maximumOccupancy }} Persons
        span.b-dot {{ property.unit.details.roomsCount }} Rooms
        span.b-dot {{ property.unit.details.bedroomsCount }} Bedrooms

    .b-info
      .b-info-title Booking Info
      .b-info-text {{ checkIn }} - {{ checkOut }}
      .b-info-text
        span {{ nights }} nights
        span.b-dot {{ quote.guests }} guests

    .b-property-quote
      .b-quote
        span Total
        span.b-property-price USD {{ quote.total }}&nbsp;
        span.b-property-quote-info per property for {{ nights }} nights
</template>

<script>
  import moment from 'moment'

  import { mapState } from 'vuex'

  export default {
    name: 'propertyItem',
    computed: {
      ...mapState({
        lang: state => state.lang.lang,
        property: 'property',
        quote: 'quote'
      }),
      photoUrl () {
        let url = (this.property.photo && this.property.photo.url) ? this.property.photo.url : undefined
        if (url) {
          url = this.formatImage(url)
        }
        return url
      },
      checkIn () {
        return moment(this.quote.checkIn).format('DD MMM YYYY')
      },
      checkOut () {
        return moment(this.quote.checkOut).format('DD MMM YYYY')
      },
      nights () {
        return moment(this.quote.checkOut).diff(moment(this.quote.checkIn), 'days')
      }
    },
    methods: {
      // width 360, height 270, crop fill, quality auto
      formatImage (url) {
        let result = url.split('/upload/')
        result[0] += '/upload/w_360,h_270,c_fill,q_auto/'
        return result.join('')
      }
    }
  }
</script>
