import {request} from 'jeselvmo';
import env from '../js/env';

/**
 * 订单
 */
const orderApi = {

	// 订单列表
	page: (params) => request.get(env.apiPath_customer + 'order/page', params),

	// 订单详情接口
	detail: (params) => request.get(env.apiPath_customer + 'order/detail', params),
};

export default orderApi
