<template>
  <!--
    Based on SweetModal for Vue.js https://github.com/adeptoas/sweet-modal-vue
  -->
  <div :class="overlay_classes" v-show="is_open" v-on:click.prevent="_onOverlayClick">
    <div :class="modal_classes">
      <div class="sweet-box-actions">
        <!-- Custom Actions -->
        <slot name="box-action"></slot>

        <!-- Close Button -->
        <div class="sweet-action-close" v-on:click="close" v-if="!hideCloseButton">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="#292c34"></path></svg>
        </div>
      </div>

      <!-- Title: Housing the title and tabs, if no title is present -->
      <div class="sweet-title" v-if="has_title || has_tabs">
        <!-- Tabs but no title -->
        <template v-if="has_tabs && !has_title">
          <ul class="sweet-modal-tabs">
            <li v-for="tab in tabs" :class="_getClassesForTab(tab)">
              <a href="#" v-on:click="_changeTab(tab)">
                <div class="valign">
                  <span v-if="tab.icon" v-html="tab.icon" class="icon"></span>
                  <span class="title">{{ tab.title }}</span>
                </div>
              </a>
            </li>
          </ul>
        </template>

        <!-- Title -->
        <template v-if="has_title">
          <h2 v-if="title" v-html="title"></h2>
          <slot name="title"></slot>
        </template>
      </div>

      <!-- Tabs: If title AND tabs are present -->
      <ul class="sweet-modal-tabs" v-if="has_title && has_tabs">
        <li v-for="tab in tabs" :class="_getClassesForTab(tab)">
          <a href="#" v-on:click="_changeTab(tab)">
            <div class="valign">
              <span v-if="tab.icon" v-html="tab.icon" class="icon"></span>
              <span class="title">{{ tab.title }}</span>
            </div>
          </a>
        </li>
      </ul>

      <!-- Content: Wrapper -->
      <div class="sweet-content" ref="content">
        <!-- Icon: Error -->
        <div class="sweet-modal-icon sweet-modal-error" v-if="icon === 'error'" ref="icon_error">
					<span class="sweet-modal-x-mark">
						<span class="sweet-modal-line sweet-modal-left"></span>
						<span class="sweet-modal-line sweet-modal-right"></span>
					</span>
        </div>

        <!-- Icon: Warning -->
        <div class="sweet-modal-icon sweet-modal-warning" v-if="icon === 'warning'" ref="icon_warning">
          <span class="sweet-modal-body"></span>
          <span class="sweet-modal-dot"></span>
        </div>

        <!-- Icon: Info -->
        <div class="sweet-modal-icon sweet-modal-info" v-if="icon === 'info'" ref="icon_info"></div>

        <!-- Icon: Success -->
        <div class="sweet-modal-icon sweet-modal-success" v-if="icon === 'success'" ref="icon_success">
          <span class="sweet-modal-line sweet-modal-tip"></span>
          <span class="sweet-modal-line sweet-modal-long"></span>
          <div class="sweet-modal-placeholder"></div>
          <div class="sweet-modal-fix"></div>
        </div>

        <!-- Actual Content -->
        <div class="sweet-content-content" v-if="$slots.default">
          <slot></slot>
        </div>
      </div>

      <!-- Buttons -->
      <div class="sweet-buttons" v-if="$slots.button">
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SweetModal',

    props: {
      title: {
        type: String,
        required: false,
        'default': ''
      },

      overlayTheme: {
        type: String,
        required: false,
        'default': 'light'
      },

      modalTheme: {
        type: String,
        required: false,
        'default': 'light'
      },

      blocking: {
        type: Boolean,
        required: false,
        'default': false
      },

      icon: {
        type: String,
        required: false,
        'default': ''
      },

      hideCloseButton: {
        type: Boolean,
        required: false,
        'default': false
      }
    },

    mounted () {
      this.tabs = this.$children.filter(c => c.cmpName && c.cmpName === 'tab')

      if (this.has_tabs) {
        this.currentTab = this._changeTab(this.tabs[0])
      }

      document.addEventListener('keyup', this._onDocumentKeyup)
    },

    beforeDestroy () {
      document.removeEventListener('keyup', this._onDocumentKeyup)
    },

    data () {
      return {
        visible: false,
        is_open: false,
        is_bouncing: false,
        tabs: []
      }
    },

    computed: {
      has_title () {
        return this.title || this.$slots.title
      },

      has_tabs () {
        return this.tabs.length > 0
      },

      has_content () {
        return this.$slots.default
      },

      current_tab () {
        return this.tabs.filter(t => t.active === true)[0]
      },

      overlay_classes () {
        return [
          'sweet-modal-overlay',
          'theme-' + this.overlayTheme,
          'sweet-modal-clickable',
          {
            'is-visible': this.visible,
            blocking: this.blocking
          }
        ]
      },

      modal_classes () {
        return [
          'sweet-modal',
          'theme-' + this.modalTheme,
          {
            'has-title': this.has_title,
            'has-tabs': this.has_tabs,
            'has-content': this.has_content,
            'has-icon': this.icon,
            'is-visible': this.visible,
            'sweet-alert': (this.icon && !this.has_tabs) || (!this.icon && !this.title && !this.$slots.title),
            bounce: this.is_bouncing
          }
        ]
      }
    },

    methods: {
      /**
       * Open the dialog
       * Emits an event 'open'
       */
      open () {
        this.is_open = true
        this._animateIcon()

        setTimeout(() => { this.visible = true }, 30)
        this.$emit('open')
      },

      /**
       * Close the dialog
       * Emits an event 'close'
       */
      close () {
        this.visible = false

        setTimeout(() => { this.is_open = false }, 300)
        this.$emit('close')
      },

      /**
       * Bounce the modal.
       */
      bounce () {
        this.is_bouncing = true

        setTimeout(() => { this.is_bouncing = false }, 330)
      },

      /**********************
       INTERNAL METHODS
       **********************/

      _onOverlayClick (event) {
        if (!event.target.classList || event.target.classList.contains('sweet-modal-clickable')) {
          if (this.blocking) {
            this.bounce()
          } else {
            this.close()
          }
        }
      },

      _onDocumentKeyup (event) {
        if (event.keyCode === 27) {
          if (this.blocking) {
            this.bounce()
          } else {
            this.close()
          }
        }
      },

      _changeTab (tab) {
        this.tabs.map(t => { t.active = t === tab })
        this.currentTab = tab
      },

      _getClassesForTab (tab) {
        return [
          {
            active: tab.active,
            disabled: tab.disabled
          }
        ]
      },

      _animateIcon () {
        if (!this.icon) return

        switch (this.icon) {
          case 'success':
            setTimeout(() => {
              this._applyClasses(this.$refs.icon_success, {
                '': [ 'animate' ],
                '.sweet-modal-tip': [ 'animateSuccessTip' ],
                '.sweet-modal-long': [ 'animateSuccessLong' ]
              })
            }, 80)

            break

          case 'warning':
            this._applyClasses(this.$refs.icon_warning, {
              '': [ 'pulseWarning' ],
              '.sweet-modal-body': [ 'pulseWarningIns' ],
              '.sweet-modal-dot': [ 'pulseWarningIns' ]
            })

            break

          case 'error':
            setTimeout(() => {
              this._applyClasses(this.$refs.icon_error, {
                '': [ 'animateErrorIcon' ],
                '.sweet-modal-x-mark': [ 'animateXMark' ]
              })
            }, 80)

            break
        }
      },

      /**
       * Apply classes from the classMap to $ref or children of $ref, a native
       * DOMElement.
       *
       * ClassMap:
       * {'selector': [ 'class1', 'class2', ... ]}
       *
       * Empty Selector selects $ref.
       *
       * @param DOMNode $ref     Element to apply classes to or children of that element
       * @param Object  classMap Class Map which elements get which classes (see doc)
       */
      _applyClasses ($ref, classMap) {
        for (let cl in classMap) {
          let classes = classMap[cl]
          let $el

          if (cl === '') {
            $el = $ref
          } else {
            $el = $ref.querySelector(cl)
          }

          $el.classList.remove(...classes)
          $el.classList.add(...classes)
        }
      }
    }
  }
</script>

<style lang="scss">

  .sweet-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;

    overflow-y: auto;
    z-index: 9001;

    font-family: Roboto, Arial, sans-serif;
    font-size: 14px;

    -webkit-font-smoothing: antialiased;

    // Theming
    background: rgba(#000, 0.6);

    // Animation
    opacity: 0;
    transition: opacity 0.3s;
    transform: translate3D(0, 0, 0);
    -webkit-perspective: 500px;

    &.is-visible {
      opacity: 1;
    }
  }

  .sweet-modal {
    background: #fff;
    box-shadow: 0 8px 46px rgba(#000, 0.08),
                0 2px  6px rgba(#000, 0.03);

    position: absolute;
    top: 50%;
    left: 50%;
    // transform: translate(-50%, -50%); // Done by the animation later

    width: 80%;
    max-width: 640px;

    border-radius: 2px;

    .sweet-box-actions {
      position: absolute;
      top: 12px;
      right: 12px;

      .sweet-action-close {
        display: inline-block;
        cursor: pointer;

        color: #222C38;
        text-align: center;

        width: 42px;
        height: 42px;
        line-height: 42px;

        border-radius: 50%;
        background-color: transparent;

        transition: 0.3s all ease;

        svg {
          width: 24px;
          height: 24px;

          vertical-align: middle;
          margin-top: 0;

          fill: currentColor;
          path,
          polygon,
          rect,
          circle {
            fill: currentColor;
          }
        }

        &:hover {
          background: #039BE5;
          color: #fff;
        }
      }
    }

    .sweet-title {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;

      height: 64px;
      line-height: 64px;

      border-bottom: 1px solid #eaeaea;

      padding: {
        left: 32px;
        right: 64px;
      }

      h2 {
        margin: 0;
        padding: 0;

        font-weight: 500;
        font-size: 22px;
      }
    }

    ul.sweet-modal-tabs {
      padding: 0;
      list-style-type: none;

      display: flex;
      align-items: center;
      width: calc(100% - 42px);
      height: 100%;

      margin: 0 0 0 -32px;

      li {
        display: block;
        height: 100%;

        a {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;

          display: flex;
          align-items: center;

          max-width: 128px;

          padding: {
            left: 20px;
            right: 20px;
          }

          color: #222C38;
          text-decoration: none;
          text-align: center;

          height: 100%;

          span.title {
            display: block;
          }

          span.icon {
            display: block;
            line-height: 1.0;

            svg, img {
              width: 16px;
              height: 16px;

              fill: currentColor;

              path,
              polygon,
              rect,
              circle {
                fill: currentColor;
              }
            }
          }

          span.icon + span.title {
            line-height: 1.0;
            margin-top: 8px;
          }
        }

        &:first-child a {
          padding-left: 32px;
        }

        &.active a {
          font-weight: 600;
          color: #039BE5;
        }

        &.disabled a {
          cursor: default;
          pointer-events: none;
          color: #999;
        }
      }
    }

    &.has-tabs:not(.has-title) {

      .sweet-title {
        height: 84px;
        line-height: 84px;
      }
    }

    &.has-tabs.has-title {

      ul.sweet-modal-tabs {
        width: 100%;
        height: 48px;

        margin: 0;
        border-bottom: 1px solid #eaeaea;

        li a {
          margin-top: -4px;

          span.icon {
            display: inline-block;

            svg, img {
              vertical-align: middle;

              margin: {
                top: -2px;
                right: 8px;
              }
            }
          }

          span.title {
            display: inline-block;
          }
        }
      }
    }

    .sweet-content {
      display: flex;
      align-items: center;

      padding: {
        left: 32px;
        right: 32px;
        top: 24px;
        bottom: 24px;
      }

      line-height: 1.5;

      .sweet-content-content {
        flex-grow: 1;
      }

      .sweet-modal-tab:not(.active) {
        display: none;
      }

      .sweet-modal-icon {
        margin-bottom: 36px;
      }
    }

    .sweet-buttons {
      text-align: right;

      padding: {
        left: 20px;
        right: 20px;
        top: 12px;
        bottom: 12px;
      }
    }

    .sweet-content + .sweet-buttons {
      border-top: 1px solid #eaeaea;
    }

    // Special Styles
    &.sweet-alert {

      .sweet-content {
        display: block;

        text-align: center;
        font-size: 16px;

        padding: {
          top: 64px;
          bottom: 64px;
        }
      }
    }

    &.has-tabs.has-icon .sweet-content {
      padding: {
        top: 32px;
        bottom: 32px;
      }

      .sweet-content-content {
        padding-left: 32px;
      }

      .sweet-modal-icon {
        margin-bottom: 0;
      }
    }

    &:not(.has-content) {

      .sweet-modal-icon {
        margin-bottom: 0;
      }
    }

    // Animation
    transform: scale(0.9) translate(calc(-50% - 32px), -50%);
    opacity: 0;

    transition: {
      property: transform, opacity;
      duration: 0.3s;
      delay: 0.05s;
      timing-function: cubic-bezier(0.52, 0.02, 0.19, 1.02);
    }

    .sweet-buttons,
    .sweet-content {
      opacity: 0;

      transition: {
        property: transform, opacity;
        duration: 0.3s;
        delay: 0.09s;
        timing-function: cubic-bezier(0.52, 0.02, 0.19, 1.02);
      }
    }

    .sweet-content {
      transform: translateY(-8px);
    }

    .sweet-buttons {
      transform: translateY(16px);
    }

    &.is-visible {
      transform: translate(-50%, -50%);
      opacity: 1;

      .sweet-buttons,
      .sweet-content {
        transform: none;
        opacity: 1;
      }
    }

    &.bounce {
      animation-name: bounce;
      animation-duration: 0.3s;
      animation-iteration-count: 2;
      animation-direction: alternate;
    }

    // Responsiveness
    @media screen and (min-width: 601px) {
      // Bouncing animation
      @keyframes bounce {
        0% {
          transform: scale(1) translate(-50%, -50%);
        }

        50% {
          transform: scale(1.02) translate(calc(-50% + 8px), -50%);
        }

        100% {
          transform: scale(1) translate(-50%, -50%);
        }
      }
    }

    @media screen and (max-width: 600px) {

      & {
        width: 100%;
        height: 100vh;

        left: 0;
        top: 0;

        transform: scale(0.9);

        &.is-visible {
          transform: none;
        }
      }

      .sweet-buttons {
        position: absolute;
        bottom: 0;
        left: 0;

        width: 100%;
      }
    }
  }
  .sweet-modal-icon {
    position: relative;

    width: 80px;
    height: 80px;

    border: 4px solid gray;
    border-radius: 50%;

    margin: auto;
    padding: 0;

    box-sizing: content-box;

    &.sweet-modal-error {
      border-color: #F44336;

      .sweet-modal-x-mark {
        position: relative;
        display: block;
      }

      .sweet-modal-line {
        display: block;
        position: absolute;
        top: 37px;
        height: 5px;
        width: 47px;

        background-color: #F44336;
        border-radius: 2px;

        &.sweet-modal-left {
          transform: rotate(45deg);
          left: 17px;
        }

        &.sweet-modal-right {
          transform: rotate(-45deg);
          right: 16px;
        }
      }
    }

    &.sweet-modal-warning {
      border-color: #FF9800;

      .sweet-modal-body { // Exclamation mark body
        position: absolute;
        width: 5px;
        height: 47px;
        left: 50%;
        top: 10px;

        margin-left: -2px;

        border-radius: 2px;
        background-color: #FF9800;
      }
      .sweet-modal-dot { // Exclamation mark dot
        position: absolute;
        left: 50%;
        bottom: 10px;
        width: 7px;
        height: 7px;

        margin-left: -3px;

        border-radius: 50%;
        background-color: #FF9800;
      }
    }

    &.sweet-modal-info {
      border-color: #039BE5;

      &::before { // i-letter body
        content: '';
        position: absolute;
        width: 5px;
        height: 29px;
        left: 50%;
        bottom: 17px;

        margin-left: -2px;

        border-radius: 2px;
        background-color: #039BE5;
      }

      &::after { // i-letter dot
        content: '';
        position: absolute;
        width: 7px;
        height: 7px;
        top: 19px;

        margin-left: -3px;

        border-radius: 50%;
        background-color: #039BE5;
      }
    }

    &.sweet-modal-success {
      border-color: #4CAF50;

      &::before, &::after { // Emulate moving circular line
        content: '';
        position: absolute;

        border-radius: 40px;

        width: 60px;
        height: 120px;

        background: white;

        transform: rotate(45deg);
      }

      &::before {
        border-radius: 120px 0 0 120px;

        top: -7px;
        left: -33px;

        transform: rotate(-45deg);

        -webkit-transform-origin: 60px 60px;
        transform-origin: 60px 60px;
      }

      &::after {
        border-radius: 0 120px 120px 0;

        top: -11px;
        left: 30px;

        transform: rotate(-45deg);

        -webkit-transform-origin: 0 60px;
        transform-origin: 0 60px;
      }

      .sweet-modal-placeholder { // Ring
        box-sizing: content-box;
        position: absolute;
        left: -4px;
        top: -4px;
        z-index: 2;

        width: 80px;
        height: 80px;

        border: 4px solid rgba(#4CAF50, 0.2);
        border-radius: 50%;
      }

      .sweet-modal-fix { // Hide corners left from animation
        position: absolute;
        left: 28px;
        top: 8px;
        z-index: 1;

        width: 7px;
        height: 90px;
        background-color: white;

        transform: rotate(-45deg);
      }

      .sweet-modal-line {
        display: block;
        position: absolute;
        z-index: 2;

        height: 5px;
        background-color: #4CAF50;
        border-radius: 2px;

        &.sweet-modal-tip {
          width: 25px;

          left: 14px;
          top: 46px;

          transform: rotate(45deg);
        }

        &.sweet-modal-long {
          width: 47px;

          right: 8px;
          top: 38px;

          transform: rotate(-45deg);
        }
      }
    }

    &.sweet-modal-custom {
      border-radius: 0;
      border: none;

      background: {
        size: contain;
        position: center center;
        repeat: no-repeat;
      }
    }
  }
</style>