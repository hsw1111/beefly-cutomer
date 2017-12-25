const path = require('path');
const fs = require('fs');// 加载File System读写模块
const _ = require('lodash');

// 遍历目录中所有文件
const listNativeFiles = (dir) => {
	let children = [];
	try {
		let result = fs.readdirSync(dir);
		if (result) {
			result.forEach(function (filename) {
				let file = path.join(dir, filename);
				let stat = fs.statSync(file);
				if (stat && stat.isDirectory()) {
					children = children.concat(listNativeFiles(file))
				} else {
					if (file.endsWith('.js') || file.endsWith('.jsx')) {
						children.push(file)
					}
				}
			});
		}
	} catch (e) {
		console.log(e.message)
	}

	return children
};

// router files
let files = listNativeFiles('./src/routes');

let components = files.map((f) => {
	f = path.relative(path.join(__dirname, 'src'), path.join(__dirname, f));
	let importPath = f.replace(/\.jsx?/, ''),
		routePaths = importPath.split(path.sep),
		name = _.last(routePaths);

	importPath = routePaths.join('/');

	routePaths.shift();
	routePaths[1] = _.camelCase((routePaths[1].replace(new RegExp(routePaths[0], 'ig'), ''))) || 'index';

	return `const ${name} = asyncComponent(() => import(/* webpackChunkName: "${routePaths.join('/')}" */'./${importPath}'));`
});

let routes = files.map((f) => {
	f = path.relative(path.join(__dirname, 'src'), path.join(__dirname, f));
	let importPath = f.replace(/\.jsx?/, ''),
		routePaths = importPath.split(path.sep),
		name = _.last(routePaths);

	routePaths.shift();
	routePaths[1] = _.camelCase(routePaths[1].replace(new RegExp(routePaths[0], 'ig'), ''));
	if (routePaths[1] === '') {
		routePaths.splice(1)
	}

	return `\t\t\t<Route exact path="/${routePaths.join('/')}" component={${name}}/>`
});

let data = fs.readFileSync('./src/router.template', 'utf-8');

data = data.replace('#components#', components.join('\n'));
data = data.replace('#routes#', routes.join('\n'));

fs.writeFileSync('./src/router.jsx', data);

console.log('build success!');


