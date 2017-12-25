import {request} from 'jeselvmo';
import env from '../js/env';

/**
 * 车辆监控系统接口
 */
const bikeMonitorApi = {
	// 获取车辆列表
	getBikeListAll: (params) => request.get(env.mifengSystem + 'bikeMonitor!getBikeListAll.do', params),
};

export default bikeMonitorApi
