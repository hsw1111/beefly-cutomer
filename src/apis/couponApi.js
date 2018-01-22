import {request} from 'jeselvmo';
import env from '../js/env';


/**
 * 出行券明细分页列表
 */
const couponApi = {
	page: (params) => request.get(env.apiPath_customer + 'coupon/page', params),
};

export default couponApi
