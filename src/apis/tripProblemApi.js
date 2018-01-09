import {request} from 'jeselvmo';
import env from '../js/env';

/**
 * 违规上报接口
 */
const tripProblemApi = {

	/**
	 * 违规上报分页查询接口
	 */
	page: (params) => request.get(env.apiPath_customer + 'tripProblem/page', params),
	/**
	 * 违规上报分页查询接口
	 */
	detail: (id) => request.get(env.apiPath_customer + 'tripProblem/detail', {id}),
	/**
	 * 违规上报添加备注
	 */
	addRemark: (params) => request.get(env.apiPath_customer + 'tripProblem/addRemark', params),
	/**
	 * 违规上报驳回处理
	 */
	reject: (params) => request.get(env.apiPath_customer + 'tripProblem/reject', params),
	/**
	 * 违规上报更换订单
	 */
	orderPage: (params) => request.get(env.apiPath_customer + 'order/page', params),
	/**
	 * 违规上报信用积分
	 */
	creditScorepage: (params) => request.get(env.apiPath_customer + 'creditScore/page', params),
	/**
	 * 违规上报违停短信
	 */
	pageSms: (params) => request.get(env.apiPath_customer + 'syms/pageSms', params),
};

export default tripProblemApi
