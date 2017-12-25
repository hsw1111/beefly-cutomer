var fs = require('fs');// 加载File System读写模块
var iconv = require('iconv-lite');// 加载编码转换模块
var program = require('commander');

program
	.version('0.0.1')
	.option('-s, --show', '查看当前状态')
	.option('-d, --development', '修改为开发环境')
	.option('-p, --production', '修改为生产环境')
	.option('-P, --project [project]', '修改当前项目')
	.parse(process.argv);


let modifyParam = function (title, param, file, reg, rep, validator) {
	if (typeof param == 'string') {
		fs.readFile(file, function (err, data) {
			if (err)
				console.log("读取文件fail " + err);
			else {
				let str = iconv.decode(data, 'utf-8');
				str = str.replace(reg, rep.replace('{param}', param));

				if (validator(param)) {
					fs.writeFile(file, str, function (err2) {
						if (err2)
							console.log("写入文件fail " + err2);
						else
							console.log('当前%s修改为：%s', title, param);
					})
				}
			}
		});
	} else {
		fs.readFile(file, function (err, data) {
			if (err)
				console.log("读取文件fail " + err);
			else {
				let str = iconv.decode(data, 'utf-8');
				let arr = reg.exec(str);
				console.log('当前%s：%s', title, arr[1]);
			}
		})
	}
};

let project = program.project;
let env = false;

if (program.development) {
	env = 'development';
}

if (program.production) {
	env = 'production'
}

if (program.show) {
	project = true;
	env = true;
}

if (project) {
	modifyParam('项目', project, './config.js', /projectDir: "(\S+)"/g, 'projectDir: "{param}"', (value) => {
		let exists = fs.existsSync(value)
		if (exists) {
			let stat = fs.lstatSync(value);
			exists = stat.isDirectory();
		}
		if (!exists) {
			console.log('Error：目录不存在，或不是一个目录。')
		}
		return exists;
	});
}

if (env) {
	modifyParam('环境', env, './common/config.js', /export default (\S+);/g, 'export default {param};', (value) => {
		let ranges = ['development', 'production'];
		let result = ranges.indexOf(value);
		if (result == -1) {
			console.log("Error：值不指定范围内。", ranges)
			return false;
		}
		return true
	});
}
