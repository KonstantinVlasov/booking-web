<template lang="pug">
  form.m-landing.check-availability(
    @submit.prevent="submitBook"
  )
    .b-form
      .b-form-item
        label {{ $t('availabilityForm.checkIn') }}
        .form-field
          landing-date-picker(
            v-model="checkIn"
            v-bind:vacancy="property.unit.vacancy"
          )
      .b-form-item
        label {{ $t('availabilityForm.checkOut') }}
        .form-field
          landing-date-picker(
            v-model="checkOut"
            v-bind:vacancy="property.unit.vacancy"
          )
      .b-form-item
        label {{ $t('availabilityForm.guests') }}
        .form-field
          input(
            v-model.number="localQuote.guests"
          )

    .b-action
      .b-form-item.m-quote(v-if="!quote.total || mode === 'quote'")
        .b-quote
          span from
          span.b-property-price USD {{ dailyMin }}
          .b-quote-info per property for 1 night

        .button.b-submit(
          v-on:click.prevent="submitQuote"
          v-bind:class="{'m-loading': quoteLoading}"
        ) {{ $t('availabilityForm.checkDates') }}

      .b-form-item.m-book(v-if="quote.total && mode === 'book'")
        .b-quote
          span.b-property-price USD {{ quote.total }}
          .b-quote-info per property for {{ nights }} nights

        button.button.b-submit(type="submit") {{ $t('availabilityForm.book') }}

    <!--.b-details(v-if="!showDetails")-->
      <!--.b-details-item Cancellation policy-->

    sweet-modal(
      icon="warning"
      ref="minStayModal"
    ) Sorry! There are {{ minStay }} days minimum to stay for this period

    sweet-modal(
      icon="warning"
      ref="unavailableModal"
    ) Sorry! Dates unavailable
</template>

<script>
  import utils from '~plugins/utils'
  import LandingDatePicker from '~components/landings/LandingDatePicker.vue'
  import arrowRight from '~assets/svg/arrow-right.svg'
  import moment from 'moment'

  import { mapState, mapActions } from 'vuex'

  /**
   * @param this.$refs
   * @param this.$refs.minStayModal
   * @param this.$refs.unavailableModal
   * @param this.$router
   * @param this.$store.commit
   * @param this.property.unit.rates
   */
  export default {
    components: {
      LandingDatePicker
    },
    data () {
      return {
        localQuote: Object.assign({}, this.$store.state.quote),
        icons: {
          arrowRight
        },
        minStay: undefined,
        showDetails: false,
        quoteLoading: false,
        editable: false,
        mode: 'book'
      }
    },
    computed: {
      ...mapState({
        lang: state => state.lang.lang,
        property: 'property',
        quote: 'quote'
      }),
      checkIn: {
        get () {
          return moment(this.localQuote.checkIn)
        },
        set (value) {
          this.localQuote.checkIn = moment(value).format('YYYY-MM-DD')
        }
      },
      checkOut: {
        get () {
          return moment(this.localQuote.checkOut)
        },
        set (value) {
          this.localQuote.checkOut = moment(value).format('YYYY-MM-DD')
          let vacancyDay = utils.getVacancyDay(this.property.unit.vacancy, this.localQuote.checkIn)
          let nights = moment(this.localQuote.checkOut).diff(moment(this.localQuote.checkIn), 'days')
          if (nights < vacancyDay.minStay) {
            this.minStay = vacancyDay.minStay
            this.$refs.minStayModal.open()
          }
        }
      },
      nights () {
        if (!this.checkOut || !this.checkIn) {
          return 1
        }
        return this.checkOut.diff(this.checkIn, 'days')
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
    watch: {
      checkIn () {
        this.mode = 'quote'
      },
      checkOut () {
        this.mode = 'quote'
      },
      guests () {
        this.mode = 'quote'
      }
    },
    methods: {
      ...mapActions([
        'extendQuoteQuery',
        'quoteProperty'
      ]),
      submitQuote () {
        this.quoteLoading = true
        this.extendQuoteQuery(this.localQuote)
        this.$router.push({
          query: {
            checkIn: this.quote.checkIn,
            checkOut: this.quote.checkOut,
            guests: this.quote.guests
          }
        })
        this.quoteProperty()
          .then(() => {
            this.quoteLoading = false
            this.mode = 'book'
          })
          .catch(() => {
            this.quoteLoading = false
            this.$refs.unavailableModal.open()
          })
      },
      submitBook () {
        this.showDetails = true
        this.$router.push({
          path: `/${this.lang}/property/${this.$route.params.id}/${this.$route.params.unitId}/booking`,
          query: {
            checkIn: this.quote.checkIn,
            checkOut: this.quote.checkOut,
            guests: this.quote.guests
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/vars';

  .check-availability {

    &.landing-form .b-form {
      width: 72%;
      height: auto;
      .b-form-item {
        &:nth-child(1) {
          width: 36%;
        }
        &:nth-child(2) {
          width: 36%;
        }
        &:nth-child(3) {
          width: 28%;
        }
      }
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

    &.landing-form label, &.el-form--label-top .el-form-item__label {
      padding: 0.25rem 0 1.25rem;
      @media (max-width: 40rem) {
        padding: 0.25rem 0;
      }
      @media (max-width: 25rem) {
        padding: 0;
      }
    }
    .b-quote {
      margin-bottom: 0.375rem;
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

    .b-details {
      border-top: 1px solid green;
    }
  }
</style>
