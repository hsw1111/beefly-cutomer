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
	detail: (params) => request.get(env.apiPath_customer + 'tripProblem/detail', params),
	/**
	 * 违规上报添加备注
	 */
	addRemark: (params) => request.get(env.apiPath_customer + 'tripProblem/addRemark', params),
	/**
	 * 违规上报驳回处理
	 */
	reject: (params) => request.get(env.apiPath_customer + 'tripProblem/reject', params),
	/**
	 * 违停上报确认处理_客户
	 */
	confirmHandle: (params) => request.get(env.apiPath_customer + 'tripProblem/confirmHandle', params),
	/**
	 * 违停上报确认处理_地勤
	 */
	confirmHandleDq: (params) => request.get(env.apiPath_customer + 'tripProblem/confirmHandleDq', params),

};

export default tripProblemApi
