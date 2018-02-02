import React from 'react';
import {observer} from 'mobx-react';
import {Box, Form, Text, Row, Col, Button, Content, DataTable, dtUtils} from "beefly-common";
import {urlUtils} from 'jeselvmo';
import userApi from "../../apis/userApi";
import beefly from "../../js/beefly";
import Detail from "./blocks/Details";
import orderApi from "../../apis/orderApi";
import userStore from "../../stores/userStore";
import EndOrderModal from "./modals/EndOrderModal"
import OpenLockModal from "./modals/OpenLockModal"
import CloseLockModal from "./modals/CloseLockModal"
import OrderDetailModal from "./modals/OrderDetailModal"
/**
 * 查看订单
 */
@observer
export default class userOrder extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			columns: [
				{title: '订单编号', data: 'id', render: this.renderId.bind(this)},
				{title: '下单时间', data: 'placeOrderTime'},
				{title: '结束时间', data: 'endTime'},
				{title: '取车时续航里程', data: 'leftMileage'},
				{title: '车辆编号', data: 'bikeCode'},
				{title: '取车地点', data: 'pickLocation'},
				{title: '骑行时间（m）', data: 'timeInOrder'},
				{title: '骑行里程（m）', data: 'mileage'},
				{title: '订单费用（￥）', data: 'actualAmount'},
				{title: '订单状态', data: 'state'},
				{title: '操作', type: 'object', render: this.renderActions},
			],
			orderData: {},
			query: {
				'appUserId': '',
			},
		}
		beefly.endOrder = this.endOrder.bind(this);
		beefly.openLock = this.openLock.bind(this);
		beefly.closeLock = this.closeLock.bind(this);
		beefly.orderDetails = this.orderDetails.bind(this);
	}

	renderId(data, type, row){
		return `<a href="javascript:beefly.orderDetails('${data}')">${data}</a>`
	}
	renderActions(data, type, row) {

		let actions = [
			{text: '结束订单', icon: 'search', onclick: `beefly.endOrder('${row.id},${row.bikeCode}')`, visible: row.state == '未取车' || row.state == '已取车' || row.state == '开锁中'},
			{text: '车辆开锁', icon: 'user-plus', onclick: `beefly.openLock('${row.id},${row.bikeCode}')`, visible: row.state == '已结束' || row.state == '开锁失败' || row.state == '已取车' || row.state == '开锁中' || row.state == '已取消' || row.state == '人工结束'},
			{text: '车辆关锁', icon: 'user-plus', onclick: `beefly.closeLock('${row.id},${row.bikeCode}')`, visible: row.state == '已结束' || row.state == '开锁失败' || row.state == '已取车' || row.state == '开锁中' || row.state == '已取消' || row.state == '人工结束'},
		];

		return dtUtils.renderActions(actions, 'dropdown')
	}

	componentWillMount() {
		let {id} = urlUtils.getParams();
		let {query} = this.state;
		query.appUserId=id;
		userStore.fetchDetail();
	}

	render() {
		let {columns, query} = this.state;
		let {detail} = userStore;
		if(detail){
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
								<Text label="所属城市" value={detail.registerCity}/>
							</Col>
						</Row>
					</Form>
					<hr/>
					<p className="margin-t-10">
						<h4><b>订单信息</b></h4>
					</p>
					<DataTable ref={(e) => this._dataTable = e}
					columns={columns} api={orderApi.page} query={query}/>
					<EndOrderModal ref={(e) => this._endOrderModal = e} onSuccess={this.search.bind(this)}/>
					<OpenLockModal ref={(e) => this._openLockModal = e} onSuccess={this.search.bind(this)}/>
					<CloseLockModal ref={(e) => this._closeLockModal = e}  onSuccess={this.search.bind(this)}/>
					<OrderDetailModal ref={(e) => this._orderDetailModal = e} />
				</Box>
			)

		}
		return null
	}
	// 查询列表
	search(){
		let {query} = this.state;
		this._dataTable.search(query);
	}

	// 订单详情
	orderDetails(data){
		this._orderDetailModal.show({id: data})
	}


	//结束订单
	endOrder(data){
		let m = data.split(",");
		this._endOrderModal.show({
			id: m[0],
			bikeCode: m[1]
		});
	}

	//开锁
	openLock(data){
		let m = data.split(",");
		this._openLockModal.show({
			id: m[0],
			bikeCode: m[1]
		});
	}

	//关琐
	closeLock(data){
		let m = data.split(",");
		this._closeLockModal.show({
			id: m[0],
			bikeCode: m[1]
		});
	}

}

