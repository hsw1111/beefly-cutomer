import {request} from 'jeselvmo';
import env from '../js/env';


/**
 * 车辆
 */
const bikeApi = {
	// 车辆信息查询接口
	page: (params) => request.get(env.apiPath_customer + 'bike/page', params),
	// 车辆详情接口
	detail: (params) => request.get(env.apiPath_customer + 'bike/detail', params),
	// 修改状态接口
	editState: (params) => request.get(env.apiPath_customer + 'bike/editState', params),
	
	// 强制锁车接口
	forcedLock: (params) => request.get(env.apiPath_customer + 'bike/forcedLock', params),
	// 鸣笛接口
	whistle: (params) => request.get(env.apiPath_customer + 'bike/whistle', params),	
	// 开锁关锁轮询接口
	reBikeState: (params) => request.get(env.apiPath_customer + 'bike/reBikeState', params),

};

export default bikeApi
