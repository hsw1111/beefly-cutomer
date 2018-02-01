import {request} from 'jeselvmo';
import env from '../js/env';


/**
 * 车辆
 */
const bikeLogApi = {

	// 车辆日志分页接口
	page: (params) => request.get(env.apiPath_customer + 'bikeLog/page', params),

	// 车辆日志接口
	bikeLog: (params) => request.get(env.apiPath_customer + 'bikeLog/bikeLog', params),

};

export default bikeLogApi
