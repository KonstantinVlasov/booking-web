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
  import SearchForm from '~components/landings/SearchForm.vue'
  import PropertyItem from '~components/property/PropertyItem.vue'

  import { mapState, mapActions } from 'vuex'

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
      store.dispatch('extendSearchQuery', query)
      return store.dispatch('searchProperties')
    },
    data () {
      return {
        loading: false
      }
    },
    computed: {
      ...mapState({
        lang: state => state.lang.lang,
        query: 'query',
        search: 'search'
      })
    },
    methods: {
      ...mapActions([
        'extendSearchQuery',
        'searchProperties'
      ]),
      selectPage (page) {
        this.loading = true
        this.extendSearchQuery({page})

        this.$router.push({
          query: this.query
        })

        this.searchProperties()
          .then(() => {
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
    }
  }
</script>
