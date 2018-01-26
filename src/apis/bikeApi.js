import {request} from 'jeselvmo';
import env from '../js/env';


/**
 * 车辆
 */
const bikeApi = {
<<<<<<< HEAD
	// 车辆日志分页接口
	page: (params) => request.get(env.apiPath_customer + 'bikeLog/page', params),

	// 车辆日志接口
	bikeLog: (params) => request.get(env.apiPath_customer + 'bikeLog/bikeLog', params),

=======
	// 用户详情接口
	bikeLog: (params) => request.get(env.apiPath_customer + 'bikeLog/bikeLog', params),
>>>>>>> b54873372a3b18515d00e76c964415d31e3ea392
};

export default bikeApi
