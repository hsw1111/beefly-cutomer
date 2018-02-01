import React from 'react';
import {observer} from 'mobx-react';
import {Box, Form, Text, Row, Col, Tab, Tabs,DataTable,dtUtils} from "beefly-common";
import {integralType, rewardType,} from '../../../maps/illegalMap';
import {depositState} from '../../../maps/userMap';
import userStore from "../../../stores/userStore";
import appUserApi from "../../../apis/appUserApi";


/**
 * 用户详情
 */
@observer
export default class Detail extends React.Component {

	constructor(props) {
		super(props);

		let {detail} = userStore;
		this.state = {
			type:0,
			//余额
			columns_balance: [
				{title: '编号', data: 'id'},
				{title: '时间', data: 'createTime'},
				{title: '操作人', data: 'createdName'},
				{title: '增加/减少金额', data: 'amount', render: (data, type, row) => (row.modifyType == 1 ?'+':'-') + data},
				{title: '当前总余额', data: 'newBalance'},
				{title: '备注', data: 'remark'},
			],
			//押金
			columns_deposit: [
				{title: '操作类型', data: 'typeStr'},
				{title: '操作人', data: 'createName'},
				{title: '操作时间', data: 'createTime'},
				{title: '备注信息', data: 'remark'},
			],
			//出行券
			columns_voucher: [
				{title: '编号', data: 'id'},
				{title: '发放金额', data: 'amount'},
				{title: '获得时间', data: 'receiveDate'},
				{title: '消费时间', data: 'useTime'},
				{title: '消费订单', data: 'orderId'},
				{title: '到期时间', data: 'validityEndDate'},
				{title: '获得类型', data: 'receiveWayStr'},
			],
			//信用积分
			columns_integral: [
				{title: '编号', data: 'id'},
				{title: '操作时间', data: 'createTime'},
				{title: '操作人', data: 'createName'},
				{title: '奖惩类型', data: 'unit', render: this.renderIntegral.bind(this)},
				{title: '处理类型', data: 'type', render: (data) => dtUtils.renderMap(data, integralType)},
				{title: '积分', data: 'value', render: (data, type, row) => (row.unit == 0 ? '+' : '-') + data},
				{title: '剩余总积分', data: 'newValue'},
				{title: '备注', data: 'remark'},
			],
			//拉黑
			columns_black: [
				{title: '操作类型', data: 'typeStr'},
				{title: '操作人', data: 'createName'},
				{title: '操作时间', data: 'createTime'},
				{title: '备注信息', data: 'remark'},
			],
			query: {
				'appUserId': '',
				'type':''
			},
		}

	}
	componentWillMount() {
		let {detail} = userStore;
		userStore.fetchDetail();
	}

	renderIntegral(data, type, row){
		if(row.unit == 0){
			return `<span>${dtUtils.renderMap(data, rewardType)}</span>`
		}else{
			return `<span class="label label-danger">${dtUtils.renderMap(data, rewardType)}</span>`
		}
  }
	render() {
		let {columns_voucher, columns_deposit,columns_balance,columns_integral,columns_black} = this.state;
		let {detail} = userStore;
		return (
			<Box>
				<Form className="form-label-150" horizontal>
					<Row>
						<Col md={5}>
							<Text label="用户编号" value={detail.id}/>
							<Text label="用户姓名" value={detail.name}/>
							<Text label="手机号" value={detail.mobile}/>
							<Text label="所属城市" value={detail.registerCity}/>
							<Text label="余额" value={(detail.balance || 0) + (detail.grantBalance || 0)}/> <span style={{position: 'absolute', top: 138, left: 235}}>（充值金额{detail.balance || 0}元+赠送金额{detail.grantBalance || 0}元）</span>
							<Text label="注册时间" value={detail.registerTime}/>
						</Col>
						<Col md={7}>
							<Text label="用户状态" value={detail.userStatusName}/>
							<Text label="信用积分" value={detail.credScore}/>
							<Text label="押金状态" value={depositState[detail.creditLimit]}/>
							<Text label="最近一次订单" value={detail.orderId}/>
							<Text label="最近一次订单时间" value={detail.orderTime}/>
						</Col>
					</Row>
				</Form>
				<hr/>
				<div className="margin-t-30">
					<p className="margin-t-10">
						<h4><b>备注信息</b></h4>
					</p>
					<Tabs model="type">
						<Tab title="余额">
							<DataTable ref={(e) => this._dataTable = e}
									   columns={columns_balance} api={appUserApi.recordPage} query={{appUserId:detail.id,type:1}}/>
						</Tab>
						<Tab title="押金">
							<DataTable ref={(e) => this._dataTable = e}
									   columns={columns_deposit} api={appUserApi.recordPage} query={{appUserId:detail.id,type:2}}/>
						</Tab>
						<Tab title="出行券">
							<DataTable ref={(e) => this._dataTable = e}
									   columns={columns_voucher} api={appUserApi.recordPage} query={{appUserId:detail.id,type:3}}/>
						</Tab>
						<Tab title="信用积分">
							<DataTable ref={(e) => this._dataTable = e}
									   columns={columns_integral} api={appUserApi.recordPage} query={{appUserId:detail.id,type:4}}/>
						</Tab>
						<Tab title="拉黑">
							<DataTable ref={(e) => this._dataTable = e}
									   columns={columns_black} api={appUserApi.recordPage} query={{appUserId:detail.id,type:5}}/>
						</Tab>
					</Tabs>
				</div>
			</Box>
		)
	}

}
