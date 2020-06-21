//var webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: [
        '@babel/polyfill',
        "./src/index.js",
    ],
    mode: "development",
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, "public"),
        publicPath: "/",
        filename: "js/[name].bundle.js",
        chunkFilename: '[name].js',
      },
  // Adding babel loader to compile our javascript and jsx files
  module: {
          rules: [
              //js loader
              {
                test: /\.(js|jsx)$/,
                include: [
                    path.resolve(__dirname, "src")
                  ],
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: { 
                    presets: [
                        "@babel/env"
                    ] 
                }
              },
              //css loader
              {
                test: /\.css$/,
                use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: '/css',
                    },
                    },                    
                //'style-loader',
                'css-loader'
                ],
              },
              //image loader
              {
                test: /\.(png|svg|jpe?g|gif)$/i,
                loader:'file-loader',
                options: {
                    outputPath: 'images',
                },                
              },
          ]
      },
      resolve: {
        modules: [
            "node_modules",
            path.resolve(__dirname, "client")
          ],
        extensions: ['.js', '.jsx', '.scss'],
      },
      devServer: {
        contentBase: path.resolve(__dirname, "public"),
        historyApiFallback: true
      },      
      plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
        }),      
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Gerald',
            inject: false,
            'meta': {
                'charset': 'utf-8',
                'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
                // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                'theme-color': '#000000'
                // Will generate: <meta name="theme-color" content="#4285f4">
            },            
            templateContent: ({htmlWebpackPlugin}) => `
            <!doctype html> 
              <html>
                <head>
                  ${htmlWebpackPlugin.tags.headTags}
                  <link
                  rel="stylesheet"
                  href="https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css"
                />
            
                <script src="//cdn.jsdelivr.net/chartist.js/latest/chartist.min.js"></script>
                <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
                />
                <link
                  href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"
                />
                <link
                  rel="stylesheet"
                  href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                />            
                  </head>
                <body>
                <div id="root"></div>
                <noscript> You need to enable JavaScript to run this app. </noscript>
                  ${htmlWebpackPlugin.tags.bodyTags}
                </body>
              </html>
            `
        })
    ],
};
