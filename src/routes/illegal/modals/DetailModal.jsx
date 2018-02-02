import React from 'react';
import {Modal, Button, Box, DataTable, dtUtils} from "beefly-common";
import OrderDetail from '../blocks/OrderDetail';
import OrderCost from '../blocks/OrderCost';
import orderApi from "../../../apis/orderApi";
import bikeLogApi from '../../../apis/bikeLogApi';
import beefly from "../../../js/beefly";


/**
 * 订单详情 弹框
 */

export default class detailModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			show: false,
			detail: '',
			columns: [
				{title: '操作时间', data: 'operationTime', render: dtUtils.renderDateTime},
				{title: '操作内容', data: 'operationContent'},
			],
			columns1: [
				{title: '上报时间', data: 'updateTime'},
				{title: '订单里程', data: 'orderMileage'}
			],
		}
	}

	render() {
		let {show, detail, columns, columns1,} = this.state;
		return (
			
			<Modal show={show} title="订单详情" size="lg" onHide={this.hide.bind(this)}>
				{show &&
					<div>
						<Modal.Body>
							<OrderDetail detail={detail}/>
							<OrderCost detail={detail}/>
							<Box title="车辆操作日志">
								<DataTable ref={(e) => this._dataTable = e}
										   columns={columns} api={bikeLogApi.bikeLog} query={{orderId: detail.id}} paging={false} info={false}/>
							</Box>
							<Box title="订单上报日志">
								<DataTable ref={(e) => this._dataTable1 = e}
										   columns={columns1} api={orderApi.orderLog} query={{id: detail.id}}/>
							</Box>
						</Modal.Body>
						<Modal.Footer>
							<Button value={'关闭'} theme={'default'} onClick={this.hide.bind(this)}/>
						</Modal.Footer>
					</div>
				}
			</Modal>
	
		)
	}

	async show({id}) {

		let result = await orderApi.detail({orderId: id});
		let detail = result.data;
		this.setState({
			show: true,
			detail,
		});
	}

	hide() {
		this.setState({
			show: false
		})
	}

}
