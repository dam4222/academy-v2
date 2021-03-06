const webpack       = require('webpack');
const path          = require('path');

const assetsDir   = path.join(__dirname, 'public/assets');
const vendorsDir  = path.join(__dirname, 'src/app/vendors');
const srcInclude  = path.join(__dirname, 'src/app');
const indexFile   = path.join(__dirname, 'src/app/index.js');

const config = {
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    indexFile
  ],
  output: {
    path:       assetsDir,
    filename:   'bundle.js',
    publicPath: '/public/assets/'
  },
  module: {
    rules: [
      {
        test:     /\.jsx?$/,
        include:  srcInclude,
        exclude:  [vendorsDir],
        loaders:  ['react-hot-loader/webpack', 'babel-loader']
      },
      {
        test: /\.css$/,
        use:  [
          'style-loader',
          {loader: 'css-loader', options: { importLoaders: 1 }},
          'postcss-loader'
        ],
        exclude: /flexboxgrid/
      },
      {
        test:  /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          'sass-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules',
        include: /flexboxgrid/
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif)(\?\S*)?$/,
        use: [
          {
            loader:  'url-loader',
            options: {
              limit: 100000,
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    getImplicitGlobals(),
    setNodeEnv()
  ]
};
/*
* here using hoisting so don't use `var NAME = function()...`
*/
function getImplicitGlobals() {
  return new webpack.ProvidePlugin({
    $:      'jquery',
    jQuery: 'jquery',
    jquery: 'jquery'
  });
}

function setNodeEnv() {
  return new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('dev')
    }
  });
}

module.exports = config;
