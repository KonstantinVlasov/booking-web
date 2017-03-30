'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const env = require('./env.js')

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'iBookingNet - Holiday Homes & Villas, Luxury Cottages & Apartments to Rent',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', hid: 'description', content: 'Book holiday houses, cottages, luxury villas & apartment online through ibooking.net. Visit our website and find the holiday rentals all around the world.' },
      { name: 'keywords', hid: 'keywords', content: 'Holiday Homes, Holiday Houses, Cottage Holidays, Holiday Apartment, Villa Holidays, Luxury Holiday Cottages, Holiday Homes Online, Book Holiday Accommodation, Holiday Home Rentals, Holiday Apartment Rental, Holiday Cottages Rental, Holiday Villa Rental, Holiday Cottages To Rent, Holiday Home To Rent, Holiday Villa To Rent, Holiday Apartments To Rent, Book Holiday Cottages, Book Holiday Villa, Book Villa Online, Book Apartment Online, holiday villas, Holiday Accommodation Apartments To Rent, holiday villas, holiday accommodation, Book Holiday Accommodation' },
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
    '~plugins/axios',
    '~plugins/utils',
    '~plugins/common-components',
    '~plugins/i18n',
    {src: '~plugins/ga.js', ssr: false},
    {src: '~plugins/flatpickr', ssr: false},
    {src: '~plugins/vue2-google-maps', ssr: false}
  ],
  performance: {
    gzip: true
  },
  cache: true,
  build: {
    vendor: [
      'axios',
      'moment',
      'babel-polyfill'
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
      config.plugins.push(new webpack.ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(en)$/))
    }
  },
  router: {
    middleware: [
      'i18n',
      'redirects'
    ],
    scrollBehavior: function () {
      return { x: 0, y: 0 }
    }
  },
  loading: {
    color: '#3BAFDA',
    height: '4px'
  }
}
