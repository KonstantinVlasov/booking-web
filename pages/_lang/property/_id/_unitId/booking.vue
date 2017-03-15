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

      .el-form-item {
        width: 50%;
        margin-right: 0;
        margin-bottom: 1.5rem;
        padding: 0 0.5rem;

        &.m-wide {
          width: 100%;
        }
      }

      .el-date-editor.el-input {
        width: 100%;
      }
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
                      v-model="booking.name"
                    )
                .col-12
                  .form-item
                    label Last Name
                    input(
                      v-model="booking.lastName"
                    )
              .row
                .col-12
                  .form-item
                    label Email
                    input(
                      v-model="booking.email"
                    )
                .col-12
                  .form-item
                    label Phone
                    input(
                      v-model="booking.phone"
                    )
              .form-item
                label.m-wide Order notes
                textarea(
                  v-model="booking.comment"
                )

        .b-booking-form
          h3 Enter Card Details
          .b-booking-form-content
            form
              .m-wide
                label Card number
                input(
                  v-model="booking.cc.number"
                  type="number"
                )
              label Expiration Date
              date-picker(
                v-model="booking.cc.expiration"
                format="MM/DD"
              )
              label Security Code
              input(
                v-model="booking.cc.cvv"
                type="number"
              )

          .b-booking-form-footer Your data is transferred in a secured and encrypted way.
        .b-action
          .button.m-shadow Confirm Booking
</template>

<script>
  import axios from 'axios'

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
          checkIn: new Date(),
          checkOut: new Date(),
          guests: 2,
          cc: {
            expiration: undefined
          }
        }
      }
    },
    computed: {
      property () {
        return this.$store.state.property
      },
    },
    methods: {
      quoteProperty () {
        this.processing = true;
      }
    }
  }
</script>
