import Vue from 'vue'
import VeeValidate from 'vee-validate'

const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fields',
  delay: 0,
  locale: 'en',
  dictionary: null,
  strict: true,
  enableAutoClasses: true,
  classNames: {
    touched: 'm-touched', // the control has been blurred
    untouched: 'm-untouched', // the control hasn't been blurred
    valid: 'm-valid', // model is valid
    invalid: 'm-invalid', // model is invalid
    pristine: 'm-pristine', // control has not been interacted with
    dirty: 'm-dirty' // control has been interacted with
  }
}

Vue.use(VeeValidate, config)