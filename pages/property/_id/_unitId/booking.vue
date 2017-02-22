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
      .b-page-overlay.m-fit
        check-availability.landing-form

      .container
        .b-booking-form
          h3 Enter Your Details
          .b-booking-form-content
            el-form(:label-position="'top'" v-bind:inline="true")
              el-form-item(label="First Name")
                el-input(
                  v-model="booking.name"
                )
              el-form-item(label="Last Name")
                el-input(
                  v-model="booking.lastName"
                )
              el-form-item(label="Email")
                el-input(
                  v-model="booking.email"
                )
              el-form-item(label="Phone")
                el-input(
                  v-model="booking.phone"
                )
              el-form-item.m-wide(label="Order notes")
                el-input(
                  v-model="booking.comment"
                  type="textarea"
                  v-bind:rows="2"
                )

        .b-booking-form
          h3 Enter Card Details
          .b-booking-form-content
            el-form(:label-position="'top'" v-bind:inline="true")
              el-form-item.m-wide(label="Card number")
                el-input(
                  v-model="booking.cc.number"
                  type="number"
                )
              el-form-item(label="Expiration Date")
                el-date-picker(
                  v-model="booking.cc.expiration"
                  format="MM/DD"
                  type="month"
                )
              el-form-item(label="Security Code")
                el-input(
                  v-model="booking.cc.cvv"
                  type="number"
                )

          .b-booking-form-footer Your data is transferred in a secured and encrypted way.
        .b-action
          el-button.m-shadow Confirm Booking
</template>

<script>
  import axios from 'axios'
  import CheckAvailability from '~components/property/CheckAvailability.vue'

  export default {
    scrollToTop: true,
    components: {
      CheckAvailability
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
