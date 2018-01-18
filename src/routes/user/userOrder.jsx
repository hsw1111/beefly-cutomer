import React from 'react';
import {Box, Form, Text, Row, Col, Button, Content, DataTable} from "beefly-common";
import {urlUtils} from 'jeselvmo';
import appUserApi from "../../apis/appUserApi";
import beefly from "../../js/beefly";
import Detail from "./blocks/Details";
import orderApi from "../../apis/orderApi";

/**
 * 查看订单
 */
export default class IllegalDetails extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
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
			orderData: {},
			query: {
				'appUserId': '',
			},
		}
	}

	async componentWillMount() {
		let {id} = urlUtils.getParams();
		let {query} = this.state;
		query.appUserId=id;
	}

	render() {
		let {orderData,columns, query} = this.state;
			return (
				<Box>
					<Form className="form-label-150" horizontal>
						<Row>
							<Col md={5}>
								<Text label="用户编号" value={orderData.userId}/>
								<Text label="用户姓名" value={orderData.userName}/>
							</Col>
							<Col md={7}>
								<Text label="用户状态" value={orderData.id}/>
								<Text label="信用积分" value={orderData.id}/>
							</Col>
						</Row>
					</Form>
					<DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={orderApi.page} query={query}/>
				</Box>
			)
	}

	//关闭详情
	closed() {
		beefly.tabs.closeTab();
	}
}
