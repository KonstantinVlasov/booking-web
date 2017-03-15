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
      type: 'div'
    },
    mounted () {
      let options = {}
      this.calendar = new Flatpickr(this.$el, options)
    },
    destroyed () {
      this.calendar.destroy()
      this.calendar = null
    },
  }
</script>

<style lang="scss">

</style>
