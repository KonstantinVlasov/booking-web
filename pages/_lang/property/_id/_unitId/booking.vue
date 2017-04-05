<style lang="scss">
  .booking-page {

    padding: 2rem 0 0;

    @media (max-width: 30rem) {
      padding: 0;
    }

    .b-booking-form {
      display: inline-block;
      width: 50%;
      padding: 0.5rem;
      vertical-align: top;
      margin-bottom: 1.5rem;

      @media (max-width: 50rem) {
        width: 100%;
      }
    }

    .b-booking-form-content {
      padding: 1.5rem 1rem 0;
      border-radius: 2px;
      background-color: white;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    }

    .b-booking-form-footer {
      text-align: center;
      margin-top: 1rem;
    }

    .b-action {
      text-align: center;
    }

  }
</style>

<template lang="pug">
  .b-page-section.m-facture
    .booking-page(data-vv-scope="booking-form")
      .container
        .b-booking-form
          h3 Enter Your Details
          .b-booking-form-content
            form
              .row
                .col-12
                  .form-item
                    label.m-required First Name
                    input(
                      name="name"
                      data-vv-as="First Name"
                      v-model.trim="booking.name"
                      v-validate="'required'"
                    )
                    span(v-show="errors.has('name')" class="b-validation") {{ errors.first('name') }}
                .col-12
                  .form-item
                    label Last Name
                    input(
                      v-model.trim="booking.lastName"
                    )
              .row
                .col-12
                  .form-item
                    label.m-required Email
                    input(
                      name="email"
                      type="email"
                      v-model.trim="booking.email"
                      v-validate="'required|email'"
                    )
                    span(v-show="errors.has('email')" class="b-validation") {{ errors.first('email') }}
                .col-12
                  .form-item
                    label.m-required Phone
                    input(
                      name="phone"
                      data-vv-as="Phone"
                      v-model.trim="booking.phone"
                      v-validate="'required'"
                    )
                    span(v-show="errors.has('phone')" class="b-validation") {{ errors.first('phone') }}
              .row
                .col-24
                  .form-item
                    label.m-wide Order notes
                    textarea(
                      v-model="booking.comment"
                      rows="3"
                    )

        .b-booking-form
          h3 Enter Card Details
          .b-booking-form-content
            form
              .form-item
                label.m-required Card Number
                input(
                  name="cc.number"
                  data-vv-as="Card Number"
                  type="number"
                  v-model.trim="booking.cc.number"
                  v-validate="'required|numeric|min:16|max:20'"
                )
                span(v-show="errors.has('cc.number')" class="b-validation") {{ errors.first('cc.number') }}
              .row
                .col-24
                  .form-item
                    label.m-required Expiration Date
                    .row
                      .col-14
                        select(
                          name="month"
                          data-vv-as="Month"
                          v-model="month"
                          v-validate="'required'"
                        )
                          option(value="01") 01 - January
                          option(value="02") 02 - February
                          option(value="03") 03 - March
                          option(value="04") 04 - April
                          option(value="05") 05 - May
                          option(value="06") 06 - June
                          option(value="07") 07 - Jule
                          option(value="08") 08 - August
                          option(value="09") 09 - September
                          option(value="10") 10 - October
                          option(value="11") 11 - November
                          option(value="12") 12 - December
                        span(v-show="errors.has('month')" class="b-validation") {{ errors.first('month') }}
                      .col-10
                        select(
                          name="year"
                          data-vv-as="Year"
                          v-model="year"
                          v-validate="'required'"
                        )
                          option(
                            v-for="yearItem in yearList"
                            v-bind:value="yearItem"
                          ) {{ yearItem }}
                        span(v-show="errors.has('year')" class="b-validation") {{ errors.first('year') }}

              .row
                .col-14
                  .form-item
                    label.m-wide.m-required Cardholder Name
                    input(
                      name="cc.name"
                      data-vv-as="Cardholder Name"
                      v-model.trim="booking.cc.name"
                      v-validate="'required'"
                    )
                    span(v-show="errors.has('cc.name')" class="b-validation") {{ errors.first('cc.name') }}

                .col-10
                  .form-item
                    label.m-required Security Code
                    input(
                      name="cc.cvv"
                      data-vv-as="Security Code"
                      v-model="booking.cc.cvv"
                      type="password"
                      v-validate="'required|numeric'"
                    )
                    span(v-show="errors.has('cc.cvv')" class="b-validation") {{ errors.first('cc.cvv') }}

          .b-booking-form-footer Your data is transferred in a secured and encrypted way.

        .b-action
          .button.m-shadow(
            v-on:click="submitForm"
            v-bind:class="{'m-loading': loading}"
          ) Confirm Booking
</template>

<script>
  import axios from '~plugins/axios'

  /**
   * @param this.$router
   */
  export default {
    scrollToTop: true,
    head () {
      return {
        title: `${this.property.name} - iBookingNet`
      }
    },
    data () {
      return {
        booking: {
          name: undefined,
          lastName: undefined,
          guests: 2,
          units: [],
          cc: {
            number: undefined,
            cvv: undefined,
            expiration: undefined
          }
        },
        month: 'Month',
        year: 'Year',
        yearList: [],
        loading: false,
        showErrors: false
      }
    },
    computed: {
      lang () {
        return this.$store.state.lang.lang
      },
      property () {
        return this.$store.state.property
      },
      quote () {
        return this.$store.state.quote
      },
      expiration () {
        return `${this.month}/${this.year}`
      }
    },
    methods: {
      initBooking () {
        this.booking.currency = this.property.details.currency
        this.booking.units.push({})
      },
      submitForm () {
        this.validateForm()
          .then(this.bookProperty)
          .catch(() => {
            this.showErrors = true
          })
      },
      bookProperty () {
        this.showErrors = false
        console.log(this.expiration)
        let component = this
        if (!this.loading) {
          this.loading = true
          this.booking.cc.expiration = this.expiration

          let unit = this.booking.units[0]
          unit.id = this.property.unit.id
          unit.arrivalDate = this.quote.checkIn
          unit.departureDate = this.quote.checkOut
          unit.guests = this.quote.guests
          unit.total = this.quote.total
          this.booking.total = this.quote.total
          unit.guestName = this.booking.name + (this.booking.lastName ? ' ' + this.booking.lastName : '')

          console.log('this.booking', this.booking)

          axios.request({
            url: '/public/bookings',
            data: {
              query: {
                id: this.property.id
              },
              booking: this.booking
            },
            method: 'post'
          })
          .then(response => {
            if (response.data.error) {
              console.log('error', response.data.error)
            } else {
              console.log('success')
              this.$store.commit('completeBooking')
              this.$router.push({
                path: `/${this.lang}/bookings/success`
              })
            }
            component.finishRequest()
          })
          .catch(error => {
            console.error('response error', error)
            component.finishRequest()
          })
        }
      },
      validateForm () {
        return this.$validator.validateAll();
      },
      configYearList () {
        let year = new Date().getFullYear()
        let maxYear = year + 10
        while (year < maxYear) {
          this.yearList.push(year)
          year++
        }
      },
      finishRequest () {
        this.loading = false
      }
    },
    mounted () {
      this.configYearList()
      this.initBooking()
    }
  }
</script>
