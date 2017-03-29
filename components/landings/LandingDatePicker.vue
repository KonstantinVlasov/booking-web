<style lang="scss">
  @import "../../assets/css/vars.scss";

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

    &.m-vacancy + .flatpickr-calendar {
      .flatpickr-day {
        background-color: $color-green;

        &:hover, &:focus {
          background: $color-blue;
          border-color: white;
        }

        &.disabled {
          background-color: #f6f6f6;
          border-color: white;
          color: rgba(0,0,0,0.25);
        }
        &.m-no-arrival {
          background-color: lighten($color-green, 15%);
          border-color: white;
        }
        &.m-disabled {
          background-color: #f6f6f6;
          border-color: white;
        }
        &.today {
          border-color: white;
        }
        &.selected {
          border-color: darken($color-green, 20%);
          &:hover, &:focus {
            background: $color-blue;
            border-color: white;
          }
          &.prevMonthDay, &.nextMonthDay {
            border-color: white;
          }
        }
      }
      .b-disabled {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        cursor: default;
      }
      .prevMonthDay, .nextMonthDay {
        color: transparent;
        border-color: white;
        &:hover, &:focus {
          background: none;
          border-color: white;
        }
        .b-disabled {
          background: white;
        }
      }
    }
  }
</style>

<template lang="pug">
  .date-picker-landing(
    v-on:click="open"
    v-bind:class="{'m-vacancy': vacancy}"
  )
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

  /**
   * @param this.vacancy.availability
   * @param this.vacancy.changeOver
   */
  export default {
    name: 'DatePicker',
    data () {
      return {
        icons: {
          arrowRight
        },
        calendar: undefined
      }
    },
    props: [
      'value',
      'vacancy'
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
      },
      startDay () {
        return this.vacancy ? moment(this.vacancy.startDay) : moment()
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
    watch: {
      value () {
        this.calendar.setDate(this.value.toDate())
      }
    },
    mounted () {
      let options = {
        dateFormat: 'd',
        defaultDate: this.value.toDate(),
        minDate: moment().add(3, 'days').startOf('day').toDate(),
        maxDate: moment().add(365, 'days').startOf('day').toDate(),
        appendTo: this.$el,
        'static': true,
        disableMobile: true,
        onChange: this.onChange
      }
      let vacancy = this.vacancy
      let startDay = this.startDay
      if (vacancy && vacancy.availability && vacancy.changeOver) {
        options.onDayCreate = function (dObj, dStr, fp, dayElem) {
          let date = moment(dayElem.dateObj)
          let days = date.diff(startDay, 'days')
          let state
          let changeOver

          if (days >= 0) {
            state = vacancy.availability[days]
            changeOver = vacancy.changeOver[days]
          }

          if (!state || state === 'N') {
            dayElem.classList.add('m-disabled')
            dayElem.innerHTML += "<span class='b-disabled'></span>"
          }
          if (!changeOver || changeOver !== 'C') {
            dayElem.classList.add('m-no-arrival')
            dayElem.innerHTML += "<span class='b-disabled'></span>"
          }

          if (dayElem.classList.contains('prevMonthDay') ||
            dayElem.classList.contains('nextMonthDay')
          ) {
            dayElem.innerHTML += "<span class='b-disabled'></span>"
          }
        }
      }
      this.calendar = new window.Flatpickr(this.$el, options)
    },
    destroyed () {
      if (this.calendar && this.calendar.destroy) {
        this.calendar.destroy()
        this.calendar = null
      }
    }
  }
</script>
