/**
 * 违停上报 处理进度
 */

export const handleType = {
	0: '未处理',
	1: '处理中',
	2: '已发送地勤确认',
	3: '地勤确认中',
	4: '地勤已处理',
	5: '已处理'
};

/**
 * 违停上报 车辆运营状态
 */

export const operateState = {
	1: '运营中',
	2: '非运营中',
};


/**
 * 违停上报 上报角色
 */

export const reportState = {
	0: '用户',
	1: '地勤',
};

/**
 * 违停上报 模糊搜索
 */

export const vagueState = {
	'mobile': '手机号',
	'bikeCode': '车辆编号',
};
