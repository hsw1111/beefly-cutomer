import {request} from 'jeselvmo';
import env from '../js/env';


/**
 * 车辆
 */
const bikeApi = {

	// 强制锁车接口
	forcedLock: (params) => request.get(env.apiPath_customer + 'bike/forcedLock', params),

};

export default bikeApi
