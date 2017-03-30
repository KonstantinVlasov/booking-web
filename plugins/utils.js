'use strict'

import moment from 'moment'

const ibookingnetTax = 1.08

const checkIn = moment().add(4, 'days').startOf('day').toDate()
const checkOut = moment().add(11, 'days').startOf('day').toDate()

const defaultDates = {
  checkIn,
  checkOut
}

/**
 * @param number
 * @param options
 * @param options.tax
 * @param options.places optional
 */
function addTax (number, options) {
  let places = 0
  let tax = ibookingnetTax
  if (options) {
    places = options.places || places
    tax = options.tax || tax
  }
  return round(number * tax, places)
}

function round (number, places = 2) {
  return +(Math.round(+(number + 'e+' + places)) + 'e-' + places)
}

function getVacancyDay (vacancy, date) {
  let startDay = moment(vacancy.startDay)
  let days = moment(date).diff(startDay, 'days')

  if (days >= 0) {
    return {
      date,
      availability: vacancy.availability ? vacancy.availability[days] : 'N',
      flexBooking: vacancy.flexBooking ? vacancy.flexBooking[days] : 'N',
      changeOver: vacancy.changeOver ? vacancy.changeOver[days] : 'X',
      minStay: vacancy.minStay ? vacancy.minStay.split(',')[days] : 7
    }
  } else {
    return {}
  }
}

export default {
  addTax,
  round,
  getVacancyDay,
  defaultDates
}
