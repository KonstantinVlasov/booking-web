'use strict'

const ibookingnetTax = 1.08

function addTax (number, options) {
  let places = 0
  let tax = ibookingnetTax
  if (options) {
    places = options.places || places
    tax = options.places || tax
  }
  return round(number * tax, places)
}

function round (number, places = 2) {
  return +(Math.round(+(number + 'e+' + places)) + 'e-' + places)
}

export default {
  addTax,
  round
}
