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
        name="name"
        placeholder="Name"
        data-vv-as="Name"
        v-model.trim="name"
        v-validate="'required'"
      )
      span(v-show="errors.has('name')" class="b-validation") {{ errors.first('name') }}
    .form-item
      input(
        name="email"
        placeholder="Email"
        data-vv-as="Email"
        v-model.trim="email"
        v-validate="'required'"
      )
      span(v-show="errors.has('email')" class="b-validation") {{ errors.first('email') }}
    .form-item
      input(
        name="phone"
        placeholder="Phone"
        data-vv-as="Phone"
        v-model.trim="phone"
        v-validate="'required'"
      )
      span(v-show="errors.has('phone')" class="b-validation") {{ errors.first('phone') }}
    .form-item
      textarea(
        v-model="comment"
        rows="5"
        placeholder="Message"
      )
    br
    .button(
      v-on:click="submitForm"
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
      submitForm () {
        this.validateForm()
          .then(this.sendRequest)
          .catch(() => {
            this.showErrors = true
          })
      },
      validateForm () {
        return this.$validator.validateAll()
      },
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
