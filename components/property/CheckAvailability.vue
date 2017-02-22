<style lang="scss">
  @import '../../assets/css/vars';

  .check-availbility {

    &.landing-form .b-form {
      width: 72%;
      height: auto;
      @media (max-width: 60rem) {
        width: 100%;

        .b-form-item {
          &:nth-child(1) {
            width: 37%;
          }
          &:nth-child(2) {
            width: 37%;
          }
          &:nth-child(3) {
            width: 26%;
          }
        }
      }
      @media (max-width: 25rem) {
        .b-form-item {
          display: block;
          &:nth-child(1) {
            width: auto;
          }
          &:nth-child(2) {
            width: auto;
          }
          &:nth-child(3) {
            width: auto;
          }
        }
      }
    }
    &.landing-form .b-action {
      width: 28%;
      height: 8.375rem;
      @media (max-width: 60rem) {
        height: auto;
        width: 100%;
      }
    }

    &.el-form--label-top .el-form-item__label {
      padding: 0.25rem 0 1.25rem;
      @media (max-width: 40rem) {
        padding: 0.25rem 0;
      }
      @media (max-width: 25rem) {
        padding: 0;
      }
    }
    .b-quote {
      margin-bottom: 0.5rem;
      @media (max-width: 60rem) {
        display: inline-block;

        vertical-align: middle;
      }
      @media (max-width: 25rem) {
        font-size: 14px;
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
    .b-submit {
      @media (max-width: 60rem) {
        margin-left: 1rem;
      }
      @media (max-width: 25rem) {
        margin-left: 0;
      }
    }
  }
</style>

<template lang="pug">
  el-form.m-landing.check-availbility(
    v-bind:label-position="'top'"
    v-bind:inline="true"
    @submit.native.prevent="searchProperties"
  )
    .b-form
      .b-form-item.m-third
        el-form-item(label="Check-in")
          el-date-picker(
            v-model="query.checkIn"
            format="dd"
            type="date"
            v-bind:editable="editable"
          )
          el-date-picker.m-month(
            v-model="query.checkIn"
            format="/ MMM"
            type="date"
            v-bind:editable="editable"
          )
          .b-arrow(v-html="icons.arrowRight")
      .b-form-item.m-third
        el-form-item(label="Check-out")
          el-date-picker(
            v-model="query.checkOut"
            format="dd"
            type="date"
            v-bind:editable="editable"
          )
          el-date-picker.m-month(
            v-model="query.checkOut"
            format="/ MMM"
            type="date"
            v-bind:editable="editable"
          )
          .b-arrow(v-html="icons.arrowRight")
      .b-form-item.m-third
        el-form-item(label="Guests")
          el-input(
            v-model.number="query.guests"
          )

    .b-action
      .b-form-item
        .b-quote
          span from
          span.b-property-price USD {{ query.price }}
          .b-quote-info per property for 1 night

        el-button.b-submit(native-type="submit") Book Now
</template>

<script>
  import arrowRight from '~assets/svg/arrow-right.svg'
  import moment from 'moment'

  export default {
    data () {
      return {
        icons: {
          arrowRight
        },
        editable: false,
        clearable: true
      }
    },
    props: {
      query: {
        default () {
          return {
            price: 350,
            term: undefined,
            checkIn: moment().add(1, 'days'),
            checkOut: moment().add(8, 'days'),
            guests: 2
          }
        }
      }
    },
    methods: {
      searchProperties () {
        console.log('search', this.query)
        this.$router.push({
          path: 'search',
          query: {
            price: 0,
            term: this.query.term,
            guests: this.query.guests,
            checkIn: moment(this.query.checkIn).format('YYYY-MM-DD'),
            checkOut: moment(this.query.checkOut).format('YYYY-MM-DD')
          }
        })
      }
    }
  }
</script>
