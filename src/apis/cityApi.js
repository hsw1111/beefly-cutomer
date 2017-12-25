import {request} from 'jeselvmo';
import env from '../js/env';

/**
 * 城市接口
 */
const cityApi = {
	// 查询城市区域列表
	queryCityRegionList: (params) => request.get(env.mifengSystem + 'city!queryCityRegionList.do', params),
};

export default cityApi
