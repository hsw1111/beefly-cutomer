/**
 *  用户管理 用户状态
 */

export const userState = {
	0: '全部用户',
	1: '认证用户',
	2: '未缴纳押金用户',
	3: '已缴纳押金用户',
	4: 'VIP用户',
	5: '黑名单用户'
};

/**
 *  用户管理  精确查找
 */

export const vagueState = {
	'mobile': '手机号',
	'id': '用户编号',
	'name': '用户姓名',
};

/**
 *  用户管理  押金状态
 */

export const depositState = {
	0: '未缴纳',
	1: '正常',
	2: '退款中',
	3: '冻结',
};

/**
 *  用户管理  发送目的
 */
export const purposeType = {
	0: '验证码',
	1: '用户回访',
	2: '用户通知',
	3: '其他',
	4: '违规通知'
};
