/**
 *  订单管理 订单状态
 */

export const orderState = {
	0: '人工结束',
	1: '未取车',
	2: '已取车',
	3: '已结束',
	4: '已取消',
	9: '开锁中',
	10: '开锁失败'
};

/**
 *  订单管理 订单类别
 */

export const orderType = {
	0: '扫码',
	1: '预约'
};

/**
 *  订单管理  精确查找
 */

export const vagueState = {
	1: '手机号',
  2: '车辆编号',
  3: '订单编号',
	4: '用户姓名'
};

/**
 *  订单管理  时间
 */

export const timeType = {
	1: '下单时间',
  2: '结束时间'
};