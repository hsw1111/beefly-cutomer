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
		let {show, columns, query} = this.state;
		return (
			<Modal show={show} title="违规短信" onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
				<Form>
					<div>用户编号：666666 手机号：13624151215</div><hr/>
					<h5><b>接收违停短信记录</b></h5>
					<DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={tripProblemApi.pageSms} query={query}/>
				</Form>
			</Modal>
		)
	}

	show({id}) {
		this.setState({
			show: true,
		});
		let {query} = this.state;
		query.mobiles = '13720036022';
		query.serviceType = 0;
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
