import React from 'react';
import {Box, Button, Form, Input, Tab, Tabs, Text, Textarea, Checkbox, utils} from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
import transRecordApi from "../../../apis/transRecordApi";

/**
 * 处理意见
 */
export default class HandleSuggestion extends React.Component {

	constructor(props) {
		super(props);

		let {detail} = this.props;
		this.state = {
			type: 1,

			deductScore: {
				creditScoreCount: 5,
				remark: '',
				smsFlag: 1,
				mobile: detail.mobile,
				content: ''
			},

			// 扣押金有三种可能:
			// 1.押金充值在	3个月内：直接扣；
			// 2.押金充值超过3各个月：先拉黑；
			// 3.押金已经被提现：冻结用户押金(原来叫：设为失信用户)
			deductCashPledge: {
				depositState: 1,	// 押金状态
				depositAmount: '',
				remark: '',
				smsFlag: 1,
				mobile: detail.mobile,
				content: ''
			},

			noPunish: {},

			sendSms: {
				mobile: detail.mobile,
				content: ''
			},
		}
	}

	async componentWillMount() {
		let {detail} = this.props;
		let result = await transRecordApi.getDepositState({
			appUserId: detail.userId
		});

		if (result.resultCode == 1) {
			let {deductCashPledge} = this.state;
			deductCashPledge.depositState = 3; //result.data.depositState;
			this.setState({
				deductCashPledge
			})
		}
	}

	render() {
		let {deductScore, deductCashPledge} = this.state;
		return (
			<Box title="处理意见" icon="fa-tag">
				<p>鉴于订单的违规类别和信用积分，我们建议的处理意见为 扣积分 ，你也可以更改处理意见。</p>
				<Form horizontal>
					<Tabs model="type">
						<Tab title="扣积分">
							<Input label="扣除积分" model={'deductScore.creditScoreCount'} width={250}/>
							<Textarea label="备注" model={'deductScore.remark'} width={'50%'}/>
							<Checkbox model={'deductScore.smsFlag'} text="同时给违规人发送短信通知"/>
							{deductScore.smsFlag == 1 && <div>
								<Text label="手机号" model={'deductScore.mobile'}/>
								<Text label="发送目的" value="违规通知"/>
								<Textarea label="短信内容" model={'deductScore.content'} width={'50%'}/>
							</div>}
						</Tab>
						<Tab title="扣押金">
							{deductCashPledge.depositState == 1 && <div>
								<p className="text-red">*押金充值已经超过3个月了，暂时无法扣押金，先拉黑用户</p>
								<Input label="扣除金额" model={'deductCashPledge.depositAmount'} type="number" width={250}/>
								<Textarea label="备注" model={'deductCashPledge.remark'} width={'50%'}/>
								<Checkbox model={'deductCashPledge.smsFlag'} text="同时给违规人发送短信通知"/>
								{deductCashPledge.smsFlag == 1 && <div>
									<Text label="手机号" model={'deductCashPledge.mobile'}/>
									<Text label="发送目的" value="违规通知"/>
									<Textarea label="短信内容" model={'deductCashPledge.content'} width={'50%'}/>
								</div>}
							</div>}
							{deductCashPledge.depositState == 2 && <div>
								<p className="text-red">*押金充值已经超过3个月了，暂时无法扣押金，先拉黑用户</p>
								<Textarea label="备注" model={'deductCashPledge.remark'} width={'50%'}/>
								<p>拉黑后，用户无法再租用小蜜蜂。</p>
							</div>}
							{deductCashPledge.depositState == 3 && <div>
								<p className="text-red">*该用户押金已经提现，暂时无法扣押金，先冻结用户押金</p>
								<Textarea label="备注" model={'deductCashPledge.remark'} width={'50%'}/>
								<p>押金冻结后，用户无法自行提现。</p>
							</div>}
						</Tab>
						<Tab title="不处罚">
							<p>订单（编号：1213）符合如下第2点不处罚的情况，该违规人不不处罚。</p>
							<ol>
								<li>违停上报的时间点 处理订单未结束状态，不处罚</li>
								<li className="text-red">最近一次订单状态是已结束，里程＜500米，时长＜5分钟，不处罚</li>
								<li>最近一次订单与违停上报时间点相差超过5天，不处罚</li>
								<li>订单状态是＂开锁失败＂，不处罚</li>
							</ol>
						</Tab>
						<Tab title="发短信">
							<Text label="手机号" model={'sendSms.mobile'}/>
							<Text label="发送目的" value="违规通知"/>
							<Textarea label="短信内容" model={'sendSms.content'} width={'50%'}/>
						</Tab>
					</Tabs>
				</Form>
				<div className="pull-right">
					<Button value="取消" theme="default" margin/>
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
				this.confirmHandle_deductScore(type);
				break;
			case 2:
				this.confirmHandle_deductCashPledge(type);
				break;
			case 3:
				this.confirmHandle_noPunish(type);
				break;
			case 4:
				this.confirmHandle_sendSms(type);
				break;
			default:
				break;
		}

	}

	// 确认处理-扣积分
	async confirmHandle_deductScore(type) {
		let {detail} = this.props;
		let {deductScore} = this.state;

		let result = await tripProblemApi.confirmHandleDq({
			type,
			id: detail.id,
			appUserId: detail.userId,
			...deductScore
		});

		utils.alert(result.message);
		if (result.resultCode == 1) {
			// utils.alert(result.message);
		} else {
			// utils.alert(result.message);
		}
	}

	// 确认处理-扣押金
	async confirmHandle_deductCashPledge(type) {
		let {detail} = this.props;
		let {deductCashPledge} = this.state;

		let result = await tripProblemApi.confirmHandleDq({
			type,
			id: detail.id,
			appUserId: detail.userId,
			...deductCashPledge
		});

		utils.alert(result.message);
		if (result.resultCode == 1) {
			// utils.alert(result.message);
		} else {
			// utils.alert(result.message);
		}
	}

	// 确认处理-不处罚
	async confirmHandle_noPunish(type) {
		let {detail} = this.props;
		let {noPunish} = this.state;

		let result = await tripProblemApi.confirmHandleDq({
			type,
			id: detail.id,
			appUserId: detail.userId,
			...noPunish
		});

		utils.alert(result.message);
		if (result.resultCode == 1) {
			// utils.alert(result.message);
		} else {
			// utils.alert(result.message);
		}
	}

	// 确认处理-发短信
	async confirmHandle_sendSms(type) {
		let {detail} = this.props;
		let {sendSms} = this.state;

		let result = await tripProblemApi.confirmHandleDq({
			type,
			id: detail.id,
			appUserId: detail.userId,
			...sendSms
		});

		utils.alert(result.message);
		if (result.resultCode == 1) {
			// utils.alert(result.message);
		} else {
			// utils.alert(result.message);
		}
	}

}