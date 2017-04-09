<style scoped lang="scss">
  .contact-us {
    text-align: center;
    margin: 0 auto;
    max-width: 18rem;
  }
</style>

<template lang="pug">
  form.contact-us
    .form-item
      input(
        v-model="name"
        placeholder="Name"
        required
      )
    .form-item
      input(
        v-model="email"
        placeholder="Email"
        required
      )
    .form-item
      input(
        v-model="phone"
        placeholder="Phone"
        required
      )
    .form-item
      textarea(
        v-model="comment"
        placeholder="Message"
      )
    br
    .button(
      v-on:click="sendRequest"
      v-bind:class="{'m-loading': loading, 'm-disabled': requestSent}"
    ) {{ buttonTitle }}
</template>

<script>
  import axios from '~plugins/axios'

  export default {
    data () {
      return {
        email: '',
        name: '',
        phone: '',
        comment: '',
        loading: false,
        requestSent: false,
        buttonTitle: 'Request Info'
      }
    },
    methods: {
      sendRequest () {
        let component = this
        if (!this.requestSent && this.email && this.name && this.phone) {
          this.loading = true
          axios.post('/public/contactUs', {
            name: this.name,
            email: this.email,
            phone: this.phone,
            comment: this.comment
          }, {
            withCredentials: true
          })
            .then(function () {
              console.info('success contact call')
              component.finishRequest()
            })
            .catch(function (error) {
              console.error(error)
              component.finishRequest()
            })
        }
      },
      finishRequest () {
        this.loading = false
        this.requestSent = true
        this.buttonTitle = 'Request sent'
      }
    }
  }
</script>
