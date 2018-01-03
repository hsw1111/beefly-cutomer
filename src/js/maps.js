/**
 * 订单状态
 */
export const orderFlowMap = {
	0: '人工结束',
	1: '未取车',
	2: '已取车',
	3: '已结束',
	4: '已取消',
	9: '开锁中',
	10: '开锁失败',
};
/**
 * 订单种类
 */
export const orderTypeMap = {
	0: '扫码',
	1: '预约',
};
/////////////////////////////////////////////////////
/**
 * 合伙人状态
 */
export const partnerStateMap = {
	0: '未充值',
	1: '正常',
	2: '已退出'
};
/**
 * 提现方式
 */
export const cashWithdrawalMap = {
	0: 'APP转账提现',
	1: '线下转账提现',

};
/**
 * 提现状态
 */
export const typeMap = {
	11: '退出成功',
	12: '提现成功',
};
/////////////////////////////////////////////////////
/**
 * 押金状态
 */
export const cashPledgeStateMap = {
	0: '已支付',
	1: '已扣款',
	2: '提现中',
	3: '已提现',
};

/**
 * 支付途径
 */
export const paymentChannelMap = {
	0: '支付宝',
	1: '微信',
};


/**
 * 提现方式
 */
export const withdrawalTypeMap = {
	0: 'App自动提现',
	1: '后台审核App提现',
	2: '后台转账提现',
	3: 'App转账提现',
};


/**
 * 提现方式
 */
export const withdrawalStateMap = {
	0: '提现中',
	1: '已提现',
	2: '提现失败',
};

////////////////////////////////////////
// 车辆


/**
 * 车辆状态
 */
export const bikeStateMap = {
	0: '',
	1: '未入库',
	2: '库存中',
	3: '待上线',
	4: '待出租',
	5: '已预定',
	6: '已出租',
	7: '维护中',
	8: '返修中',
	9: '已报废',
	10: '已下线',
	11: '已暂时丢失',
	12: '欠压下线',
	14: '寻车中',
};

/**
 * 车辆在线状态
 */
export const bikeOnlineStateMap = {
	0: '离线',
	1: '在线',
};


/**
 * 车辆电机状态
 */
export const bikeMotorLockStateMap = {
	0: '停止',
	1: '运转',
};

/**
 * 车辆电池状态
 */
export const bikeButteryStateMap = {
	0: '未通电',
	1: '通电',
};

/**
 * 是否已装入电池
 */
export const loadButteryStateMap = {
	0: '否',
	1: '是',
};
/////////////////////////////////////////////////////
// 电池


/**
 * 电池状态
 */
export const batteryStateMap = {
	0: '',
	1: '未入库',
	2: '待充电',
	3: '已充满',
	4: '领用中',
	5: '使用中',
	6: '回收中',
	7: '维修中',
	8: '已报废',
	9: '已暂时丢失',
};

/**
 * 电池在线状态
 */
export const batteryOnlineStateMap = {
	0: '离线',
	1: '在线',
};


/////////////////////////////////////////////////////
// 用户

/**
 * 用户状态
 */
export const userStateMap= {
	1: '黑名单用户',
	2: 'VIP用户',
	3: '仅注册用户',
	4: '缴纳押金用户',
	5: '已退押金'
};


/**
 * 失信状态
 */
export const userDishonestyStateMap= {
	0: '正常',
	1: '失信'
};
///////////////////////////////////////
//报警管理
/**
 * 处理进度
 */

export const batteryTreatmentState = {
	1: '未处理',
	2: '正在处理',
	3: '已发送地勤处理',
	4: '地勤处理中',
	5: '地勤已处理',
	6: '处理完成',

};
/**
 * 车辆运营状态
 */


export const alarmBikeState = {
	1: '运营中',
	2: '非运营中',
};

///////////////////////////
//反馈上报
/**
 *上报角色
 */

export const feedbackRole = {
	1: '系统',
	2: '用户',
};

/**
 * 用户搜索类型
 */
export const userSearchTypeMap = {
	'mobile': '手机号',
	'userId': '用户ID',
	'name': '用户名'
};

/**
 * 订单时间
 */
export const orderTimeMap = {
	1: '下单时间',
	2: '结束时间',
};

/**
 * 订单搜索类型
 */
export const orderSearchTypeMap = {
	'bikeCode':'车牌号',
	'mobile': '手机号',
	'orderId': '订单ID',
	'name': '用户名'
};

/**
 * 押金搜索类型
 */
export const cashPledgeSearchTypeMap = {
	'mobile':'手机号',
	'name': '姓名',
	'userId': '用户ID',
	'sysTransNo': '商户订单号'
};

/**
 * 押金搜索类型
 */
export const withDrawalSearchTypeMap = {
	'mobile':'手机号',
	'name': '姓名',
	'userId': '用户ID',
};

/**
 * 车辆故障上报类型
 */
export const reportType = {
	1: '车辆没电',
	2: '无法启动',
	3: '开锁失败',
	4: '续航不准确',
	5: '加速故障',
	6: '刹车故障',
	7: '鸣笛故障',
	8: '车灯故障',
	9: '脚蹬损坏',
	10: '车身有损伤',
	11: '车头损坏',
	12: '其它',
};

// 车辆报警类型
export const bikePoliceReasonMap = {
	0: '无',
	1: '电量过低',
	2: '断电',
	3: '未启动有平移',
	4: '海拔过高',
	5: '翻倒'
};

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
	0: '地勤',
	1: '用户',
};

/**
 * 违停上报 模糊搜索
 */

export const vagueState = {
	'mobile': '手机号',
	'bikeCode': '车辆编号',
};
