import React from 'react';
import beefly from "../../js/beefly";
import { Map, Modal, Content, Box, Input, DataTable, Button, Form, dtUtils,DateRange } from "beefly-common";
import env from "../../js/env";

/**
 * 短信管理
 */

export default class UserSms extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			columns: [
				{ title: '用户姓名', data: 'user.name' },
				{ title: '手机号码', data: 'mobile' },
				{ title: '发送时间', data: 'sendTime', render: dtUtils.renderDateTime },
				{ title: '发送人员', data: 'sender.userName' },
				{ title: '发送类型', data: 'serviceTypeName' },
				{ title: '信息详细', data: 'content' }
			],
			modalShow: false,
			inputs: [],

			query: {
				'qSendTimeStart':'',
				'qSendTimeEnd':'',
				'keywords':'',
			}
		}

		beefly.openDetails = this.openDetails.bind(this);
	}


	render() {
		let { columns, query, modalShow } = this.state;
		return (
			<Content>
				<Box theme="query">
					<Form inline>
					    <DateRange ref={(e) => this._dateRange = e} label="发送时间" />
						<Input ref={(e) => this._mobile = e} placeholder="手机号" label="手机号" />
						<Button icon="search" onClick={this.search.bind(this)}>查询</Button>
					</Form>
					<DataTable columns={columns} url={env.mifengSystem + "sms!queryPage.do"} query={query} />
				</Box>

				<Modal show={modalShow} backdrop={false}>
					<Map width="100%" height="400" />
				</Modal>

			</Content>
		)
	}

	search() {
		let query = {
			'qSendTimeStart':this._dateRange.startDate,
			'qSendTimeEnd':this._dateRange.endDate,
			'keywords':this._mobile.value,
		};

		this.setState({ query })
	}

	openDetails(userId) {
		this.setState({
			modalShow: true
		})
	}

	signIn() {
		let inputs = this.state.inputs;
		inputs.push({ num: inputs.length });
		this.setState({
			inputs
		})
	}
}
