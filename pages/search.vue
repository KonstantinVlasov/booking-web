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
            search-form.landing-form(v-bind:query="query")
          property-item(
            v-for="property in search.docs"
            v-bind:property="property"
            v-bind:loading="loading"
            v-bind:checkIn="query.checkIn"
          )

          .b-pagination
            el-pagination(
              layout="prev, pager, next"
              v-bind:page-size="search.limit"
              v-bind:current-page="query.page"
              v-bind:total="search.total"
              v-on:current-change="selectPage"
            )
</template>

<script>
  import config from '~plugins/config'
  import axios from '~plugins/axios'
  import SearchForm from '~components/landings/SearchForm.vue'
  import PropertyItem from '~components/property/PropertyItem.vue'

  function fetchProperties (query) {
    query.page = query.page ? parseInt(query.page) : 1
    return axios
      .request({
        url: '/public/properties/search',
        method: 'get',
        params: query
      })
      .then(response => {
        return {
          query: {
            term: query.term,
            page: query.page,
            guests: query.guests,
            checkIn: new Date(query.checkIn),
            checkOut: new Date(query.checkOut)
          },
          loading: false,
          search: response.data.result || {}
        }
      })
      .catch(error => {
        console.log(error)
        return {
          query: {
            term: query.term,
            page: query.page,
            guests: query.guests,
            checkIn: new Date(query.checkIn),
            checkOut: new Date(query.checkOut)
          },
          loading: false,
          search: {}
        }
      })
  }

  export default {
    scrollToTop: true,
    components: {
      SearchForm,
      PropertyItem
    },
    data (context) {
      let query = context.query
      return fetchProperties(query)
    },
    created () {
      console.log('created', this.query)
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
        fetchProperties(this.$route.query)
          .then(data => {
            this.query = data.query
            this.search = data.search
            this.loading = false
          })
          .catch(error => {
            this.loading = false
            alert(error)
          })
        console.log('watch', this.$route)
      }
    }
  }
</script>
