import React from 'react';
import {Modal, Button, Box, DataTable, dtUtils} from "beefly-common";
import OrderDetail from '../blocks/OrderDetail';
import OrderCost from '../blocks/OrderCost';
import orderApi from "../../../apis/orderApi";
import bikeApi from '../../../apis/bikeApi';
import beefly from "../../../js/beefly";


/**
 * 订单详情 弹框
 */

export default class detailModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			show: false,
			id: '',
			detail: '',
			columns: [
				{title: '操作时间', data: 'bike.operTime', render: dtUtils.renderDateTime},
				{title: '操作内容', data: 'operateContent'},
			],
			query: {
				bikeCode: '',
			},
			columns1: [
				{title: '上报时间', data: 'updateTime'},
				{title: '订单里程', data: 'orderMileage'}
			],
			query1: {
				id: ''
			}

		}
	}

	render() {
		let {show, detail, columns, query, columns1, query1} = this.state;
		return (
			<Modal show={show} title="订单详情" size="lg" onHide={this.hide.bind(this)}>
				<Modal.Body>
					<OrderDetail detail={detail}/>
					<OrderCost detail={detail}/>
					<Box title="车辆操作日志">
						<DataTable ref={(e) => this._dataTable = e}
								   columns={columns} api={bikeApi.page} query={query}/>
					</Box>
					<Box title="订单上报日志">
						<DataTable ref={(e) => this._dataTable1 = e}
								   columns={columns1} api={orderApi.orderLog} query={query1}/>
					</Box>
				</Modal.Body>
				<Modal.Footer>
					<Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)}/>
				</Modal.Footer>
			</Modal>
		)
	}

	async show({id}) {

		let result = await orderApi.detail({orderId: id});
		let detail = result.data;
		this.setState({
			show: true,
			id,
			detail,
		});
		let {query, query1} = this.state;
		query.bikeCode = result.data.bikeCode;
		query1.id = result.data.id;
		// 车辆操作日志
		this._dataTable.search(query);
		// 订单上报日志
		this._dataTable1.search(query1);
	}

	hide() {
		this.setState({
			show: false
		})
	}

}
