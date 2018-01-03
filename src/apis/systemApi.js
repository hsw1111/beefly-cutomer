import {request} from 'jeselvmo';
import env from '../js/env';

/**
 * 系统接口
 */
const systemApi = {
	/**
	 * 登录
	 * @param {object} params {userName: 'admin' ,passWord: '123456'}
	 * @returns {object} json
	 */
	login: (params) => request.get(env.apiPath + 'system/login', params),
};

export default systemApi
