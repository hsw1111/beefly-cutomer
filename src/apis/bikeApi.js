import {request} from 'jeselvmo';
import env from '../js/env';


/**
 * bike
 */
const bikeApi = {
	// 车辆操作日志接口
	bikeLogPage: (params) => request.get(env.apiPath_customer + 'bikeLog/page', params),
	// 车辆信息查询接口
	page: (params) => request.get(env.apiPath_customer + 'bike/page', params),
	// 车辆详情接口
	detail: (params) => request.get(env.apiPath_customer + 'bike/detail', params),
	// 修改状态接口
	editState: (params) => request.get(env.apiPath_customer + 'bike/editState', params),
	
};

export default bikeApi