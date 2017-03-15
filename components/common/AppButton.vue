<style lang="scss">
  @import '~assets/css/vars';

  .app-button {
    display: inline-block;
    height: 2.5rem;
    line-height: 2.5rem;
    color: white;
    background: $color-blue;
    border-color: $color-blue;
    border-radius: 2px;
    letter-spacing: 2px;
    font-size: 0.75rem;
    text-transform: uppercase;
    padding: 0 1.75rem;
    font-family: "Calibri", "Helvetica", Roboto, Arial, sans-serif;
    transition: 0.3s all ease;
  }
</style>

<template lang="pug">
  .app-button button
</template>

<script>
  export default {
    name: 'AppButton',
    props: {
      type: 'div'
    }
  }
</script>
