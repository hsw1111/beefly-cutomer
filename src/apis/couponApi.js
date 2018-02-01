import {request} from 'jeselvmo';
import env from '../js/env';


/**
 * 出行券明细分页列表
 */
const couponApi = {
	page: (params) => request.get(env.apiPath_customer + 'coupon/page', params),

	massCoupon: (params) => request.get(env.apiPath_customer + 'coupon/massCoupon', params),

	// 奖励出行券接口
	awardCoupon: (params) => request.get(env.apiPath_customer + 'coupon/awardCoupon', params),
};

export default couponApi
