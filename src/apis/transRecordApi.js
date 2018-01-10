import {request} from 'jeselvmo';
import env from '../js/env';

/**
 * 违规上报接口
 */
const transRecordApi = {

	/**
	 * 获取用户押金状态信息
	 */
	getDepositState: (params) => request.get(env.apiPath_customer + 'transRecord/getDepositState', params),
};

export default transRecordApi
