import React from 'react';
import {observer} from 'mobx-react';
import {Box, Button, Form, Input, Tab, Tabs, Text, Textarea, tabUtils, msgBox} from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
import userApi from "../../../apis/userApi";
import beefly from "../../../js/beefly";
import illegalStore from "../stores/illegalStore";
import {localStore} from 'jeselvmo';

/**
 * 用户奖励
 */
@observer
export default class UserAward extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			type: 0,

			rewardScore: {
				creditScoreCount: 5,
				remark: ''
			},

			rewardCoupon: {
				couponAmout: '',
				num: '',
				expireTime: ''
			},

			rewardBlance: {
				amount: '',
				remark: ''
			},

			noReward: {},

			// 用户详情（取余额数据）
			userDetail: null,

		}
	}

	async componentWillMount() {
		let {detail} = illegalStore;
		let result = await userApi.userDetail({id: detail.userId});
		if (result.resultCode === 1) {
			this.setState({
				userDetail: result.data
			})
		}
	}

	render() {
		let {userDetail} = this.state;
		return (
			<Box title="用户奖励" icon="fa-tag">
				<p>给用户的奖励可以选择如下任一种：</p>
				<Form className="form-label-150" horizontal>
					<Tabs model="type">
						<Tab title="奖积分">
							<Text label="奖罚类型" value="积分奖励"/>
							<Text label="处理类型" value="其他"/>
							<Input label="奖励积分" model="rewardScore.creditScoreCount" type="number" width={250} validation={{required: true}}/>
							<Textarea label="备注" model="rewardScore.remark" width={'50%'}/>
						</Tab>
						<Tab title="奖出行券">
							<Input label="出行券金额" model="rewardCoupon.couponAmout" type="number" width={150} validation={{required: true}}/>
							<Input label="出行券张数" model="rewardCoupon.num" type="number" width={150}  validation={{required: true}}/>
							<Input label="过期时间" model="rewardCoupon.expireTime" type="date" width={250} validation={{required: true}}/>
						</Tab>
						<Tab title="奖余额">
							<Text label="用户当前余额">
								{userDetail && (
									<div>
										<span className={'text-yellow'}>
											{(userDetail.balance || 0) + (userDetail.grantBalance || 0)}元
										</span>
										（充值金额{userDetail.balance || 0}元 + 赠送金额{userDetail.grantBalance || 0}元）
									</div>
								)}
							</Text>
							<Input label="金额" model="rewardBlance.amount" type="number" width={250} validation={{required: true}}/>
							<Textarea label="备注" model="rewardBlance.remark" width={'50%'}/>
						</Tab>
						<Tab title="不奖励">
							本次上报不给用户奖励
						</Tab>
					</Tabs>
				</Form>
				<div className="pull-right buttons">
					<Button value="取消" theme="default" onClick={() => tabUtils.closeTab()}/>
					<Button value="确定" onClick={this.confirmHandle.bind(this)}/>
				</div>
			</Box>
		)
	}

	componentDidMount(){
		if(illegalStore.detail.state == 5){
			msgBox.warning('该上报已经处理', ()=>{
				tabUtils.closeTab()
			})
		}
	}

	// 确认处理
	confirmHandle() {
		let type = this.state.type + 1;
		let {detail} = illegalStore;

		let params = {
			type,
			id: detail.id,
			appUserId: detail.userId,
		};

		switch (type) {
			case 1:
				this.confirmHandle_rewardScore(params);
				break;
			case 2:
				this.confirmHandle_rewardCoupon(params);
				break;
			case 3:
				this.confirmHandle_rewardMoeny(params);
				break;
			case 4:
				this.confirmHandle_noReward(params);
				break;
			default:
				break;
		}

	}

	// 确认处理-奖积分
	async confirmHandle_rewardScore(params) {
		let {rewardScore} = this.state;

		if(rewardScore.creditScoreCount == ''){
			msgBox.warning("奖励积分不能为空");
			return
		}
		if(rewardScore.creditScoreCount <= 0){
			msgBox.warning("奖励积分必须大于0");
			return
		}
		if(parseInt(rewardScore.creditScoreCount) != Number(rewardScore.creditScoreCount)){
			msgBox.warning("奖励积分必须为整数");
			return
		}

		let result = await tripProblemApi.confirmHandle({
			...params,
			...rewardScore
		});

		if (result.resultSupport == -1) {
			localStore.set('illegalState',5);
			msgBox.warning(result.message, () => {
				tabUtils.closeTab();
			});
		}

		if (result.resultCode == 1) {
			localStore.set('illegalState',5);
			msgBox.success(result.message, () => {
				tabUtils.closeTab();
			});
		}
	}

	// 确认处理-奖出行券
	async confirmHandle_rewardCoupon(params) {
		let {rewardCoupon} = this.state;

		if(rewardCoupon.couponAmout == ''){
			msgBox.warning("出行券金额不能为空");
			return
		}
		if(rewardCoupon.couponAmout <= 0){
      msgBox.warning("出行券金额必须大于0");
      return
    }
    if(parseInt(rewardCoupon.couponAmout) != Number(rewardCoupon.couponAmout)){
      msgBox.warning("出行券金额必须为整数");
      return
    }
		if(rewardCoupon.num == ''){
			msgBox.warning("出行券张数不能为空");
			return
		}
		if (rewardCoupon.num <= 0) {
      msgBox.warning("出行券数量必须大于0");
      return
    }
    if(parseInt(rewardCoupon.num) != Number(rewardCoupon.num)){
      msgBox.warning("出行券数量必须为整数");
      return
    }
		if(rewardCoupon.expireTime == ''){
			msgBox.warning("过期时间不能为空");
			return
		}
		if(new Date(rewardCoupon.expireTime)-new Date() < 0){
      msgBox.warning("过期时间不能小于当前日期");
      return
    }
		let result = await tripProblemApi.confirmHandle({
			...params,
			...rewardCoupon
		});

		if (result.resultSupport == -1) {
			localStore.set('illegalState',5);
			msgBox.warning(result.message, () => {
				tabUtils.closeTab();
			});
		}

		if (result.resultCode == 1) {
			localStore.set('illegalState',5);
			msgBox.success(result.message, () => {
				tabUtils.closeTab();
			});
		}
	}

	// 确认处理-奖余额
	async confirmHandle_rewardMoeny(params) {
		let {rewardBlance} = this.state;

		if(rewardBlance.amount == ''){
			msgBox.warning("金额不能为空");
			return
		}

		let result = await tripProblemApi.confirmHandle({
			...params,
			...rewardBlance
		});

		if (result.resultSupport == -1) {
			localStore.set('illegalState',5);
			msgBox.warning(result.message, () => {
				tabUtils.closeTab();
			});
		}

		if (result.resultCode == 1) {
			localStore.set('illegalState',5);
			msgBox.success(result.message, () => {
				tabUtils.closeTab();
			});
		}
	}

	// 确认处理-不奖励
	async confirmHandle_noReward(params) {
		let {noReward} = this.state;

		let result = await tripProblemApi.confirmHandle({
			...params,
			...noReward
		});

		if (result.resultSupport == -1) {
			localStore.set('illegalState',5);
			msgBox.warning(result.message, () => {
				tabUtils.closeTab();
			});
		}

		if (result.resultCode == 1) {
			localStore.set('illegalState',5);
			msgBox.success(result.message, () => {
				tabUtils.closeTab();
			});
		}
	}

}
