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
	// apiPath: 'http://47.93.48.250:7080/',
	// apiPath_customer: 'http://47.93.48.250:7080/customer/',
};


// 生产环境
const production = {
	name: 'production',
	dir: 'official',
<<<<<<< HEAD
	apiPath: 'http://10.31.147.119:7080/',
	apiPath_customer: 'http://10.31.147.119:7080/customer/',
	// apiPath: 'http://47.94.39.104:7777/',
	// apiPath_customer: 'http://47.94.39.104:7777/customer/',
	
=======
	apiPath: 'http://47.94.39.104:7777/',
	apiPath_customer: 'http://47.94.39.104:7777/customer/',
>>>>>>> 8d53b4e2dc1f0a07e82e607bc0d13959a0a1777a
};

module.exports = development;

