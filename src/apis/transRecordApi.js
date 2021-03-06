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

	// 充值金额的充值记录
	page: (params) => request.get(env.apiPath_customer + 'transRecord/page', params),
};

export default transRecordApi
