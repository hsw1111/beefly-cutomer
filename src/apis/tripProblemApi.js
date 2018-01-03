import {request} from 'jeselvmo';
import env from '../js/env';

/**
 * 违规上报接口
 */
const tripProblemApi = {

	/**
	 * 违规上报分页查询接口
	 */
	page: (params) => request.get(env.apiPath_customer + 'tripProblem/page', params),
};

export default tripProblemApi
