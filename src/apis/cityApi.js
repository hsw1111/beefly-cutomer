import {request} from 'jeselvmo';
import env from '../js/env';

/**
 * 城市接口
 */
const cityApi = {

	// 城市数据
	list: (params) => request.get(env.apiPath_customer + 'systemCity/getSystemCitys', params),
};

export default cityApi
