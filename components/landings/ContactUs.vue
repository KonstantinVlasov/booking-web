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
        v-model="email"
        placeholder="Phone"
        required
      )
    .form-item
      textarea(
        v-model="comment"
        placeholder="Message"
      )
    br
    .button(v-on:click="sendRequest") Request Info
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
    },
    methods: {
      sendRequest () {
        if (this.email && this.name && this.phone) {
          console.log('success');
          axios.post('/api/public/bookingcom', {
            name: this.name,
            email: this.email,
            phone: this.phone
          }, {
            withCredentials: true
          })
            .then(function(response) {
              location.href = 'https://join.booking.com/build-group/partner.html?token=&aid=1178542&lang=ru';
            })
            .catch(function(error) {
              alert(error);
            });

        }
      }
    }
  }
</script>
