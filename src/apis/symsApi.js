import {request} from 'jeselvmo';
import env from '../js/env';
import systemApi from "./systemApi";

/**
 * 违停短信
 */
const symsApi = {

	// 违规上报违停短信
	pageSms: (params) => request.get(env.apiPath_customer + 'syms/pageSms', params),

	// 违规人收到违停短信次数
	countSms: (params) => request.get(env.apiPath_customer + 'syms/countSms', params),
};

export default symsApi
