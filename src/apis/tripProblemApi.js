import {request, localStore} from 'jeselvmo';
import env from '../js/env';
import $ from 'jquery';
import beefly from "../js/beefly";

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
	/**
	 * 违停上报确认处理_地勤 不处罚接口
	 */
	noPunishList: (params) => request.get(env.apiPath_customer + 'tripProblem/noPunishList', params),
	/**
	 * 违停上报导出
	 */
	export: (params) => request.get(env.apiPath_customer + 'tripProblem/export', params),
	/**
	 * 违停上报 客服人员处理违停工作量
	 */
	getDealCount: (params) => request.get(env.apiPath_customer + 'tripProblem/getDealCount', params),
};

export default tripProblemApi
