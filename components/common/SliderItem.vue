<style lang="scss">
  .slider-item {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);

    img {
      width: 100%;
    }
  }
</style>

<template lang="pug">
  .slider-item(
    v-show="active"
  )
    slot
</template>

<script>
  export default {
    name: 'SliderItem',
    data () {
      return {
        active: false
      }
    },
    methods: {
      activate () {
        this.active = true
      },
      deactivate () {
        this.active = false
      }
    },
    mounted () {
    }
  }
</script>
