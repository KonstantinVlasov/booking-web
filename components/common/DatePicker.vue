<template lang="pug">
  input.date-picker()
</template>

<script>
  export default {
    name: 'DatePicker',
    data () {
      return {
        calendar: undefined
      }
    },
    props: {
      type: 'div',
      dateFormat: {
        type: String,
        default: 'd'
      }
    },
    mounted () {
      let options = {
        disableMobile: true,
        dateFormat: this.dateFormat,
        defaultDate: new Date()
      }
      this.calendar = new Flatpickr(this.$el, options)
    },
    destroyed () {
      if (this.calendar) {
        this.calendar.destroy()
        this.calendar = null
      }
    },
  }
</script>

<style lang="scss">

</style>
