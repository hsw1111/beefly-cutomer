import React from 'react';
import {Form, Modal, DataTable} from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
/**
 * 违停短信弹框
 */
export default class SymsModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			mobile: '',
			userId: '',
			columns: [
				{title: '发送时间', data: 'sendTime'},
				{title: '发送人员', data: 'senderName'},
				{title: '发送目的', data: 'serviceTypeName'},
				{title: '信息内容', data: 'content'},
			],
			query: {
				'mobiles': '',
				'serviceType': '',
			},
		}

	}

	render() {
		let {show, columns, query, userId, mobile} = this.state;
		return (
			<Modal show={show} title="违规短信" size="lg" onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
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
					<h5><b>接收违停短信记录</b></h5>
					<DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={tripProblemApi.pageSms} query={query}/>
				</Form>
			</Modal>
		)
	}

	show(data) {
		this.setState({
			show: true,
			mobile: data.module,
			userId: data.userId
		});
		let {query} = this.state;
		query.mobiles = data.mobile;
		query.serviceType = 4;
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
