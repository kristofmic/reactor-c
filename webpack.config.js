const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const target = process.env.npm_lifecycle_event;

const buildPlugin = new webpack.DefinePlugin({
  'process.env': {
    BROWSER: JSON.stringify(true),
    BABEL_ENV: JSON.stringify(true),
  },
});

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
});

const common = {
  entry: {
    client: path.join(__dirname, 'client', 'entry.jsx'),
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/public/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss', '.sass'],
    alias: {
      client: path.join(__dirname, 'client'),
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => ([
                  require('autoprefixer')({ browsers: ['last 3 versions'] }),
                ]),
              },
            },
          ],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => ([
                  require('autoprefixer')({ browsers: ['last 3 versions'] }),
                ]),
              },
            },
          ],
        }),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader:
        'url-loader?limit=10000&mimetype=application/font-woff&name=font/[hash].[ext]&publicPath=/public/',
      },
      {
        test: /\.(ttf|otf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?|(woff)$/,
        loader: 'file-loader?name=font/[hash].[ext]&publicPath=/public/',
      },
      {
        test: /\.(jpg|gif|png|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=img/[hash].[ext]&publicPath=/public/',
      },
    ],
  },
  plugins: [buildPlugin],
};

const dev = {
  output: {
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].bundle.js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      minChunks: ({ resource }) => /node_modules/.test(resource)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['runtime']
    }),
    new ExtractTextPlugin('css/[name].bundle.css'),
    new ManifestPlugin({}),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: './bundle_analysis.html',
      openAnalyzer: false,
    }),
  ],
};

const dist = {
  output: {
    filename: 'js/[name].bundle.min.[chunkhash].js',
    chunkFilename: 'js/[name].bundle.min.[chunkhash].js',
  },
  plugins: [
    productionPlugin,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({}),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name;
      }
      return chunk.mapModules(m => path.relative(m.context, m.request)).join('_');
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      minChunks: ({ resource }) => /node_modules/.test(resource)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['runtime'],
    }),
    new ExtractTextPlugin('css/[name].bundle.min.[chunkhash].css'),
    new ManifestPlugin({}),
  ],
};

if (target === 'build:dist') {
  module.exports = merge(common, dist);
} else {
  module.exports = merge(common, dev);
}
