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
	
	apiPath: 'http://10.30.95.8:7080/',
	apiPath_customer: 'http://10.30.95.8:7080/customer/',

	// apiPath: 'http://10.31.24.156:7080/',
	// apiPath_customer: 'http://10.31.24.156:7080/customer/',

	// apiPath: 'http://192.168.0.142:7080/',
	// apiPath_customer: 'http://192.168.0.142:7080/customer/',
	
	// // 后台ip
	// apiPath: 'http://192.168.0.117:7080/',
	// apiPath_customer: 'http://192.168.0.117:7080/customer/',
	
};


// 生产环境
const production = {
	name: 'production',
	dir: 'official',
	apiPath: 'http://47.94.39.104:7777/',
	apiPath_customer: 'http://47.94.39.104:7777/customer/',
};

module.exports = development;

