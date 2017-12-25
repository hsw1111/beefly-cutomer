/* eslint-disable no-unused-vars */
/**
 *
 * 环境配置信息
 *
 */

// 开发环境
const development = {
	name: 'development',
	dir: 'test',
	mifengSystem: 'http://59.110.29.195:8088/mifeng/system/',
};


// 生产环境
const production = {
	name: 'production',
	dir: 'official',
	mifengSystem: 'http://59.110.29.195:8088/mifeng/system/',
};

module.exports = production;

