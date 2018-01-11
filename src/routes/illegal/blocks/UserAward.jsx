import React from 'react';
import {Box, Button, Form, Input, Tab, Tabs, Text, Textarea, utils} from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";

/**
 * 用户奖励
 */
export default class UserAward extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			type: 2,

			rewardScore: {
				creditScoreCount: 5,
				remark: ''
			},

			rewardCoupon: {
				couponAmout: '5',
				num: '1',
				expireTime: '2018-01-15'
			},

			rewardBlance: {
				amount: 5,
				remark: ''
			},

			noReward: {}

		}
	}

	render() {
		return (
			<Box title="用户奖励" icon="fa-tag">
				<p>给用户的奖励可以选择如下任一种：</p>
				<Form horizontal>
					<Tabs model="type">
						<Tab title="奖积分">
							<Text label="奖罚类型" value="积分奖励"/>
							<Text label="处理类型" value="其他"/>
							<Input label="奖励积分" model="rewardScore.creditScoreCount" type="number" width={250}/>
							<Textarea label="备注" model="rewardScore.remark" width={'50%'}/>
						</Tab>
						<Tab title="奖出行券">
							<Input label="出行券金额" model="rewardCoupon.couponAmout" type="number" width={150}/>
							<Input label="出行券张数" model="rewardCoupon.num" type="number" width={150}/>
							<Input label="过期时间" model="rewardCoupon.expireTime" type="date" width={250}/>
						</Tab>
						<Tab title="奖余额">
							<Text label="用户当前余额" value={'958.3元 （充值金额950.0元+赠送金额8.3元）'}/>
							<Input label="金额" model="rewardBlance.amount" type="number" width={250}/>
							<Textarea label="备注" model="rewardBlance.remark" width={'50%'}/>
						</Tab>
						<Tab title="不奖励">
							本次上报不给用户奖励
						</Tab>
					</Tabs>
				</Form>
				<div className="pull-right buttons">
					<Button value="取消" theme="default" onClick={()=> utils.closeTab()}/>
					<Button value="确定" onClick={this.confirmHandle.bind(this)}/>
				</div>
			</Box>
		)
	}

	// 确认处理
	confirmHandle() {
		let type = this.state.type + 1;
		switch (type) {
			case 1:
				this.confirmHandle_rewardScore(type);
				break;
			case 2:
				this.confirmHandle_rewardCoupon(type);
				break;
			case 3:
				this.confirmHandle_rewardMoeny(type);
				break;
			case 4:
				this.confirmHandle_noReward(type);
				break;
			default:
				break;
		}

	}

	// 确认处理-奖积分
	async confirmHandle_rewardScore(type) {
		let {detail} = this.props;
		let {rewardScore} = this.state;

		let result = await tripProblemApi.confirmHandle({
			type,
			id: detail.id,
			appUserId: detail.userId,
			...rewardScore
		});

		utils.alert(result.message, ()=>{
			utils.closeTab()
		});
		if (result.resultCode == 1) {
			// utils.alert(result.message);
		} else {
			// utils.alert(result.message);
		}
	}

	// 确认处理-奖出行券
	async confirmHandle_rewardCoupon(type) {
		let {detail} = this.props;
		let {rewardCoupon} = this.state;

		let result = await tripProblemApi.confirmHandle({
			type,
			id: detail.id,
			appUserId: detail.userId,
			...rewardCoupon
		});

		utils.alert(result.message, ()=>{
			utils.closeTab()
		});
		if (result.resultCode == 1) {
			// utils.alert(result.message);
		} else {
			// utils.alert(result.message);
		}
	}

	// 确认处理-奖余额
	async confirmHandle_rewardMoeny(type) {
		let {detail} = this.props;
		let {rewardBlance} = this.state;

		let result = await tripProblemApi.confirmHandle({
			type,
			id: detail.id,
			appUserId: detail.userId,
			...rewardBlance
		});

		utils.alert(result.message, ()=>{
			utils.closeTab()
		});
		if (result.resultCode == 1) {
			// utils.alert(result.message);
		} else {
			// utils.alert(result.message);
		}
	}

	// 确认处理-不奖励
	async confirmHandle_noReward(type) {
		let {detail} = this.props;
		let {noReward} = this.state;

		let result = await tripProblemApi.confirmHandle({
			type,
			id: detail.id,
			appUserId: detail.userId,
			...noReward
		});

		utils.alert(result.message, ()=>{
			utils.closeTab()
		});
		if (result.resultCode == 1) {
			// utils.alert(result.message);
		} else {
			// utils.alert(result.message);
		}
	}

}
