import React from 'react';
import beefly from "../../js/beefly";
import { Map, Modal, Content, Box, Input, DataTable, Button, Form, dtUtils, SelectInput } from "beefly-common";
import env from "../../js/env";
import { userDishonestyStateMap,userSearchTypeMap } from '../../js/maps';

/**
 * 用户信息
 */

export default class UserInfo extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			columns: [
				{ title: '用户编号', data: 'userId' },
				{ title: '用户姓名', data: 'name' },
				{ title: '手机号码', data: 'mobile' },
				{ title: '登录城市', data: 'registerCity' },
				{ title: '用户状态', data: 'userStatusName' },
				{ title: '注册时间', data: 'registerTime', render: dtUtils.renderDateTime },
				{ title: '账户余额（元）', data: 'usbalance', render: (data) => dtUtils.renderNumber(data, '0.0') },
				{ title: '信用积分（分）', data: 'credScore' },
				{ title: '失信状态', data: 'creditLimit' , render: (data) => dtUtils.renderMap(data, userDishonestyStateMap) },
				{ title: '操作', type: 'object', render: this.renderActions },
			],
			modalShow: false,
			inputs: [],

			query: {
				'keywords':'',
	            'kfConditionFlag':'',
			}
		}

		beefly.openDetails = this.openDetails.bind(this);
	}

	renderActions(data, type, row) {
		let actions = [
			{ text: '查看详情', onclick: `beefly.showMsg('${row.userId}')` },
			{ text: '查看订单', onclick: `beefly.showMsg('${row.userId}')` },
			{ text: '拉黑', onclick: `beefly.showMsg('${row.userId}')` },
			{ text: '出行劵管理', onclick: `beefly.showMsg('${row.userId}')` },
			{ text: '权益卡管理', onclick: `beefly.showMsg('${row.userId}')` },
			{ text: '信用积分管理', onclick: `beefly.showMsg('${row.userId}')` },
			{ text: '设为VIP', onclick: `beefly.showMsg('${row.userId}')` },
			{ text: '设置失信用户', onclick: `beefly.showMsg('${row.userId}')` },
			{ text: '手机号修改', onclick: `beefly.showMsg('${row.userId}')` },
		];
		return dtUtils.renderActions(actions,'dropdown')
	}

	render() {
		let { columns, query, modalShow } = this.state;
		return (
			<Content>
				<Box theme="query">
					<Form inline>
						<SelectInput ref={(e) => this._selectInput = e} label="精确搜索" placeholder="姓名/手机号/用户ID" selectOptions={userSearchTypeMap} />
						<Button icon="search" onClick={this.search.bind(this)}>查询</Button>
					</Form>
					<DataTable columns={columns} url={env.mifengSystem + "user!queryPage.do"} query={query} />
				</Box>

				<Modal show={modalShow} backdrop={false}>
					<Map width="100%" height="400" />
				</Modal>

			</Content>
		)
	}

	search() {
		let query = {
			'keywords':this._selectInput.inputValue,
            'kfConditionFlag':this._selectInput.selectValue,
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
