<style lang="scss">
  @import "../../../assets/css/vars.scss";

  .search-form {

    &.landing-form .b-form {
      height: auto;

      @media (max-width: 60rem) {
        height: auto;
        padding: 0.5rem 0;

        .b-form-item:nth-child(2) {
          border-left: none;
        }
      }
      .b-place {
        width: 28%;
        @media (max-width: 60rem) {
          width: 100%;
          border-bottom: 1px solid #ddd;
          margin-bottom: 1rem;
          padding-top: 0.75rem;
          padding-bottom: 0.5rem;
          .el-form-item {
            width: 100%;
          }
          .el-input.m-small .el-input__inner {
            margin-top: 0;
          }
        }
        @media (max-width: 25rem) {
          display: block;
          width: auto;
          padding-top: 0;
          padding-bottom: 0.125rem;
          margin-bottom: 0.75rem;
        }
      }
      .b-dates {
        width: 28%;
        @media (max-width: 60rem) {
          width: 37%;
        }
        @media (max-width: 25rem) {
          display: block;
          width: auto;
        }
        &:nth-child(3) {
          border-left: none;
        }
      }
      .b-guests {
        width: 16%;
        @media (max-width: 60rem) {
          width: 26%;
        }
        @media (max-width: 25rem) {
          display: block;
          width: auto;
        }
      }
      .b-arrow {
        @media (max-width: 60rem) {
          top: 0.625rem;
        }
      }
    }
    &.landing-form .b-action {
      height: 7.5rem;
      @media (max-width: 60rem) {
        height: auto;
      }
    }

    .b-submit {
      padding: 1rem;
      margin-top: 2.125rem;
      @media (max-width: 60rem) {
        padding: 0.75rem 1.75rem;
        margin-top: 0;
      }
    }

    &.landing-form .el-date-editor.el-input {
      @media (max-width: 60rem) {
        width: 2rem;
        &.m-month {
          width: 4.5rem;
        }
      }
    }
    &.landing-form .el-input__inner {
      @media (max-width: 60rem) {
        height: 1.75rem;
        font-size: 1.75rem;
      }
    }
  }
</style>

<template lang="pug">
  el-form.m-landing.search-form(
    v-bind:label-position="'top'"
    v-bind:inline="true"
    @submit.native.prevent="searchProperties"
  )
    .b-form
      .b-form-item.b-place
        el-form-item(label="Where")
          el-input.m-small(
            v-model.trim="query.term"
            placeholder="Where do you want to go?"
          )
      .b-form-item.b-dates
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
      .b-form-item.b-dates
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
      .b-form-item.b-guests
        el-form-item(label="Guests")
          el-input(
            v-model.number="query.guests"
          )
    .b-action
      .b-form-item
        el-button.b-submit(native-type="submit") Search
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
