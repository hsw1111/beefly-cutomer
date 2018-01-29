import {request} from 'jeselvmo';
import env from '../js/env';

/**
 * 系统接口
 */
const systemApi = {
	/**
	 * 登录
	 * @param {object} params {account: 'admin' ,passWord: '123456'}
	 * @returns {object} json
	 */
	login: (params) => request.get(env.apiPath + 'system/login', params),

	// 退出登录
	logout: (params) => request.get(env.apiPath + 'system/loginOut', params),

	// 修改密码
	updatePassword: (params) => request.get(env.apiPath + 'system/updatePassword', params),

	// 测试登录
	testToken: (params) => request.get(env.apiPath_customer + 'tripProblem/page', params),
};

export default systemApi
