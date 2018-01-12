import {request} from 'jeselvmo';
import env from '../js/env';


/**
 * appUser
 */
const appUserApi = {
	// 用户详情接口
	userDetail: (params) => request.get(env.apiPath_customer + 'appUser/userDetail', params),
};

export default appUserApi
