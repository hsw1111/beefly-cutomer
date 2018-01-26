var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpackConfig = require('./webpack.config');
var env = require('./src/js/env');
var uuid = require('uuid');
var hash = uuid.v1().replace(/-/g, '').substring(0, 10);

loaders.push({
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: 'css-loader?sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader!sass-loader?outputStyle=expanded'
	}),
	exclude: ['node_modules']
});

module.exports = {
	entry: {
		'index': './src/frame/index.js',
		'login': './src/frame/login.js',
		'module': './src/index.jsx'
	},
	output: {
		publicPath: './',
		path: path.join(__dirname, 'public'),
		filename: 'js/[name].' + hash + '.js',
		chunkFilename: 'js/[name].' + hash + '.js'
	},
	resolve: webpackConfig.resolve,
	externals: webpackConfig.externals,
	module: {
		loaders
	},
	plugins: [
		// new WebpackCleanupPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new ExtractTextPlugin({
			filename: 'css/[name].' + hash + '.css',
			allChunks: true
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_console: env.name === 'production',
				drop_debugger: env.name === 'production'
			},
			sourceMap: false,
			output: {comments: false}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
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
