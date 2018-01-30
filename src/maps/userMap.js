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

export const purpose = {
	1: '用户回访',
	2: '用户通知',
	4: '违规通知',
	3: '其他',
};

/**
 *  信用积分管理   奖罚类型
 */
export const rewardType = {
	0: '积分奖励',
	1: '积分处罚',
};

/**
 *  信用积分管理   处理类型
 */

export const integralType = {
	0: '正常骑行一次',
	1: '邀请好友',
	2: '邀请好友正常骑行',
	3: '首次充值',
    4: '运营区域外还车',
    5: '分享行程',
    6: '故障上报',
    7: '违停上报',
    8: '其它',
    9: '违停扣分',
    10: '车辆轻度划伤',
    11: '车辆重度划伤',
    12: '加装私锁',
    13: '忘记关锁',
    14: '弃车逃跑',
    15: '拆红包',
};

/**
 *  出行券 获得类型
 */

export const couponGetType = {
	0: '新手注册',
	1: '人工发放',
	2: '系统奖励',
	3: '活动发放'
};