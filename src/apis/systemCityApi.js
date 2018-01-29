import {request} from 'jeselvmo';
import env from '../js/env';

/**
 * 系统接口
 */
const systemCityApi = {
	// 城市接口
	getSystemCitys: (params) => request.get(env.apiPath_customer + 'systemCity/getSystemCitys', params),
};

export default systemCityApi
