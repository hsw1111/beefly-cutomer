import React from 'react';
import {DataTable, Form, Modal, dtUtils} from "beefly-common";
import {integralType, rewardType} from '../../../maps/illegalMap';
import creditScoreApi from "../../../apis/creditScoreApi";
import beefly from "../../../js/beefly";

/**
 * 信用积分弹框
 */
export default class IntegralModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			userId: '',
			mobile: '',
			columns: [
				{title: '编号', data: 'id'},
				{title: '操作时间', data: 'createTime'},
				{title: '操作人', data: 'manageName'},
				{title: '奖惩类型', data: 'unit', render: (data) => dtUtils.renderMap(data, rewardType)},
				{title: '处理类型', data: 'type', render: (data) => dtUtils.renderMap(data, integralType)},
				{title: '积分', data: 'value', render: (data, type, row) => (row.unit == 0 ?'+':'-') + data},
				{title: '剩余总积分', data: 'newValue'},
				{title: '备注', data: 'remark'},
			],
			query: {
				'userId': '',
			},
		}

	}

	render() {
		let {show, columns, query, userId, mobile} = this.state;
		return (
			<Modal show={show} title="信用积分" size="lg" onHide={this.hide.bind(this)}>
				<Form>
					<div className={'row'}>
						<div className={'col-sm-6'}>
							<div>用户编号：{userId}</div>
						</div>
						<div className={'col-sm-6'}>
							<div>手机号：{mobile}</div>
						</div>
					</div>
					<hr/>
					<h5><b>积分奖励记录</b></h5>
					<DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={creditScoreApi.page} query={query}/>
				</Form>
			</Modal>
		)
	}

	show(data) {
		this.setState({
			show: true,
			userId: data.userId,
			mobile: data.mobile
		});
		let {query} = this.state;
		query.userId = data.userId;
		this._dataTable.search(query);
	}

	hide() {
		this.setState({
			show: false
		})
	}

}
