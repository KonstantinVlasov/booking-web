<style lang="scss">
  @import "../../assets/css/vars.scss";

  .calendar {
    max-width: 60rem;

    .b-calendar-content {
      position: relative;
      display: inline-block;
      box-shadow: 1px 0 0 #eee, -1px 0 0 #eee, 0 1px 0 #eee, 0 -1px 0 #eee, 0 3px 13px rgba(0,0,0,.08);
      border-radius: 2px;
      overflow: hidden;
    }

    .b-flatpickr-input {
      display: inline-block;
      width: 33.3%;
      @media (max-width: 60rem) {
        width: 50%;
      }
      @media (max-width: 40rem) {
        width: 100%;
      }
      input {
        display: none;
      }
      &.m-fp1 {
        padding: 0 0.2rem 0 0;
        .flatpickr-calendar {
          border-right: 1px solid #eee;
        }
        @media (max-width: 60rem) {
          padding: 0 0.15rem 0 0;
        }
        @media (max-width: 40rem) {
          padding: 0;
        }
      }
      &.m-fp2 {
        padding: 0 0.1rem;
        .flatpickr-calendar {
          border-left: 1px solid #eee;
          border-right: 1px solid #eee;
        }
        @media (max-width: 60rem) {
          padding: 0 0 0 0.15rem;
        }
        @media (max-width: 40rem) {
          display: none;
        }
      }
      &.m-fp3 {
        padding: 0 0 0 0.2rem;
        .flatpickr-calendar {
          border-left: 1px solid #eee;
        }
        @media (max-width: 60rem) {
          display: none;
        }
      }
    }
    .flatpickr-calendar {
      width: 100%;
      box-shadow: none;
      border: none;
      border-radius: 0;
      &:before, &:after {
        display: none;
      }
    }
    .flatpickr-days {
      width: 100%;
    }
    .flatpickr-day.disabled {
      color: rgba(0,0,0,0.25);
    }
    .flatpickr-calendar.inline {
      display: inline-block;
    }
    .flatpickr-day {
      background-color: $color-green;
      border-color: white;

      &:hover, &:focus {
        background: $color-blue;
        border-color: white;
      }

      &.inRange {
        background-color: $color-green;
        border-color: white;
        box-shadow: none;
        &.nextMonthDay, &.prevMonthDay {
          background: none;
          color: transparent;
          border-color: white;
        }
      }
      &.endRange, &.startRange {
        background: $color-green;
        color: #404848;
        &.selected {
            background: $color-blue;
            color: #404848;
        }
      }
    }
    span.flatpickr-day.endRange, span.flatpickr-day.startRange {
      border-color: white;
    }
    .flatpickr-day.m-no-arrival:not(.prevMonthDay):not(.nextMonthDay) {
      background-color: lighten($color-green, 15%);
      border-color: white;
    }
    .flatpickr-day.m-disabled:not(.prevMonthDay):not(.nextMonthDay) {
      background-color: #eee;
      border-color: white;
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
      .b-disabled {
        background: white;
      }
    }
    .flatpickr-day.prevMonthDay, .flatpickr-day.nextMonthDay {
      color: transparent;
      border-color: white;
      &:hover, &:focus {
        background: none;
        border-color: white;
      }
    }
    span.flatpickr-day.today:not(.selected) {
      border-color: darken($color-green, 20%);
      &:hover, &:focus {
        background: $color-blue;
        border-color: white;
      }
      &.prevMonthDay, &.nextMonthDay {
        border-color: white;
      }
    }
    .flatpickr-current-month span.cur-month {
      font-weight: 300;
    }
    .flatpickr-next-month, .flatpickr-prev-month {
      display: none !important;
    }
    .b-arrow {
      position: absolute;
      z-index: 1000;
      top: 0.675rem;
      width: 14px;
      cursor: pointer;
      fill: #3c3f40;

      &:hover {
        fill: lighten(#3c3f40, 20%);
      }
      &.m-left {
        left: 0.675rem;
      }
      &.m-right {
        right: 0.675rem;
      }
    }

    $legend-size: 1.75rem;
    .b-legend {
      font-size: 14px;
      height: $legend-size;
      line-height: $legend-size;
      margin-top: 0.5rem;
      color: $color-dark;
    }
    .b-legend-item {
      display: inline-block;
      margin-left: 1rem;
      padding-left: $legend-size + 0.25rem;
      height: $legend-size;
      line-height: $legend-size;
      position: relative;
      &:before {
        content: '1';
        position: absolute;
        top: 0;
        left: 0;
        text-align: center;
        width: $legend-size;
        height: 100%;
        background: $color-green;
      }
      &.m-no-arrival {
        &:before {
          background-color: lighten($color-green, 15%);
        }
      }
      &.m-disable {
        &:before {
          background-color: #eee;
        }
      }
    }
  }
</style>

<template lang="pug">
  .calendar
    .b-calendar-content
      .b-arrow.m-left(
        v-html="icons.arrowLeft"
        v-on:click="prevMonths()"
      )
      .b-arrow.m-right(
        v-html="icons.arrowRight"
        v-on:click="nextMonths()"
      )
      .b-flatpickr-input.m-fp1
        input
      .b-flatpickr-input.m-fp2
        input
      .b-flatpickr-input.m-fp3
        input

    .b-legend Legend
      .b-legend-item.m-active available
      .b-legend-item.m-no-arrival no arrival date
      .b-legend-item.m-disable not available

    .b-calendar-form
      div {{ state.startDate }}
      div {{ state.endDate }}
</template>

<script>
import moment from 'moment'
import arrowLeft from '~assets/svg/arrow-left.svg'
import arrowRight from '~assets/svg/arrow-right.svg'

export default {
  name: 'Calendar',
  data () {
    return {
      icons: {
        arrowLeft,
        arrowRight
      },
      state: {
        status: 'empty',
        startedIndex: undefined,
        startDate: undefined,
        endDate: undefined
      },
      calendars: []
    }
  },
  computed: {
    startDay () {
      return moment(this.vacancy.startDay)
    }
  },
  mounted () {
    this.calendars.push(this.getCalendar({index: 0, startDay: this.startDay, $el: this.$el, vacancy: this.vacancy}))
    this.calendars.push(this.getCalendar({index: 1, startDay: this.startDay, $el: this.$el, vacancy: this.vacancy}))
    this.calendars.push(this.getCalendar({index: 2, startDay: this.startDay, $el: this.$el, vacancy: this.vacancy}))
    this.calendars[1].changeMonth(1)
    this.calendars[2].changeMonth(2)
  },
  destroyed () {
    this.calendars.forEach(calendar => {
      calendar.destroy()
      calendar = null
    })
  },
  methods: {
    prevMonths () {
      this.calendars.forEach(calendar => {
        calendar.changeMonth(-1)
      })
    },
    nextMonths () {
      this.calendars.forEach(calendar => {
        calendar.changeMonth(1)
      })
    },
    getCalendar,
    syncCalendars
  },
  props: {
    vacancy: {
      'default' () {
        return {}
      }
    }
  }
}

let syncInProgress = false
function syncCalendars (dates, index, updateMonth) {
  if (syncInProgress) {
    return
  }
  let self = this
  syncInProgress = true
  self.calendars.forEach(function (calendar, i) {
    if (i !== index) {
      calendar.setDate(dates)
      if (updateMonth) {
        calendar.changeMonth(i - index)
      } else if (i - index > 1) {
        calendar.changeMonth(1)
      } else if (i - index < -1) {
        calendar.changeMonth(-1)
      } else if (i - index === 1) {
        calendar.changeMonth(2)
      }
    }
  })
  setTimeout(function () {
    syncInProgress = false
  }, 50)
}
function getCalendar ({index, startDay, $el, vacancy}) {
  let self = this
  let state = self.state
  let options = {
    inline: true,
    mode: 'range',
    onValueUpdate (dObj, dStr, fp, dayElem) {
      if (syncInProgress) {
        return
      }

      if (state.status === 'start') {
        state.status = 'complete'
        state.startDate = moment(dObj[0]).format('YYYY-MM-DD')
        state.endDate = moment(dObj[dObj.length - 1]).format('YYYY-MM-DD')
      } else if (state.status === 'empty' || state.status === 'complete') {
        state.status = 'start'
        state.startDate = moment(dObj[dObj.length - 1]).format('YYYY-MM-DD')
        state.endDate = undefined
        state.startedIndex = index
      }

      let updateMonth = true
      if (state.startedIndex < index) {
        updateMonth = false
      }

      self.syncCalendars(dObj, index, updateMonth)
    },
//    onReady (dObj, dStr, fp) {
//      document.querySelectorAll('.numInput.cur-year').forEach(function (elem) {
//        elem.addEventListener('scroll', function(e) {
//          console.info('scroll1')
//        })
//        elem.onscroll = function(e) {
//          console.info('scroll2')
//        }
//      })
//    },
    onDayCreate (dObj, dStr, fp, dayElem) {
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

  return new window.Flatpickr($el.querySelector(`.m-fp${index + 1} input`), options)
}
</script>
