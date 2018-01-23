import {request} from 'jeselvmo';
import env from '../js/env';


/**
 * appUser
 */
const appUserApi = {
	// 用户详情接口
	userDetail: (params) => request.get(env.apiPath_customer + 'appUser/userDetail', params),

	// 用户详情接口
	page: (params) => request.get(env.apiPath_customer + 'appUser/page', params),

	//修改手机号
	modifyMobile: (params) => request.get(env.apiPath_customer + 'appUser/modifyMobile', params),

	//拉黑
	black: (params) => request.get(env.apiPath_customer + 'appUser/black', params),

	//拉黑备注查询
	blackRemark: (params) => request.get(env.apiPath_customer + 'appUser/blackRemark', params),

	//取消拉黑
	unBlack: (params) => request.get(env.apiPath_customer + 'appUser/unBlack', params),

	//设为失信用户
	creditless: (params) => request.get(env.apiPath_customer + 'appUser/creditless', params),

	//取消设为失信
	credibly: (params) => request.get(env.apiPath_customer + 'appUser/credibly', params),

	//失信用户备注查询
	creditRemark: (params) => request.get(env.apiPath_customer + 'appUser/creditRemark', params),

	//清除短消息限制
	clearSms: (params) => request.get(env.apiPath_customer + 'appUser/clearSms', params),


};

export default appUserApi
