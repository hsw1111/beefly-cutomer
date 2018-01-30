import {request} from 'jeselvmo';
import env from '../js/env';

/**
 * 城市接口
 */
const systemCityApi = {
	/**
	 * 登录
	 * @param {object} params {account: 'admin' ,passWord: '123456'}
	 * @returns {object} json
	 */

	// 获取城市数据接口
	getSystemCitys: (params) => request.get(env.apiPath_customer + 'systemCity/getSystemCitys', params),
};

export default systemCityApi
