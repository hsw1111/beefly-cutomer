import {request} from 'jeselvmo';
import env from '../js/env';


/**
 * bike
 */
const bikeApi = {
	// 车辆操作日志接口
	bikeLogPage: (params) => request.get(env.apiPath_customer + 'bikeLog/page', params),
};

export default bikeApi