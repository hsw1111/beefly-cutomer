import React from 'react';
import {observer} from 'mobx-react';
import {Box, Button, Checkbox, Form, Input, Tab, Tabs, Text, Textarea, Select, tabUtils, msgBox} from "beefly-common";
import {noPunishType} from '../../../maps/illegalMap';
import tripProblemApi from "../../../apis/tripProblemApi";
import transRecordApi from "../../../apis/transRecordApi";
import beefly from "../../../js/beefly";
import creditScoreApi from "../../../apis/creditScoreApi";
import illegalStore from "../stores/illegalStore";
import {localStore} from 'jeselvmo';
import cs from "classnames"

/**
 * 违停上报 处理意见
 */
const opinionType = {
	0: '扣积分',
	1: '扣押金',
	2: '不处罚',
	3: '发短信',
};

const commitType = {
	1: 1,
	2: 5,
	3: 4,
	4: 6,
};
/**
 * 处理意见
 */
@observer
export default class HandleSuggestion extends React.Component {

	constructor(props) {
		super(props);

		let {detail} = illegalStore;
		this.state = {
			deductScore: {
				creditScoreCount: 10,
				remark: '',
				smsFlag: 1,
				// mobile: detail.mobile,
				content: ''
			},

			// 扣押金有三种可能:
			// 1.押金充值在	3个月内：直接扣；
			// 2.押金充值超过3各个月：先拉黑；
			// 3.押金已经被提现：冻结用户押金(原来叫：设为失信用户)
			deductCashPledge: {
				// depositState: 1,	// 押金状态
				depositAmount: '',
				remark: '',
				smsFlag: 1,
				// mobile: detail.mobile,
				content: ''
			},

			noPunish: {
				code: ''
			},

			sendSms: {
				// mobile: detail.mobile,
				content: ''
			},

			data: {
				text: '请选择原因', value: ''
			}
		}
	}

	render() {
		let {deductScore, deductCashPledge, data, proposal} = this.state;
		let {detail, orderDetail, actualHandleType, suggestHandleType, depositState} = illegalStore;
		if (!orderDetail) {
			return null;
		}
		let mobile = orderDetail.mobile || '-';

		// if(!detail.content.includes('双人骑行')){
        //
		// }
		console.log(detail.content.includes('双人骑行'));

		//
		let noPunishLis = [
			{
				value: orderDetail.endTime > detail.createTime || '',
				text: '违停上报的时间点 处理订单未结束状态，不处罚'
			},
			{
				value: orderDetail.orderFlow ==3 && (orderDetail.mileage < 500 || orderDetail.timeInOrder < 5),
				text: '最近一次订单状态是已结束，里程＜500米，时长＜5分钟，不处罚'
			},
			{
				value: beefly.DateMinus(orderDetail.placeOrderTime, detail.createTime) > 5,
				text: '最近一次订单与违停上报时间点相差超过5天，不处罚'
			},
			{
				value: orderDetail.orderFlow == 10,
				text: '订单状态是＂开锁失败＂，不处罚'
			},
		];
		let noPunishActiveLis = [];
		noPunishLis.forEach((d, i)=>{
			if(d.value){
				noPunishActiveLis.push(i + 1);
			}
		});

		return (
			<Box title="处理意见" icon="fa-tag">
				<p>鉴于订单的违规类别和信用积分，我们建议的处理意见为 <span className="text-orange h5">{opinionType[suggestHandleType]}</span> ，你也可以更改处理意见。</p>
				<Form className="form-label-150" horizontal>
					<Tabs value={actualHandleType}
						  onChange={(index) => illegalStore.actualHandleType = index}>
						<Tab title="扣积分">
							<Input label="扣除积分" model={'deductScore.creditScoreCount'} width={250}
								   validation={{required: true}}/>
							<Textarea label="备注" model={'deductScore.remark||""'} width={'50%'}/>
							<Checkbox model={'deductScore.smsFlag'} text="同时给违规人发送短信通知"/>
							{deductScore.smsFlag == 1 && <div>
								<Text label="手机号" value={mobile}/>
								<Text label="发送目的" value="违规通知"/>
								<Textarea label="短信内容" model={'deductScore.content'} width={'50%'}
										  validation={{required: true}}/>
							</div>}
						</Tab>
						<Tab title="扣押金">
							{depositState == 1 && <div>
								<p className="text-red">*押金充值在3个月内：直接扣</p>
								<Input label="扣除金额" model={'deductCashPledge.depositAmount'} type="number" width={250}
									   validation={{required: true}}/>
								<Textarea label="备注" model={'deductCashPledge.remark'} width={'50%'}
										  validation={{required: true}}/>
								<Checkbox model={'deductCashPledge.smsFlag'} text="同时给违规人发送短信通知" onChange={(e)=>console.log(e, '............................')}/>
								{deductCashPledge.smsFlag == 1 && <div>
									<Text label="手机号" value={mobile}/>
									<Text label="发送目的" value="违规通知"/>
									<Textarea label="短信内容" model={'deductCashPledge.content'} width={'50%'}
											  validation={{required: true}}/>
								</div>}
							</div>}
							{depositState == 2 && <div>
								<p className="text-red">*押金充值超过3各个月：先拉黑</p>
								<Textarea label="备注" model={'deductCashPledge.remark'} width={'50%'}
										  validation={{required: true}}/>
								<p>拉黑后，用户无法再租用小蜜蜂。</p>
							</div>}
							{depositState == 3 && <div>
								<p className="text-red">*押金已经被提现：冻结用户押金押金状态 </p>
								<Textarea label="备注" model={'deductCashPledge.remark'} validation={{required: true}}
										  width={'50%'}/>
								<p>押金冻结后，用户无法自行提现。</p>
							</div>}
						</Tab>
						<Tab title="不处罚">
							{!detail.content.includes('双人骑行')&& <div><p>订单（编号：<span>{orderDetail.id}</span>）符合如下第{noPunishActiveLis.join('、')}点不处罚的情况，该违规人不不处罚。</p>
							<ol>
								{noPunishLis.map((d, i) => (
									<li className={cs({'text-red': d.value})} key={i}>{d.text}</li>
								))}
							</ol></div>}
							<Form horizontal>
								<Select width={250} label="请选择不处罚的原因" wholeOption={data} model="noPunish.code"
										whole={true} options={noPunishType} validation={{required: true}}/>
							</Form>
						</Tab>
						<Tab title="发短信">
							<Text label="手机号" value={mobile}/>
							<Text label="发送目的" value="违规通知"/>
							<Textarea label="短信内容" model={'sendSms.content'} width={'50%'}
									  validation={{required: true}}/>
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

	componentWillReceiveProps(nextProps){
		if(this.props.orderId !== nextProps.orderId){
			this.reset();
		}
	}

	reset(){
		this.setState({
			deductScore: {
				creditScoreCount: 10,
				remark: '',
				smsFlag: 1,
				content: ''
			},

			// 扣押金有三种可能:
			// 1.押金充值在	3个月内：直接扣；
			// 2.押金充值超过3各个月：先拉黑；
			// 3.押金已经被提现：冻结用户押金(原来叫：设为失信用户)
			deductCashPledge: {
				// depositState: 1,	// 押金状态
				depositAmount: '',
				remark: '',
				smsFlag: 1,
				content: ''
			},

			sendSms: {
				content: ''
			},
		})
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
		let {detail, orderDetail, actualHandleType,transId} = illegalStore;

		let type = commitType[actualHandleType + 1];
		if (!orderDetail) {
			msgBox.error('该车辆无订单数据');
			return;
		}


		let params = {
			type,
			id: detail.id,
			appUserId: orderDetail.userId,
			orderId: orderDetail.id,
			transId:transId
		};

		switch (type) {
			case 1:
				this.confirmHandle_deductScore(params);
				break;
			case 5:
				this.confirmHandle_deductCashPledge(params);
				break;
			case 4:
				this.confirmHandle_noPunish(params);
				break;
			case 6:
				this.confirmHandle_sendSms(params);
				break;
			default:
				break;
		}

	}

	// 确认处理-扣积分
	async confirmHandle_deductScore(params) {
		let {deductScore} = this.state;

		if (deductScore.creditScoreCount == '') {
			msgBox.warning("扣除积分不能为空");
			return
		}
		if (deductScore.smsFlag == 1 && deductScore.content == '') {
			msgBox.warning("短信内容不能为空");
			return
		}

		let result = await tripProblemApi.confirmHandleDq({
			...params,
			...deductScore,
			mobile: illegalStore.orderDetail.mobile
		});

		if (result.resultCode == 1) {
			localStore.set('illegalState',5);
			msgBox.success(result.message, () => {
				tabUtils.closeTab();
			});
		}
	}

	// 确认处理-扣押金
	async confirmHandle_deductCashPledge(params) {
		let {deductCashPledge} = this.state;

		if (deductCashPledge.remark == '') {
			msgBox.warning("备注不能为空");
			return
		}
		let result = await tripProblemApi.confirmHandleDq({
			...params,
			...deductCashPledge,
			depositState: illegalStore.depositState,
			mobile: illegalStore.orderDetail.mobile
		});

		if (result.resultCode == 1) {
			localStore.set('illegalState',5);
			msgBox.success(result.message, () => {
				tabUtils.closeTab()
			});
		}
	}

	// 确认处理-不处罚
	async confirmHandle_noPunish(params) {
		let {noPunish} = this.state;
		if (noPunish.code == '') {
			msgBox.warning("请选择原因");
			return
		}
		let result = await tripProblemApi.confirmHandleDq({
			...params,
			...noPunish
		});

		if (result.resultCode == 1) {
			localStore.set('illegalState',5);
			msgBox.success(result.message, () => {
				tabUtils.closeTab();
			});
		}
	}

	// 确认处理-发短信
	async confirmHandle_sendSms(params) {
		let {sendSms} = this.state;

		if (sendSms.content == '') {
			msgBox.warning("短信内容不能为空");
			return
		}
		let result = await tripProblemApi.confirmHandleDq({
			...params,
			...sendSms,
			mobile: illegalStore.orderDetail.mobile
		});

		if (result.resultCode == 1) {
			localStore.set('illegalState',5);
			msgBox.success(result.message, () => {
				tabUtils.closeTab();
			});
		}
	}

}
