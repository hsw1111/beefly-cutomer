import React from 'react';
import beefly from "../../js/beefly";
import { Map, Modal, Content, Box, Input, DataTable, Button, Form, dtUtils,Select,DateRange,CitySelect,NumberRange,SelectInput } from "beefly-common";
import env from "../../js/env";
import { userStateMap,userDishonestyStateMap,userSearchTypeMap } from '../../js/maps';

/**
 * 问题用户管理
 */

export default class UserProblem extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			columns: [
				{ title: '用户编号', data: 'userId' },
				{ title: '用户姓名', data: 'name' },
				{ title: '手机号码', data: 'mobile' },
				{ title: '用户状态', data: 'userStatusName' },
				{ title: '注册时间', data: 'registerTime', render: dtUtils.renderDateTime },
				{ title: '信用积分（分）', data: 'credScore' },
				{ title: '失信状态', data: 'creditLimit', render: (data) => dtUtils.renderMap(data, userDishonestyStateMap) },
				{ title: '操作', render: this.renderActions.bind(this) }
			],
			modalShow: false,
			inputs: [],

			query: {
				'userStatusValue':'',
				'qRegistTimeStart':'',
				'qRegistTimeEnd':'',
				'creditLimit':'',
				'qScoreStart':'',
				'qScoreEnd':'',
				'keywords':'',
				'registerCityCode':'',
				'conditionFlag':''
			}
		}

		beefly.openDetails = this.openDetails.bind(this);
	}

	renderActions(data, type, row) {
		let actions = [
			{ text: '详情', onclick: `beefly.showMsg('${row.userId}')` },
			{ text: '扣积分', onclick: `beefly.showMsg('${row.userId}')` },
			// { text: 'Something else here', onclick: `beefly.showMsg('${row.userId}')` },
			// '-',
			// { id: 'add4', text: 'Separated link', onclick: `beefly.showMsg('${row.mobile}')` },
		];
		return dtUtils.renderActions(actions)
	}

	render() {
		let { columns, query, modalShow } = this.state;
		return (
			<Content>
				<Box theme="query">
					<Form inline>
					    <Select ref={(e) => this._userStatus = e} label="用户状态" options={userStateMap} whole={true} />
					    <DateRange ref={(e) => this._dateRange = e} label="注册时间" />
					    <CitySelect ref={(e) => this._citySelect = e} label='城市区域' />
					    <Select ref={(e) => this._dishonestyStatus = e} label="失信状态" options={userDishonestyStateMap} whole={true} />
					    <NumberRange ref={(e) => this._numberRange = e} label="信用积分" />
						<SelectInput ref={(e) => this._selectInput = e} label="模糊搜索" selectOptions={userSearchTypeMap} />
						<Button icon="search"  onClick={this.search.bind(this)}>查询</Button>
					</Form>
					<DataTable columns={columns} url={env.mifengSystem + "problemUser!queryPage.do"} query={query} />
				</Box>

				<Modal show={modalShow} backdrop={false}>
					<Map width="100%" height="400" />
				</Modal>

			</Content>
		)
	}

	search() {
		let query = {
			'userStatusValue':this._userStatus.value,
			'qRegistTimeStart':this._dateRange.startDate,
			'qRegistTimeEnd':this._dateRange.endDate,
			'creditLimit':this._dishonestyStatus.value,
			'qScoreStart':this._numberRange.startNumber,
			'qScoreEnd':this._numberRange.endNumber,
			'keywords':this._selectInput.inputValue,
			'registerCityCode':this._citySelect.cityCode,
			'conditionFlag':this._selectInput.selectValue
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
