<style lang="scss">
  .page-search {
    .b-pagination {
      text-align: center;
    }
  }
</style>

<template lang="pug">
  .page.page-search

    .b-page-content
      .b-page-section.m-facture
        .container
          .panel.m-fit
            search-form.landing-form
          property-item(
            v-for="property in search.docs"
            v-bind:key="property.id"
            v-bind:property="property"
            v-bind:loading="loading"
            v-bind:checkIn="query.checkIn"
          )

          .b-pagination
            pagination(
              v-bind:size="search.limit"
              v-bind:page="query.page"
              v-bind:total="search.total"
              v-on:change="selectPage"
            )
</template>

<script>
  import axios from '~plugins/axios'
  import SearchForm from '~components/landings/SearchForm.vue'
  import PropertyItem from '~components/property/PropertyItem.vue'

  export default {
    scrollToTop: true,
    components: {
      SearchForm,
      PropertyItem
    },
    head () {
      return {
        title: `Search at ${this.query.term} - iBookingNet`
      }
    },
    fetch ({store, query}) {
      store.commit('updateQuery', query)
    },
    asyncData ({store}) {
      return fetchProperties(store.state.query)
    },
    data () {
      return {
        loading: true,
        search: {}
      }
    },
    computed: {
      query () {
        return this.$store.state.query
      }
    },
    methods: {
      selectPage (page) {
        this.updateSearch({page})
      },
      updateSearch (query) {
        let currentQuery = Object.assign({}, this.$route.query)
        Object.assign(currentQuery, query)
        this.$router.push({
          path: 'search',
          query: currentQuery
        })
      }
    },
    watch: {
      $route () {
        this.loading = true
        this.$store.commit('updateQuery', this.$route.query)
        fetchProperties(this.query)
          .then(data => {
            this.search = data.search
            this.loading = false
          })
          .catch(error => {
            this.loading = false
            alert(error)
          })
      }
    }
  }

  function fetchProperties (query) {
    return axios
      .request({
        url: '/public/properties/search',
        method: 'get',
        params: query
      })
      .then(response => {
        return {
          loading: false,
          search: response.data.result || {}
        }
      })
      .catch(error => {
        console.error(error)
        return {
          loading: false,
          search: {}
        }
      })
  }
</script>
