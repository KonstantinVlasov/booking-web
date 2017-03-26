<template lang="pug">
  .collapse-item
    .collapse-title(
      v-bind:html=""
    )
    .collapse-content
      slot
</template>

<script>
  import arrowLeft from '~assets/svg/arrow-left.svg'
  import arrowRight from '~assets/svg/arrow-right.svg'

  export default {
    name: 'Slider',
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
      images: null,
      ratio: {
        type: Number,
        'default': 16 / 9
      }
    },
    methods: {
      next () {
        this.setActiveItem(this.activeIndex + 1)
      },
      prev () {
        this.setActiveItem(this.activeIndex - 1)
      },
      setActiveItem (index) {
        if (index >= this.items.length) {
          this.activeIndex = 0
        } else if (index < 0) {
          this.activeIndex = this.items.length - 1
        } else {
          this.activeIndex = index
        }
        let self = this
        this.items.forEach(function (item, index) {
          if (index === self.activeIndex) {
            item.activate()
          } else {
            item.deactivate()
          }
        })
      },
      fitSliderHeight () {
        this.$el.style.height = this.$el.clientWidth / this.ratio + 'px'
      }
    },
    mounted () {
      this.items = this.$children
      this.setActiveItem(0)
      this.fitSliderHeight()
      window.addEventListener('resize', this.fitSliderHeight)
    },
    beforeDestroy () {
      window.removeEventListener('resize', this.fitSliderHeight)
    }
  }
</script>

<style lang="scss">
  .slider {
    position: relative;
    overflow: hidden;
    height: 400px;

    .b-arrow {
      position: absolute;
      top: 50%;
      width: 2.5rem;
      height: 2.5rem;
      line-height: 2.5rem;
      border-radius: 50%;
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
        left: 1rem;
      }
      &.m-next {
        right: 1rem;
      }

      &>svg {
        display: inline-block;
        width: 1rem;
        fill: rgba(255,255,255,0.5);
        vertical-align: middle;
      }
    }
  }
</style>