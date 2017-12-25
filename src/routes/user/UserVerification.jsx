import React from 'react';
import beefly from "../../js/beefly";
import { Map, Modal, Content, Box, Input, DataTable, Button, Form, dtUtils } from "beefly-common";
import env from "../../js/env";

/**
 * 验证码信息
 */

export default class UserVerification extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			columns: [
				{ title: '手机号码', data: 'mobile' },
				{ title: '发送时间', data: 'sendTime', render: dtUtils.renderDateTime },
				{ title: '短信详情', data: 'content' },
			],
			modalShow: false,
			inputs: [],

			query: {
				keywords:'',
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
						<Input ref={(e) => this._mobile = e} placeholder="手机号" label="手机号" />
					    <Button icon="search" onClick={this.search.bind(this)}>查询</Button>
					</Form>
					<DataTable columns={columns} url={env.mifengSystem + "sms!queryCheckCode.do"} query={query} />
				</Box>

				<Modal show={modalShow} backdrop={false}>
					<Map width="100%" height="400" />
				</Modal>

			</Content>
		)
	}

	search() {
		let query = {
			keywords:this._mobile.value,
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
