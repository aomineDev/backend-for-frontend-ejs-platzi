const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const dotenv = require('dotenv');

dotenv.config();

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-source-map',
  mode: process.env.NODE_ENV,
  entry: {
    app: path.resolve(__dirname, 'src/frontend/index.js'),
  },
  output: {
    path: isProd ? path.join(process.cwd(), './src/server/public') : '/',
    publicPath: '/',
    filename: isProd ? 'js/[name]-[hash].js' : 'js/[name].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    minimize: true,
    minimizer: isProd ? [new TerserPlugin()] : [],
    splitChunks: {
      chunks: 'async',
      name: true,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          reuseExistingChunk: true,
          priority: 1,
          filename: isProd ? 'js/vendor-[hash].js' : 'js/vendor.js',
          enforce: true,
          test(module, chunks) {
            const name = module.nameForCondition && module.nameForCondition();
            return chunks.some((chunk) => chunk.name !== 'vendors' && /[\\/]node_modules[\\/]/.test(name));
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(s*)css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(jpg|png|webp|svg|gif|mp4|webm|woff|eot|ttf)$/i,
        use: {
          'loader': 'file-loader',
          options: {
            name: 'assets/[hash].[ext]',
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer,
        ],
      },
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? 'css/styles-[hash].css' : 'css/styles.css',
    }),
    isProd ? new CompressionPlugin({
      test: /\.js$|\.css$/i,
      filename: '[path].gz[query]',
    }) : false,
    isProd ? new ManifestPlugin() : false,
  ],
};
