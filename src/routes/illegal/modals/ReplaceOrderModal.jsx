import React from 'react';
import beefly from "../../../js/beefly";
import {Form, Modal, DataTable, dtUtils} from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";

/**
 * 更换订单弹框
 */
export default class ReplaceOrderModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			bikeCode: '',
			id: '',
			mobile: '',
			columns: [
				{title: '#', data: 'id', render: this.renderRadio.bind(this)},
				{title: '订单编号', data: 'id'},
				{title: '用户编号', data: 'userId'},
				{title: '手机号码', data: 'mobile'},
				{title: '下单时间', data: 'placeOrderTime', render: dtUtils.renderDateTime},
				{title: '结束时间', data: 'endTime', render: dtUtils.renderDateTime},
				{title: '取车时续航里程（m）', data: 'leftMileage'},
				{title: '取车地点', data: 'pickLocation'},
				{title: '骑行时间（m）', data: 'timeInOrder', render: (data) => dtUtils.renderNumber(data, '0.0')},
				{title: '骑行里程（m）', data: 'mileage'},
				{title: '订单费用（￥）', data: 'actualAmount', render: (data) => dtUtils.renderNumber(data, '0.0')},
				{title: '订单状态', data: 'state'},
			],

			query: {
				'bikeCode': '',
				'beginDate': '',
			},
		};
		beefly.radio = this.radio.bind(this);
	}

	renderRadio(data, type, row){
		return `<input name="Fruit" type="radio" value="" onclick=beefly.radio('${row.id},${row.mobile}') />`
	}

	render() {
		let {show, columns, query, bikeCode} = this.state;
		return (
			<Modal show={show} title="更改订单" size="lg" onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
				<Form>
					<div>车辆编号：{bikeCode}</div><hr/>
					<h5><b>订单记录</b></h5>
					<DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={tripProblemApi.orderPage} query={query}/>
				</Form>
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
		this.setState({
			show: false,
		})
	}
    //选中的数据
	radio(data){
		let m = data.split(",");
		this.setState({
			id: m[0],
			mobile: m[1]
		});
		console.log(this.state.id, 888888)
		console.log(this.state.mobile, 888888)
	}

}
