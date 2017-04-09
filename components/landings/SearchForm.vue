<style lang="scss">
  @import "../../assets/css/vars.scss";

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
      padding: 0 1rem;
      margin-top: 2.125rem;
      @media (max-width: 60rem) {
        padding: 0 1.75rem;
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
  form.m-landing.search-form(
    @submit.prevent="submitForm"
  )
    .b-form
      .b-form-item.b-place
        label Where
        .form-field.m-small
          input(
            v-model.trim="localQuery.term"
            v-bind:placeholder="wherePlaceholder"
          )
      .b-form-item.b-dates
        label Check-in
        .form-field
          landing-date-picker(v-model="checkIn")
      .b-form-item.b-dates
        label Check-out
        .form-field
          landing-date-picker(v-model="checkOut")
      .b-form-item.b-guests
        label Guests
        .form-field
          input(
            v-model.number="localQuery.guests"
          )
    .b-action
      .b-form-item
        button.button.b-submit(type="submit") Search
</template>

<script>
  import LandingDatePicker from '~components/landings/LandingDatePicker.vue'
  import arrowRight from '~assets/svg/arrow-right.svg'
  import moment from 'moment'

  import { mapState, mapActions } from 'vuex'

  export default {
    components: {
      LandingDatePicker
    },
    data () {
      return {
        localQuery: Object.assign({}, this.$store.state.query),
        icons: {
          arrowRight
        },
        wherePlaceholder: ''
      }
    },
    computed: {
      ...mapState({
        lang: state => state.lang.lang,
        query: 'query'
      }),
      checkIn: {
        get () {
          return moment(this.localQuery.checkIn)
        },
        set (value) {
          this.localQuery.checkIn = moment(value).format('YYYY-MM-DD')
        }
      },
      checkOut: {
        get () {
          return moment(this.localQuery.checkOut)
        },
        set (value) {
          this.localQuery.checkOut = moment(value).format('YYYY-MM-DD')
        }
      }
    },
    methods: {
      ...mapActions([
        'extendSearchQuery',
        'searchProperties'
      ]),
      submitForm () {
        this.$router.push({
          path: `/${this.lang}/search`,
          query: {
            ...this.localQuery
          }
        })
      },
      updateWherePlaceholder () {
        if (window.innerWidth > 960 || window.innerWidth <= 400) {
          this.wherePlaceholder = 'Place'
        } else {
          this.wherePlaceholder = 'Where do you want to go?'
        }
      }
    },
    mounted () {
      window.addEventListener('resize', this.updateWherePlaceholder)
      this.updateWherePlaceholder()
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.updateWherePlaceholder)
    }
  }
</script>
