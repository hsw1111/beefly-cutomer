import React from 'react';
import {observer} from 'mobx-react';
import {Box, Form, Text, Row, Col, Button, Content, DataTable} from "beefly-common";
import {urlUtils} from 'jeselvmo';
import appUserApi from "../../apis/appUserApi";
import beefly from "../../js/beefly";
<<<<<<< HEAD
import Detail from "./blocks/Details";
=======
>>>>>>> 89c5ba43d0e75cdba67d33c9b094b3eefbf8b8e6
import orderApi from "../../apis/orderApi";
import userStore from "../../stores/userStore";
/**
 * 查看订单
 */
@observer
<<<<<<< HEAD
export default class IllegalDetails extends React.Component {

	constructor(props) {
=======
export default class userOrder extends React.Component {

	constructor(props){
>>>>>>> 89c5ba43d0e75cdba67d33c9b094b3eefbf8b8e6
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
<<<<<<< HEAD
			orderData: {},
=======
>>>>>>> 89c5ba43d0e75cdba67d33c9b094b3eefbf8b8e6
			query: {
				'appUserId': '',
			},
		}
	}

<<<<<<< HEAD
	async componentWillMount() {
		userStore.fetchDetail();
		// let {detail} = userStore;
		// let {id} = urlUtils.getParams();
		// let {query} = this.state;
		// query.appUserId=id;
=======
	componentWillMount() {
		let {id} = urlUtils.getParams();
		let {query} = this.state;
		query.appUserId=id;
		userStore.fetchDetail()
>>>>>>> 89c5ba43d0e75cdba67d33c9b094b3eefbf8b8e6
	}

	render() {
		let {columns, query} = this.state;
		let {detail} = userStore;
<<<<<<< HEAD
		console.log(detail);
=======
		if(detail){
>>>>>>> 89c5ba43d0e75cdba67d33c9b094b3eefbf8b8e6
			return (
				<Box>
					<Form className="form-label-150" horizontal>
						<Row>
							<Col md={5}>
								<Text label="用户编号" value={detail.id}/>
								<Text label="手机号" value={detail.mobile}/>
							</Col>
							<Col md={7}>
								<Text label="用户姓名" value={detail.name}/>
								<Text label="所属城市" value={detail.cityName}/>
							</Col>
						</Row>
					</Form>
<<<<<<< HEAD
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
=======
					<hr/>
					<p className="margin-t-10">
						<h4><b>订单信息</b></h4>
					</p>
					<DataTable ref={(e) => this._dataTable = e}
					columns={columns} api={orderApi.page} query={query}/>
				</Box>
			)

		}
		return null
	}
}

>>>>>>> 89c5ba43d0e75cdba67d33c9b094b3eefbf8b8e6
