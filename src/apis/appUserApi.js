import {request} from 'jeselvmo';
import env from '../js/env';


/**
 *  
 */
const appUserApi = {

	// 获取用户地勤信息数据接口
	getOperUser: (params) => request.get(env.apiPath_customer + 'appUser/getOperUser', params),

};

export default appUserApi
