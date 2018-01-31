import {request} from 'jeselvmo';
import env from '../js/env';

/**
 * 订单
 */
const orderApi = {

	// 订单列表
	page: (params) => request.get(env.apiPath_customer + 'order/page', params),

	// 订单详情接口
	detail: (params) => request.get(env.apiPath_customer + 'order/detail', params),

	// 订单列表分页数据
	listPage: (params) => request.get(env.apiPath_customer + 'order/listPage', params),

	// 订单上报日志
	orderLog: (params) => request.get(env.apiPath_customer + 'order/orderLog', params),

	// 开电车锁
	openLock: (params) => request.get(env.apiPath_customer + 'order/openLock', params),

	// 关电车锁
	closeLock: (params) => request.get(env.apiPath_customer + 'order/closeLock', params),
	
	// 是否在违停区域内
	isNoParkingArea: (params) => request.get(env.apiPath_customer + 'order/isNoParkingArea', params),
	
	// 是否在运营区域外
	abroadCloseOrder: (params) => request.get(env.apiPath_customer + 'order/abroadCloseOrder', params),
	
	// 还车接口
	returnCar: (params) => request.get(env.apiPath_customer + 'order/returnCar', params),
	
	// 轮训车辆状态接口
	reBackOrder: (params) => request.get(env.apiPath_customer + 'order/reBackOrder', params),

};

export default orderApi
