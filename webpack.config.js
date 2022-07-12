// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals');

// const TypedocWebpackPlugin = require('typedoc-webpack-plugin')
//

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.ts",
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, "dist"),
    chunkFilename: '[name].js',
    filename: '[name].js'
  },
  target: "node",
  externals: [ nodeExternals() ],
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    new CleanWebpackPlugin(),
    
    new CopyWebpackPlugin({patterns:[
      {
          from: './.env.development',
          to: './'
      }
  ]}),
  new WebpackShellPluginNext({
    onBuildStart:{
      scripts: ['echo "make route ... "','node precompile.js $(pwd)/src/route']
  },
    onBuildEnd:{
      scripts: ['echo "Starting development server..."','npm run run:dev']
  }}),
//   new TypedocWebpackPlugin({
//     out: 'docs'
// })
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
  stats: {
    colors: true,
    modules: false,
    reasons: true,
    errorDetails: true
  },
  watch: !isProduction,
  
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
