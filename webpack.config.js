const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const autoprefixer = require('autoprefixer');

const target = process.env.npm_lifecycle_event;

const buildPlugin = new webpack.DefinePlugin({
  'process.env': {
    BROWSER: JSON.stringify(true),
    BABEL_ENV: JSON.stringify(true),
  }
});

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
});

const common = {
  name: 'client',
  entry: {
    vendor: [
      'axios',
      'immutable',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux'
    ],
    client: path.join(__dirname, 'client', 'entry.js')
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.scss', '.sass'],
    alias: {
      client: path.join(__dirname, 'client')
    }
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css', 'sass', 'postcss'])
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(['css', 'postcss'])
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=font/[hash].[ext]&publicPath=//d12m2do9qj79ob.cloudfront.net/'
      },
      {
        test: /\.(ttf|otf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?|(woff)$/,
        loader: 'file-loader?name=font/[hash].[ext]&publicPath=//d12m2do9qj79ob.cloudfront.net/'
      },
      {
        test: /\.(jpg|gif|png|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=img/[hash].[ext]&publicPath=//d12m2do9qj79ob.cloudfront.net/'
      },
    ]
  },
  plugins: [
    buildPlugin
  ],
  postcss: [
    autoprefixer({ browsers: ['last 3 versions'] })
  ]
};

const dev = {
  output: {
    filename: 'js/[name].bundle.js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.js'),
    new ExtractTextPlugin('css/[name].bundle.css'),
    new ManifestPlugin({})
  ]
};

const dist = {
  output: {
    filename: 'js/[name].bundle.min.[chunkhash].js',
  },
  plugins: [
    productionPlugin,
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({}),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.bundle.min.[chunkhash].js'),
    new ExtractTextPlugin('css/[name].bundle.min.[chunkhash].css'),
    new ManifestPlugin({})
  ]
};

if (target === 'build:dist') {
  module.exports = merge(common, dist);
} else {
  module.exports = merge(common, dev);
}
