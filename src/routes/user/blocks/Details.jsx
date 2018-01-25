import React from 'react';
import {observer} from 'mobx-react';
import {Box, Field, Form, Text, Row, Col, Tab, Tabs,DataTable} from "beefly-common";
import {reportState,handleType} from '../../../maps/illegalMap';
import couponApi from "../../../apis/couponApi";
import userStore from "../../../stores/userStore";
import orderApi from "../../../apis/orderApi";


/**
 * 详情
 */
@observer
export default class Detail extends React.Component {

	constructor(props) {
		super(props);

		let {detail} = userStore;
		this.state = {
			type:0,
			columns: [
				{title: '订单编号', data: 'id'},
				{title: '下单时间', data: 'placeOrderTime'},
				{title: '结束时间', data: 'endTime'},
				{title: '取车时续航里程', data: 'leftMileage'},
				{title: '车辆编号', data: 'bikeCode'},
				{title: '取车地点', data: 'pickLocation'},
				{title: '骑行时间（m）', data: 'timeInOrder'},
				{title: '骑行里程（m）', data: 'mileage'},
				{title: '订单费用（￥）', data: 'actualAmount'},
				{title: '订单状态', data: 'state'},
			],
			query: {
				'appUserId': '',
			},
		}

	}
	async componentWillMount() {
		let {detail} = userStore;
		let {query} = this.state;
		query.appUserId=detail.id;
		userStore.fetchDetail()
	}

	render() {
		let {showHandle, showRemarks,columns,query} = this.props;
		let {detail} = userStore;
		return (
			<Box>
				<Form className="form-label-150" horizontal>
					<Row>
						<Col md={5}>
							<Text label="用户编号" value={detail.id}/>
							<Text label="用户姓名" value={detail.name}/>
							<Text label="手机号" value={detail.mobile}/>
							<Text label="所属城市" value={detail.cityName}/>
							<Text label="余额" value={detail.totalBalance}/>
							<Text label="注册时间" value={detail.ctrTime}/>
						</Col>
						<Col md={7}>
							<Text label="用户状态" value={detail.name}/>
							<Text label="信用积分" value={detail.credScore}/>
							<Text label="押金状态" value={detail.name}/>
							<Text label="最近一次订单" value={detail.orderId}/>
							<Text label="最近一次订单时间" value={detail.orderTime}/>
						</Col>
					</Row>
				</Form>
				<Tabs model="type">
					<Tab title="余额">
						<DataTable ref={(e) => this._dataTable = e}
								   columns={columns} api={orderApi.page} query={query}/>
					</Tab>
					<Tab title="押金">
						<Text label="发送目的" value="违规通知"/>
					</Tab>
					<Tab title="出行券">
						<Text label="发送目的" value="违规通知"/>
					</Tab>
					<Tab title="权益卡">
						<Text label="发送目的" value="违规通知"/>
					</Tab>
					<Tab title="信用积分">
						<Text label="发送目的" value="违规通知"/>
					</Tab>
					<Tab title="拉黑">
						<Text label="发送目的" value="违规通知"/>
					</Tab>
				</Tabs>
			</Box>
		)
	}
}
