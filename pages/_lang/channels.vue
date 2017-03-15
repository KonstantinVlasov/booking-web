<style lang="scss" scoped>
  @import "~assets/css/mixins.scss";

  .c-container {
    @include clearfix;
  }
  .b-channel {
    width: 20%;
    float: left;
    padding: 1.5rem;
    img {
      background-color: white;
      padding: 0.75rem;
      transition: box-shadow 0.3s ease;
    }

    @media (max-width: 60rem) {
      padding: 0.75rem;
      img {
        padding: 0.5rem;
      }
    }
    @media (max-width: 50rem) {
      width: 25%;
    }
    @media (max-width: 40rem) {
      width: 33%;
    }
    @media (max-width: 30rem) {
      width: 33%;
      padding: 0.5rem;
      img {
        padding: 0.25rem;
      }
    }
  }
  .info {
    font-weight: 300;
    color: #9aabb1;
    margin: 10px 0 0;
  }
  .button {
    margin-top: 50px;
  }
</style>

<template lang="pug">
  .page
    .b-page-header
      .b-page-header-background
        img(src="/web/public/images/landing-bg-2000.jpg")
      h1 Distribution Network

    .b-page-content

      .b-page-section
        .container
          h2 Best Channels
          .b-channel(v-for="channel in channels.best")
            img(v-bind:src="channel")

        br
        br
        br
        .container
          h2 Other Portals
          .b-channel(v-for="channel in channels.other")
            img(v-bind:src="channel")
</template>
<script>
  export default {
    scrollToTop: true,
    head () {
      return {
        title: 'iBookingNet Channels'
      }
    },
    data ({ req }) {
      return {
        channels: {
          best: [
            '/web/public/images/channels/booking.png',
            '/web/public/images/channels/airbnb.png',
            '/web/public/images/channels/expedia.png',
            '/web/public/images/channels/flipkey.png',
            '/web/public/images/channels/tripadvisor.png',

            '/web/public/images/channels/homeaway.jpg',
            '/web/public/images/channels/bridge-roomorama.png',
            '/web/public/images/channels/migoa.png',
            '/web/public/images/channels/holidu.png',
            '/web/public/images/channels/muchosol.png',
          ],
          other: [
            '/web/public/images/channels/abritel.png',
            '/web/public/images/channels/alugue-temporada.png',
            '/web/public/images/channels/apartime-barcelona.png',
            '/web/public/images/channels/atraveo.png',
            '/web/public/images/channels/bemate.png',

            '/web/public/images/channels/bookabach.png',
            '/web/public/images/channels/bungalow.png',
            '/web/public/images/channels/casamundo.png',
            '/web/public/images/channels/casaspain.png',
            '/web/public/images/channels/citiesreference.png',

            '/web/public/images/channels/club-villamar.png',
            '/web/public/images/channels/edomizil.png',
            '/web/public/images/channels/escapade.png',
            '/web/public/images/channels/espagne-du-nord-au-sud.png',
            '/web/public/images/channels/españabreaks.png',

            '/web/public/images/channels/eurorelais.png',
            '/web/public/images/channels/fewo-direkt.png',
            '/web/public/images/channels/flat4day.png',
            '/web/public/images/channels/france-du-nord-au-sud.png',
            '/web/public/images/channels/friendly-rentals.png',

            '/web/public/images/channels/holidaylettings.png',
            '/web/public/images/channels/homelidays.png',
            '/web/public/images/channels/hosting-holidays.png',
            '/web/public/images/channels/hotels.png',
            '/web/public/images/channels/hotwire.png',

            '/web/public/images/channels/housetrip.png',
            '/web/public/images/channels/iberimo.png',
            '/web/public/images/channels/kyero.png',
            '/web/public/images/channels/la-comunity.png',
            '/web/public/images/channels/locasun.png',

            '/web/public/images/channels/magicstay.png',
            '/web/public/images/channels/niumba.png',
            '/web/public/images/channels/only-apartments.png',
            '/web/public/images/channels/owners-direct.png',
            '/web/public/images/channels/rentthesun.png',

            '/web/public/images/channels/rivieran.png',
            '/web/public/images/channels/ski-du-nord-au-sud.png',
            '/web/public/images/channels/spain-holiday.png',
            '/web/public/images/channels/tourico-holidays.png',
            '/web/public/images/channels/traum-ferien-wohnungen.png',

            '/web/public/images/channels/travelopo.png',
            '/web/public/images/channels/vacationhomerentals.png',
            '/web/public/images/channels/vacation-rentals.png',
            '/web/public/images/channels/venere.png',
            '/web/public/images/channels/villapartner.png',

            '/web/public/images/channels/villas.png',
            '/web/public/images/channels/villatrips.png',
            '/web/public/images/channels/vrbo.png',
            '/web/public/images/channels/waytostay.png',
            '/web/public/images/channels/wimdu.png',
          ]
        }
      }
    },
    head () {
      return {
        title: `iBookingNet Channels`
      }
    }
  }
</script>
