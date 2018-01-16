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
};

export default appUserApi
