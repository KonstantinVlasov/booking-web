<style lang="scss">
  .booking-page {

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
  .booking-page
    .b-page-section.m-facture
      .container
        .b-booking-form
          h3 Enter Your Details
          .b-booking-form-content
            form
              .row
                .col-12
                  .form-item
                    label First Name
                    input(
                      required
                      v-model.trim="booking.name"
                    )
                .col-12
                  .form-item
                    label Last Name
                    input(
                      v-model.trim="booking.lastName"
                    )
              .row
                .col-12
                  .form-item
                    label Email
                    input(
                      type="email"
                      required
                      v-model.trim="booking.email"
                    )
                .col-12
                  .form-item
                    label Phone
                    input(
                      v-model.trim="booking.phone"
                    )
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
                label Card number
                input(
                  required
                  v-model.trim="booking.cc.number"
                  type="number"
                )
              .row
                .col-24
                  .form-item
                    label Expiration Date
                    .row
                      .col-14
                        select(
                          required
                          v-model="month"
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
                      .col-10
                        select(
                          required
                          v-model="year"
                        )
                          option(
                            v-for="yearItem in yearList"
                            v-bind:value="yearItem"
                          ) {{ yearItem }}

              .row
                .col-14
                  .form-item
                    label.m-wide Cardholder Name
                    input(
                      required
                      v-model.trim="booking.cc.name"
                    )

                .col-10
                  .form-item
                    label Security Code
                    input(
                      required
                      v-model="booking.cc.cvv"
                      type="password"
                    )

          .b-booking-form-footer Your data is transferred in a secured and encrypted way.

        .b-action
          .button.m-shadow(
            v-on:click="bookProperty"
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
        loading: false
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
      bookProperty () {
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
          unit.guestName = this.booking.name + ' ' + this.booking.lastName

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
