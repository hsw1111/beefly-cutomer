"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "3000";

loaders.push({
	test: /\.scss$/,
	loaders: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader', 'sass-loader'],
	exclude: ['node_modules']
});

module.exports = {
	entry: {
		'index': './src/frame/index.js',
		'login': './src/frame/login.js',
		'module': ['react-hot-loader/patch', './src/index.jsx']
	},
	devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
	output: {
		publicPath: '/',
		path: path.join(__dirname, 'public'),
		filename: 'js/[name].bundle.js',
		chunkFilename: 'js/[name].bundle.js'
	},
	externals: {
		"react": "React",
		"react-dom": "ReactDOM",
		"react-router": "ReactRouter",
		"react-router-dom": "ReactRouterDOM",
		"jquery": "jQuery",
		"lodash": "_",
		"jeselvmo": "Jeselvmo"
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		loaders
	},
	devServer: {
		contentBase: './public',
		// do not print bundle build stats
		noInfo: true,
		// enable HMR
		hot: true,
		// embed the webpack-dev-server runtime into the bundle
		inline: true,
		// serve index.html in place of 404 responses to allow HTML5 history
		historyApiFallback: true,
		port: PORT,
		host: HOST
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin({
			filename: 'css/[name].css',
			allChunks: true
		}),
		new DashboardPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/frame/index.html',
			chunks: ['index']

		}),
		new HtmlWebpackPlugin({
			filename: 'login.html',
			template: './src/frame/login.html',
			chunks: ['login']
		}),
		new HtmlWebpackPlugin({
			filename: 'module.html',
			template: './src/template.html',
			chunks: ['module']
		})
	]
};
