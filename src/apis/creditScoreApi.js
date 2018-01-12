import {request} from 'jeselvmo';
import env from '../js/env';

/**
 * 信用积分
 */
const creditScoreApi = {

	// 信用积分列表
	page: (params) => request.get(env.apiPath_customer + 'creditScore/page', params),
	// 收到违停短信次数
	count: (params) => request.get(env.apiPath_customer + 'creditScore/count', params),
};

export default creditScoreApi
