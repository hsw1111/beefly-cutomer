import {request} from 'jeselvmo';
import env from '../js/env';


/**
 * 车辆
 */
const bikeApi = {
	// 用户详情接口
	bikeLog: (params) => request.get(env.apiPath_customer + 'bikeLog/bikeLog', params),
};

export default bikeApi
