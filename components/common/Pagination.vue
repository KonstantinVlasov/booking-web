<style lang="scss">
  @import '~assets/css/vars';

  .pagination {
    display: inline-block;
    position: relative;
    height: 1.75rem;

    .b-arrow {
      width: 2.5rem;
      height: 2.5rem;
      line-height: 2.5rem;
      background-color: rgba(0,0,0,0.15);
      text-align: center;
      margin-top: -0.5rem;
      color: white;
      cursor: pointer;
      transition: 0.3s all ease;

      &:hover {
        background-color: rgba(0,0,0,0.3);
      }
      &.m-prev {
      }
      &.m-next {
      }
    }

    .b-page {
      display: inline-block;
      width: 1.75rem;
      height: 1.75rem;
      line-height: 1.75rem;
      font-size: 0.875rem;
      background-color: white;
      border: 1px solid #dde;
      border-right: none;
      vertical-align: top;
      transition: 0.3s all ease;
      cursor: pointer;

      &:first-child {
        border-radius: 3px 0 0 3px;
      }
      &:last-child {
        border-right: 1px solid #dde;
        border-radius: 0 3px 3px 0;
      }
      &.m-active {
        color: white;
        background-color: $color-blue;
        border: 1px solid $color-blue;

        & + .b-page {
          border-left: none;
        }
      }

      &>svg {
        display: inline-block;
        height: 0.75rem;
        fill: $color-font;
        margin-top: 0.45rem;
        vertical-align: top;
      }
    }
  }
</style>

<template lang="pug">
  .pagination
    .b-page.m-prev(
      v-on:click="prev"
      v-html="icons.arrowLeft"
    )
    .b-page(
      v-for="p in pages"
      v-on:click="setPage(p)"
      v-bind:class="{'m-active': p === page}"
    ) {{ p }}
    .b-page.m-next(
      v-on:click="next"
      v-html="icons.arrowRight"
    )
</template>

<script>
  import arrowLeft from '~assets/svg/arrow-left.svg'
  import arrowRight from '~assets/svg/arrow-right.svg'

  export default {
    name: 'pagination',
    data () {
      return {
        icons: {
          arrowLeft,
          arrowRight
        },
        items: [],
        activeIndex: 0
      }
    },
    props: {
      size: {
        default: 20
      },
      page: {
        default: 1
      },
      total: {
        default: 20
      }
    },
    computed: {
      pages () {
        return Math.ceil(this.total / this.size)
      }
    },
    methods: {
      next () {
        if (this.page < this.pages) {
          this.setPage(this.page+1)
        }
      },
      prev () {
        if (this.page > 1) {
          this.setPage(this.page-1)
        }
      },
      setPage (page) {
        this.$emit('change', page)
      }
    }
  }
</script>
