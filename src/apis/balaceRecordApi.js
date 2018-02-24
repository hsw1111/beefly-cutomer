import {request} from 'jeselvmo';
import env from '../js/env';


/**
 *  余额
 */
const balaceRecordApi = {
	// 余额变动明细分页查询
	page: (params) => request.get(env.apiPath_customer + 'balaceRecord/page', params),

	// 修改余额接口
	addRecord: (params) => request.get(env.apiPath_customer + 'balaceRecord/addRecord', params),

	// 余额提现接口
	withdraw: (params) => request.get(env.apiPath_customer + 'balaceRecord/withdraw', params),

	// 提现信息接口
	withdrawPage: (params) => request.get(env.apiPath_customer + 'balaceRecord/withdrawPage', params),

	// 提现详情接口
	withdrawDetail: (params) => request.get(env.apiPath_customer + 'balaceRecord/withdrawDetail', params),

};

export default balaceRecordApi
