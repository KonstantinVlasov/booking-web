<style scoped lang="scss">
  .contact-us {
    text-align: center;

    &.el-form {
      margin: 0 auto;
      max-width: 18rem;
    }
  }
</style>

<template lang="pug">
  el-form.contact-us(:label-position="'top'")
    el-form-item
      el-input(
        v-model="name"
        placeholder="Name"
      )
    el-form-item
      el-input(
        v-model="email"
        placeholder="Email"
      )
    el-form-item
      el-input(
        v-model="email"
        placeholder="Phone"
      )
    el-form-item
      el-input(
        type="textarea"
        v-bind:rows="3"
        v-model="comment"
        placeholder="Message"
      )
    br
    br
    el-button Request Info
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        email: '',
        name: '',
        phone: '',
        comment: ''
      }
    }
  }
</script>
