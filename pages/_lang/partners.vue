<style lang="scss">
  @import "~assets/css/vars.scss";

  .partners {
    .b-info {
      @media (max-width: 30rem) {
        display: none;
      }
    }
    .b-about {
      [class^="col-"] {
        @media (max-width: 30rem) {
          margin-left: 0;
          width: 100%
        }
      }
    }
    .b-network {
      [class^="col-"] {
        @media (max-width: 30rem) {
          width: 100%;
        }
      }
    }
    .b-faq {
      [class^="col-"] {
        @media (max-width: 30rem) {
          width: 100%;
        }
      }
    }
    .b-price {
      [class^="col-"] {
        @media (max-width: 50rem) {
          width: 50%;
        }
        @media (max-width: 30rem) {
          width: 100%;
        }
      }
    }
  }
</style>

<template lang="pug">
  .page.partners
    .b-page-header
      .b-page-header-background.m-dark
        img(src="/web/public/images/landing-bg-2000.jpg")
      h1 Generate more bookings with cloud-based distribution platform
      p.b-info Automatically synchronize listings, prices, and calendars on the leading platforms
        br
        | Expand your market reach... with just one click!


    .b-page-content
      .b-page-section
        .container.m-short
          .b-about
            h4 Little about us
            h2 What is iBookingNet?
            p iBookingNet Channel Manager serves as an excellent communication bridge between your business and the distribution network. It gets all the information from you and transmits it to hundreds of channels.
            br
            .row
              .col-16.m-offset-4
                img(src="/web/public/images/schema.png")

            br
            br

            .row
              .col-16.m-offset-4
                ul
                  li Real Time Two-way Communication
                  li Automatically update all channels when a booking is made on any portal
                  li Reflect real-time availability on channels

      .b-page-section.m-facture
        .container
          .b-network
            h4 Channels
            h2 Vacation rental distribution network
            p iBookingNet connects your vacation rental with some of the largest distribution channels in the world. By utilizing the iBookingNet platform you have access to as many channels as you want. It’s simple and effective.

            .row
              .col-8
                h3 Increase Revenue
                p By listing your vacation rental properties on various channels, you can now be exposed to millions of travelers, thus generating more bookings and more revenue!

              .col-8
                h3 Only One Single Contract
                p iBookingNet has eliminated the need to individually contract with each individual channel. Our platform manages all the contracting and financial transactions on your behalf.

              .col-8
                h3 Automatically Update All of Your Channels
                p iBookingNet will automatically update your entire inventory’s rates, availability & calendars, specials and promotions on all of your channels.


      .b-page-section
        .container
          .b-faq
            h4 information
            h2 Frequently asked questions
            .row
              .col-12
                h3 Why should property managers and owners use iBookingNet?
                p iBookingNet makes is easy for management professionals to list their vacation homes, RV parks campgrounds, and short-term rentals in the places travel agencies and real estate websites use to search and book vacation rentals.

              .col-12
                h3 Where do my vacation rentals appear?
                p Once vacation rental listings are synchronized, imported, or added to iBookingNet they appear in your choice of distribution channels. Standard choices include online travel websites, travel agencies and real estate websites, plus a growing list of additional options.

            .row
              .col-12
                h3 Who can list vacation rentals with iBookingNet?
                p Property managers and owners can list supported types of vacation rentals on iBookingNet. Generally, all that is required is signing up for iBookingNet and transferring inventory from a management system or entering listing information directly into iBookingNet.

              .col-12
                h3 When should I update my iBookingNet listings?
                p It’s best to update listings whenever there is a change to rates and availability or if something has changed at the property that would be important to a guest. When using iBookingNet with property management integration, updates will automatically synchronize. Otherwise, you should login to iBookingNet directly and make updates as frequently as desired.

            .row
              .col-12
                h3 What types of vacation rentals are supported?
                p The types of vacation rentals supported continue to grow. At this time, iBookingNet supports vacation homes, RV parks, campgrounds, and short-term rentals. Contact us if you have a different type of vacation rental you would like to add to iBookingNet.

              .col-12
                h3 How much does it cost to use iBookingNet?
                p There is no cost to signup for iBookingNet and it’s free to try. The only time you pay anything is when a listing is booked using iBookingNet and you are charged a low service fee for each booking. This approach is sometimes called “pay for performance” and is risk free.


      .b-page-section.m-facture
        .container
          .b-price
            h4 Costs
            h2 Friendly Pricing

            .row
              .col-6
                p Customize your distribution channels based on the commission you would like to pay.
              .col-6
                p No monthly set up fee or convenience fee required. You only pay a small success commission for every booking generated.
              .col-6
                p Property managers have the option to decide if they want to be the merchant of record or have the channels be the merchant of record.
              .col-6
                p We manage the financial transactions for you.

      .b-page-section.m-facture.m-divider
        .container
          .panel.m-landing
            h4 Information
            h2 Contact Us
            contact-us
</template>

<script>
import ContactUs from '~components/landings/ContactUs.vue'

export default {
  scrollToTop: true,
  components: {
    ContactUs
  },
  head () {
    return {
      title: 'Working with iBookingNet'
    }
  }
}
</script>
