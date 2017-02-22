'use strict'

const resolve = require('path').resolve
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'iBookingNet',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: 'iBookingNet Web Portal' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/web/public/images/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/web/public/images/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/web/public/images/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '194x194', href: '/web/public/images/favicon-194x194.png' }
    ]
  },
  plugins: [
    '~plugins/config',
    '~plugins/vue2-google-maps',
    '~plugins/element-ui'
  ],
  build: {
    vendor: [
      'axios',
      'moment',
      'vue2-google-maps',
      'element-ui'
    ],
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader'
      })
    }, {
      test: /\.svg$/,
      loader: 'svg-inline-loader',
      exclude: /node_modules/
    }, {
      test: /(.*node_modules)(.*svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: 'imgs/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.(png|jpe?g|gif)$/,
      loader: 'url-loader',
      query: {
        limit: 1000, // 1KO
        name: 'img/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 1000, // 1 KO
        name: 'fonts/[name].[hash:7].[ext]'
      }
    }],
    extend (config) {
      config.plugins = config.plugins || []
      config.plugins.push(new ExtractTextPlugin('styles.css'))
    }
  },
  router: {
  //   extendRoutes (routes) {
  //     routes.push({
  //       name: 'extend-search',
  //       path: '/search/location/:location?',
  //       component: 'pages/search.vue'
  //     })
  //   },
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  /*
  ** Global CSS
  */
  // css: ['~assets/css/public.scss'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' }
}
