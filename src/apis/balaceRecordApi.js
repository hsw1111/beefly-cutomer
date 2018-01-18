import {request} from 'jeselvmo';
import env from '../js/env';


/**
 *  余额
 */
const balaceRecordApi = {
	// 余额变动明细分页查询
	page: (params) => request.get(env.apiPath_customer + 'balaceRecord/page', params),
};

export default balaceRecordApi
