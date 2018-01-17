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

/**
 * 违停上报 奖惩类型
 */

export const rewardType = {
	0: '奖励',
	1: '惩罚',
};

/**
 * 违停上报  积分处理类型
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
    9: '违停一次',
    10: '车辆轻度划伤',
    11: '车辆重度划伤',
    12: '加装私锁',
    13: '忘记关锁',
    14: '弃车逃跑',
    15: '拆红包',
};

/**
 * 违停上报 不处罚类型
 */

export const noPunishType = {
	1001: '里程过短',
	1002: '时间过短',
	1003: '当天订单重复上报',
	1004: '隔天订单重复上报',
	1005: '订单时间过久',
	1006: '开锁失败',
	1007: '发送短信时间冲突',
	1008: '未上报具体地址',
	1009: '照片不符合标准无法判断',
	1010: '帐号拉黑/冻结',
	1011: '其他原因',
};

/**
 * 违停上报 处理意见
 */

export const opinionType = {
	0: '扣积分',
	1: '扣押金',
	2: '不处罚',
	3: '发短信',
};
