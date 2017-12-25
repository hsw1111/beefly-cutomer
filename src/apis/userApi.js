import {request} from 'jeselvmo';
import env from '../js/env';

/**
 * 用户接口
 */
const userApi = {
	// 查询用户列表分页
	queryPage: (params) => request.get(env.mifengSystem + 'user!queryPage.do', params),
};

export default userApi
