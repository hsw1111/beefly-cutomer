var fs = require('fs');// 加载File System读写模块
var os = require('os');
var path = require('path');
var iconv = require('iconv-lite');// 加载编码转换模块
var program = require('commander');
var env = require('./src/js/env');
var co = require('co');
var OSS = require('ali-oss');
var stringify = (result) => JSON.stringify(result, null, '    ');


const bucket = 'mfweb';
const ossRootDir = 'admin/customer';
const publicDir = 'public';
const uploadDir = ossRootDir + '/' + env.dir;

// 设置默认显示使用帮助
var argv = process.argv;
if (argv.length == 2) {
	argv.push('-h')
}

program
	.version('1.0.0')
	.option('-s, --status', '查看当前状态')
	.option('-d, --development', '修改为开发环境')
	.option('-p, --production', '修改为生产环境')
	.option('-l, --list', '列表OSS上项目文件')
	.option('-u, --upload', '上传./public目录中的文件到OSS上')
	.option('-c, --copy', '将beefly-frame/public与static合并到./public目录中')
	.parse(argv);


const modifyParam = function (param, envArgs) {
	// dir last
	param = param.replace('/', '');

	fs.readFile(envArgs.file, function (err, data) {
		if (err)
			console.log("读取文件fail " + err);
		else {
			let str = iconv.decode(data, 'utf-8');
			str = str.replace(envArgs.reg, envArgs.rep.replace('{param}', param));

			if (envArgs.validator(param)) {
				fs.writeFile(envArgs.file, str, function (err2) {
					if (err2)
						console.log("写入文件fail " + err2);
					else
						console.log('当前%s修改为：%s', envArgs.title, param);
				})
			}
		}
	});
};

const envArgs = {
	title: '环境',
	file: './src/js/env.js',
	reg: /module.exports = (\S+);/g,
	rep: 'module.exports = {param};',
	validator: () => true
};

if (program.status) {
	console.log('当前环境：', env.name);
}
if (program.development) {
	modifyParam('development', envArgs)
}

if (program.production) {
	modifyParam('production', envArgs)
}

function mkdirSync(dir) {
	if (!fs.existsSync(dir)) {
		mkdirSync(path.dirname(dir));
		fs.mkdirSync(dir);
	}
}

function copy(src, dest) {//拷贝文件
	mkdirSync(path.dirname(dest));
	// console.log('copy :' + dest)
	fs.writeFileSync(dest, fs.readFileSync(src));
}

function travel(src, dest) {
	fs.readdirSync(src).forEach(function (file) {
		var srcPath = path.join(src, file);
		var destPath = path.join(dest, file);
		if (fs.statSync(srcPath).isDirectory()) {//判断是否是目录
			travel(srcPath, destPath);
		} else {
			copy(srcPath, destPath);
		}
	});
}

//copy
if (program.copy) {
	// travel("../beefly-frame/public", './public');
	travel("./static", './public');
}

function readOssConifg(_bucket) {
	let data = fs.readFileSync(os.homedir() + '/.ossconfig', "utf-8");
	let ossConfig = JSON.parse(data);
	ossConfig.bucket = _bucket;
	return ossConfig;
}

// oss client
const client = new OSS(readOssConifg(bucket));

// 遍历目录中所有文件
const listNativeFiles = (dir) => {
	let children = [];
	try {
		let result = fs.readdirSync(dir);
		if (result) {
			result.forEach(function (filename) {
				let path = dir + "/" + filename;
				console.log(path)
				let stat = fs.statSync(path);
				if (stat && stat.isDirectory()) {
					children = children.concat(listNativeFiles(path))
				} else {
					if (path.indexOf('.DS_Store') < 0) {
						children.push(path)
					}
				}
			});
		}
	} catch (e) {
		// console.log(e.message)
	}

	return children
};

// 遍历OSS上目录下所有文件和子目录
const listOssFiles = co.wrap(function* listDir(dir) {
	let arrs = [];
	let result = yield client.list({
		prefix: dir,
		delimiter: '/'
	});

	// 遍历子目录
	let prefixes = result.prefixes;
	if (prefixes) {
		for (let i = 0; i < prefixes.length; i++) {
			let prefixe = prefixes[i];
			let subarrs = yield listDir(prefixe);
			arrs = arrs.concat(subarrs);
		}
	}

	// 遍历文件
	let objects = result.objects;
	if (objects) {
		for (let i = 0; i < objects.length; i++) {
			let obj = objects[i];
			// if (obj.name !== dir) {
			arrs.push(obj.name);
			// }
		}
	}

	// arrs.push(dir);
	return Promise.resolve(arrs)
});

function* listTask(objectKey) {
	console.log('list dir:' + objectKey);
	let result = yield listOssFiles(objectKey);
	console.log('result: ', stringify(result));
}

// 列出oss上文件列表
if (program.list) {
	co(listTask(uploadDir)).catch(function (err) {
		console.log(err);
	});
}

function* cleanupTask(objectKey) {
	console.log('cleanup dir:' + objectKey);
	let result = yield listOssFiles(objectKey);
	if (result.length > 0)
		yield client.deleteMulti(result);
	console.log('result: ', stringify(result));
}

function* uploadTask(nativeDir, ossDir) {
	let result = listNativeFiles(nativeDir)
	console.log('upload:', stringify(result));
	for (let localFile of result) {
		let objectKey = ossDir + localFile.replace(nativeDir, '');
		yield client.put(objectKey, localFile);
	}
}

// 本地项目文件上传到oss
if (program.upload) {
	co(function* () {
		yield cleanupTask(uploadDir);
		yield uploadTask(publicDir, uploadDir);
	}).catch(function (err) {
		console.log(err);
	});
}



