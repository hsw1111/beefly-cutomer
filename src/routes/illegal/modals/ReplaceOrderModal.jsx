import React from 'react';
import beefly from "../../../js/beefly";
import {Button, DataTable, Form, Modal} from "beefly-common";
import orderApi from "../../../apis/orderApi";

/**
 * 更换订单弹框
 */
export default class ReplaceOrderModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			bikeCode: '',
			columns: [
				{title: '#', data: 'id', render: this.renderRadio.bind(this)},
				{title: '订单编号', data: 'id'},
				{title: '用户编号', data: 'userId'},
				{title: '手机号码', data: 'mobile'},
				{title: '下单时间', data: 'placeOrderTime', render: beefly.dtUtils.renderDateTime},
				{title: '结束时间', data: 'endTime', render: beefly.dtUtils.renderDateTime},
				{title: '取车时续航里程（m）', data: 'leftMileage'},
				{title: '取车地点', data: 'pickLocation'},
				{title: '骑行时间（m）', data: 'timeInOrder', render: (data) => beefly.dtUtils.renderNumber(data, '0.0')},
				{title: '骑行里程（m）', data: 'mileage'},
				{title: '订单费用（￥）', data: 'actualAmount', render: (data) => beefly.dtUtils.renderNumber(data, '0.0')},
				{title: '订单状态', data: 'state'},
			],

			query: {
				'bikeCode': '',
				'beginDate': '',
			},
			// 选中的订单id
			orderId: '',
		};
		beefly.selectOrder = this.selectOrder.bind(this);
	}

	renderRadio(data, type, row) {
		return `<input name="radio" type="radio" value="" onclick="beefly.selectOrder(${row.id})" />`
	}

	render() {
		let {show, columns, query, bikeCode} = this.state;
		return (
			<Modal show={show} title="更改订单" size="lg" onHide={this.hide.bind(this)}>
				<Modal.Body style={{height: 600}}>
					<Form>
						<div>车辆编号：{bikeCode}</div>
						<hr/>
						<h5><b>订单记录</b></h5>
						<DataTable ref={(e) => this._dataTable = e}
								   columns={columns} api={orderApi.page} query={query}/>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)}/>
					<Button value={'确定'} onClick={this.ok.bind(this)}/>
				</Modal.Footer>
			</Modal>
		)
	}

	show(data) {
		this.setState({
			show: true,
			bikeCode: data.bikeCode
		});
		let {query} = this.state;
		query.bikeCode = data.bikeCode;
		query.beginDate = data.beginDate;
		this._dataTable.search(query);
	}

	hide() {
		this.setState({
			show: false
		})
	}

	async ok() {
		let {orderId} = this.state;
		let {onChange} = this.props;
		if (orderId) {
			this.setState({
				show: false,
			})

			onChange && onChange(orderId)
		} else {
			beefly.gritter.info('请选择一个订单')
		}
	}

	//选中的数据
	selectOrder(orderId) {
		this.setState({
			orderId
		})
	}

}
