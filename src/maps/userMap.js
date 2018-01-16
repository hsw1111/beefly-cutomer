/**
 *  用户管理 用户状态
 */

export const userState = {
	0: '仅注册用户',
	1: '缴纳押金用户',
	2: '已退押金',
	3: 'VIP用户',
	4: '黑名单用户',
};

/**
 *  用户管理  精确查找
 */

export const vagueState = {
	'mobile': '手机号',
	'id':'用户编号',
	'name': '用户姓名',
};

/**
 *  用户管理  押金状态
 */

export const depositState = {
	0: '未缴纳',
	1:'正常',
	2: '退款中',
	3: '冻结',
};
