import {request} from 'jeselvmo';
import env from '../js/env';


/**
 * 车辆
 */
const bikeApi = {
	// 用户详情接口
	page: (params) => request.get(env.apiPath_customer + 'bikeLog/page', params),
};

export default bikeApi
