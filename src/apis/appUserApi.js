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

};

export default appUserApi
