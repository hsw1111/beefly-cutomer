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
	apiPath: 'http://10.31.24.156:7080/',
	apiPath_customer: 'http://10.31.24.156:7080/customer/',
};


// 生产环境
const production = {
	name: 'production',
	dir: 'official',
	apiPath: 'http://47.94.39.104:8090/',
	apiPath_customer: 'http://47.94.39.104:8090/customer/',
};

module.exports = development;

