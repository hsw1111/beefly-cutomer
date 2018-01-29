import {request} from 'jeselvmo';
import env from '../js/env';


/**
 * 车辆
 */
<<<<<<< HEAD:src/apis/bikeLogApi.js
const bikeApi = {
	// 车辆日志分页接口
	page: (params) => request.get(env.apiPath_customer + 'bikeLog/page', params),

	// 车辆日志接口
=======
const bikeLogApi = {
	// 用户详情接口
>>>>>>> d19101c2aaa30af13945b8be334e6becd56e623a:src/apis/bikeLogApi.js
	bikeLog: (params) => request.get(env.apiPath_customer + 'bikeLog/bikeLog', params),

};

export default bikeLogApi
