<style lang="scss">
  .date-picker-landing {
    position: relative;

    .b-date-picker-day {
      width: 3.5rem;
      @media (max-width: 40rem) {
        width: 2rem;
      }
    }

    .b-date-picker-month {
      width: 3.5rem;
      font-size: 1.25rem;
      height: 1.75rem;
      vertical-align: bottom;
      @media (max-width: 40rem) {
        padding-top: 0.25rem;
      }
    }

    .b-date-picker-arrow {
      margin-left: 0.25rem;
      display: inline-block;
      transform: rotate(90deg);
      width: 0.675rem;
    }
  }
</style>

<template lang="pug">
  .date-picker-landing(v-on:click="open")
    input.date-picker.b-date-picker-day(
      readonly
      v-bind:value="day"
    )
    input.date-picker.b-date-picker-month(
      readonly
      v-bind:value="month"
    )
    .b-date-picker-arrow(
      v-html="icons.arrowRight"
    )
</template>

<script>
  import moment from 'moment'
  import arrowRight from '~assets/svg/arrow-right.svg'

  export default {
    name: 'DatePicker',
    data () {
      return {
        icons: {
          arrowRight
        },
        calendarDay: undefined,
        calendarMonth: undefined
      }
    },
    props: [
      'value'
    ],
    computed: {
      moment () {
        return moment(this.value)
      },
      day () {
        return this.moment.format('DD')
      },
      month () {
        return this.moment.format('/ MMM')
      }
    },
    methods: {
      open () {
        this.calendar.open()
      },
      onChange (date) {
        this.$emit('input', date[0])
      }
    },
    mounted () {
      let dayOptions = {
        dateFormat: 'd',
        defaultDate: this.value.toDate(),
        minDate: moment.utc().add(3, 'days').startOf('day').toDate(),
        maxDate: moment.utc().add(365, 'days').startOf('day').toDate(),
        appendTo: this.$el,
        static: true,
        disableMobile: true,
        onChange: this.onChange
      }
      this.calendar = new Flatpickr(this.$el, dayOptions)
    },
    destroyed () {
      if (this.calendar && this.calendar.destroy) {
        this.calendar.destroy()
        this.calendar = null
      }
    },
  }
</script>
