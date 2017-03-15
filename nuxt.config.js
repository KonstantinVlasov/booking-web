'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const env = require('./env.js')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'iBookingNet',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', content: 'iBookingNet Web Portal' },
      { name: 'google-site-verification', content: '-WnyU9ecEyUiL3Zt6HQ0M6hTx1WtJcpFXcQP7B2xknc' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/web/public/images/favicon-16x16.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/web/public/images/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/web/public/images/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '194x194', href: '/web/public/images/favicon-194x194.png' }
    ]
  },
  env,
  plugins: [
    '~plugins/ga.js',
    '~plugins/axios',
    '~plugins/common-components',
    '~plugins/flatpickr',
    '~plugins/i18n',
    '~plugins/vue2-google-maps'
  ],
  performance: {
    gzip: true
  },
  build: {
    vendor: [
      'axios',
      'moment'
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
      config.plugins.push(new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/))
    }
  },
  router: {
    middleware: 'i18n',
    scrollBehavior: function (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  },
  loading: {
    color: '#3BAFDA',
    height: '4px'
  }
}
