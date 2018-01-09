import React from 'react';
import {Form, Modal, dtUtils, DataTable} from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
import {rewardType, integralType} from '../../../maps/illegalMap';
/**
 * 信用积分弹框
 */
export default class IntegralModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			columns: [
				{title: '编号', data: 'id'},
				{title: '操作时间', data: 'createTime'},
				{title: '操作人', data: 'manageName'},
				{title: '奖惩类型', data: 'unit', render: (data)=> dtUtils.renderMap(data, rewardType)},
				{title: '处理类型', data: 'type', render: (data)=> dtUtils.renderMap(data, integralType)},
				{title: '积分', data: 'value'},
				{title: '剩余总积分', data: 'newValue'},
				{title: '备注', data: 'unit'},
			],
			query: {
				'userId': '',
			},
		}

	}

	render() {
		let {show, columns, query} = this.state;
		return (
			<Modal show={show} title="信用积分" onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
				<Form>
					<div>用户编号：666666     手机号：13624151215</div><hr/>
					<h5><b>积分奖励记录</b></h5>
					<DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={tripProblemApi.creditScorepage} query={query}/>
				</Form>
			</Modal>
		)
	}

	show({id}) {
		this.setState({
			show: true,
		});
		let {query} = this.state;
		query.userId = 761228;
		this._dataTable.search(query);
	}

	hide() {
		this.setState({
			show: false
		})
	}

	async ok() {
		this.setState({
			show: false
		})
	}

}
