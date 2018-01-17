import React from 'react';
import {Box, Button, Checkbox, Form, Input, Tab, Tabs, Text, Textarea, Select} from "beefly-common";
import {noPunishType,opinionType} from '../../../maps/illegalMap';
import tripProblemApi from "../../../apis/tripProblemApi";
import transRecordApi from "../../../apis/transRecordApi";
import beefly from "../../../js/beefly";
import creditScoreApi from "../../../apis/creditScoreApi";

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

			noPunish: {
				code:''
			},

			sendSms: {
				mobile: detail.mobile,
				content: ''
			},

			data: {
				text:'请选择原因', value: ''
			}
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

		//信用分次数
		this.fetchBuckleCount()
	}
	// 已扣信用分次数
	async fetchBuckleCount() {
		let {detail} = this.props;
		let result = await creditScoreApi.count({
			userId: detail.userId,
			unit: 0
		});
		if (result.resultCode === 1) {
			this.setState({
				type: result.data == 0? 0: 1
			})
		}
	}
	render() {
		let {deductScore, deductCashPledge ,data, type} = this.state;

		let {orderDetail} = this.props;
		return (
			<Box title="处理意见" icon="fa-tag">
				<p>鉴于订单的违规类别和信用积分，我们建议的处理意见为 {beefly.dtUtils.renderMap(type, opinionType)} ，你也可以更改处理意见。</p>
				<Form className="form-label-150" horizontal>
					<Tabs model="type">
						<Tab title="扣积分">
							<Input label="扣除积分" model={'deductScore.creditScoreCount'} width={250} validation={{required: true}}/>
							<Textarea label="备注" model={'deductScore.remark'} width={'50%'}/>
							<Checkbox model={'deductScore.smsFlag'} text="同时给违规人发送短信通知"/>
							{deductScore.smsFlag == 1 && <div>
								<Text label="手机号" model={'deductScore.mobile'}/>
								<Text label="发送目的" value="违规通知"/>
								<Textarea label="短信内容" model={'deductScore.content'} width={'50%'} validation={{required: true}}/>
							</div>}
						</Tab>
						<Tab title="扣押金">
							{deductCashPledge.depositState == 1 && <div>
								<p className="text-red">*押金充值已经超过3个月了，暂时无法扣押金，先拉黑用户</p>
								<Input label="扣除金额" model={'deductCashPledge.depositAmount'} type="number" width={250} validation={{required: true}}/>
								<Textarea label="备注" model={'deductCashPledge.remark'} width={'50%'} validation={{required: true}}/>
								<Checkbox model={'deductCashPledge.smsFlag'} text="同时给违规人发送短信通知"/>
								{deductCashPledge.smsFlag == 1 && <div>
									<Text label="手机号" model={'deductCashPledge.mobile'}/>
									<Text label="发送目的" value="违规通知"/>
									<Textarea label="短信内容" model={'deductCashPledge.content'} width={'50%'} validation={{required: true}}/>
								</div>}
							</div>}
							{deductCashPledge.depositState == 2 && <div>
								<p className="text-red">*押金充值已经超过3个月了，暂时无法扣押金，先拉黑用户</p>
								<Textarea label="备注" model={'deductCashPledge.remark'} width={'50%'} validation={{required: true}}/>
								<p>拉黑后，用户无法再租用小蜜蜂。</p>
							</div>}
							{deductCashPledge.depositState == 3 && <div>
								<p className="text-red">*该用户押金已经提现，暂时无法扣押金，先冻结用户押金</p>
								<Textarea label="备注" model={'deductCashPledge.remark'} validation={{required: true}}
										  width={'50%'}/>
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
							<Form horizontal>
							<Select width={250} label="请选择不处罚的原因"  wholeOption={data}  model="noPunish.code"  whole={true} options={noPunishType} validation={{required: true}}/>
							</Form>
						</Tab>
						<Tab title="发短信">
							<Text label="手机号" value={orderDetail ? orderDetail.mobile : '-'}/>
							<Text label="发送目的" value="违规通知"/>
							<Textarea label="短信内容" model={'sendSms.content'} width={'50%'} validation={{required: true}}/>
						</Tab>
					</Tabs>
				</Form>
				<div className="pull-right buttons">
					<Button value="取消" theme="default" onClick={() => beefly.tabs.closeTab()}/>
					<Button value="确定" onClick={this.confirmHandle.bind(this)}/>
				</div>
			</Box>
		)
	}


	// 确认处理
	confirmHandle() {
		let {detail, orderDetail} = this.props;
		let type = this.state.type + 1;

		if (!orderDetail) {
			beefly.gritter.error('该车辆无订单数据')
			return;
		}


		let params = {
			type,
			id: detail.id,
			appUserId: detail.userId,
			orderId: orderDetail.id,
		};

		switch (type) {
			case 1:
				this.confirmHandle_deductScore(params);
				break;
			case 2:
				this.confirmHandle_deductCashPledge(params);
				break;
			case 3:
				this.confirmHandle_noPunish(params);
				break;
			case 4:
				this.confirmHandle_sendSms(params);
				break;
			default:
				break;
		}

	}

	// 确认处理-扣积分
	async confirmHandle_deductScore(params) {
		let {deductScore} = this.state;

		if(deductScore.creditScoreCount == ''){
			beefly.gritter.warning("扣除积分不能为空");
			return
		}
		if(deductScore.smsFlag == 1&&deductScore.content == ''){
			beefly.gritter.warning("短信内容不能为空");
			return
		}

		let result = await tripProblemApi.confirmHandleDq({
			...params,
			...deductScore
		});

		if (result.resultCode == 1) {
			beefly.gritter.success(result.message, () => {
				beefly.tabs.closeTab()
			});
		}
	}

	// 确认处理-扣押金
	async confirmHandle_deductCashPledge(params) {
		let {deductCashPledge} = this.state;

		if(deductCashPledge.remark == ''){
			beefly.gritter.warning("备注不能为空");
			return
		}
		let result = await tripProblemApi.confirmHandleDq({
			...params,
			...deductCashPledge
		});

		if (result.resultCode == 1) {
			beefly.gritter.success(result.message, () => {
				beefly.tabs.closeTab()
			});
		}
	}

	// 确认处理-不处罚
	async confirmHandle_noPunish(params) {
		let {noPunish} = this.state;
		if(noPunish.code == ''){
			beefly.gritter.warning("请选择原因");
			return
		}
		let result = await tripProblemApi.confirmHandleDq({
			...params,
			...noPunish
		});

		if (result.resultCode == 1) {
			beefly.gritter.success(result.message, () => {
				beefly.tabs.closeTab()
			});
		}
	}

	// 确认处理-发短信
	async confirmHandle_sendSms(params) {
		let {sendSms} = this.state;

		if(sendSms.content == ''){
			beefly.gritter.warning("短信内容不能为空");
			return
		}
		let result = await tripProblemApi.confirmHandleDq({
			...params,
			...sendSms
		});

		if (result.resultCode == 1) {
			beefly.gritter.success(result.message, () => {
				beefly.tabs.closeTab()
			});
		}
	}

}
