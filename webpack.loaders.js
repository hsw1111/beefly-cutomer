var path = require('path');
const cmd = process.argv.join(' ');
const publicPath = cmd.indexOf('production') > 0 ? '../' : './';

function assetsPath(name, dir) {
	let basename = path.basename(name);
	let basedir = path.join(__dirname, 'src', dir);
	let p = path.join(dir, name.replace(basename, '').replace(basedir, ''), '[name].[hash:7].[ext]');
	p = p.replace(/\\/g, '/');
	return p
}

module.exports = [
	{
		test: /\.jsx?$/,
		exclude: /(node_modules|bower_components|public\/)/,
		loader: "babel-loader"
	},
	{
		test: /\.css$/,
		loaders: ['style-loader', 'css-loader?importLoaders=1'],
		exclude: ['node_modules']
	},
	{
		test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
		use: [{
			loader: 'url-loader',
			options: {
				limit: 1000,
				publicPath,
				name: (name) => assetsPath(name, 'images')
			}
		}]
	},
	{
		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
		use: [{
			loader: 'url-loader',
			options: {
				limit: 1000,
				publicPath,
				name: (name) => assetsPath(name, 'fonts')
			}
		}]
	}
];
