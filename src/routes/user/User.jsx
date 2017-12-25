import React from 'react';
import beefly from "../../js/beefly";
import {
	Map,
	Modal,
	Content,
	Box,
	Input,
	Select,
	DataTable,
	Button,
	Form,
	dtUtils,
	CitySelect,
	DateRange,
	NumberRange,
	SelectInput
} from "beefly-common";
import env from "../../js/env";
import {orderFlowMap, userSearchTypeMap} from '../../js/maps';
import userApi from "../../apis/userApi";


export default class User extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			columns: [
				{title: '用户编号', data: 'userId'},
				{title: '用户姓名', data: 'name'},
				{title: '手机号码', data: 'mobile'},
				{title: '登陆城市', data: 'registerCity'},
				{title: '用户状态', data: 'userStatusName'},
				{title: '注册时间', data: 'registerTime', render: dtUtils.renderDateTime},
				{
					title: '账户余额',
					data: 'balance',
					className: "text-right",
					render: (data) => dtUtils.renderNumber(data, '0.00')
				},
				{title: '信用积分', data: 'credScore', className: "text-right"},
				{title: '失信状态', data: 'creditLimit', className: "text-center"},
				{title: '操作', type: 'object', render: this.renderActions},
			],
			modalShow: false,
			inputs: [],

			query: {
				'userStatusValue': '',
				'qRegistTimeStart': '',
				'qRegistTimeEnd': '',
				'qBalanceType': '1',
				'qBalanceStart': '',
				'qBalanceEnd': '',
				'keywords': '',
				'registerCityCode': '',
				'conditionFlag': 'mobile'
			}
		}

		beefly.openDetails = this.openDetails.bind(this);
		beefly.showMsg = this.showMsg.bind(this);
	}

	renderActions(data, type, row) {
		let actions = [
			{text: 'Action', icon: 'search', onclick: `beefly.showMsg('${row.userId}')`},
			{text: 'Another action', icon: 'user-plus', onclick: `beefly.showMsg('${row.userId}')`},
			// { text: 'Something else here', onclick: `beefly.showMsg('${row.userId}')` },
			// '-',
			// { id: 'add4', text: 'Separated link', onclick: `beefly.showMsg('${row.mobile}')` },
		];
		return dtUtils.renderActions(actions)
	}

	render() {
		let {columns, query, modalShow} = this.state;
		return (
			<Content>
				<Box theme="query">
					<Form inline>
						<Select ref={(e) => this._userStatus = e} label="用户状态" options={orderFlowMap} whole={true}/>
						<Input ref={(e) => this._mobile = e} placeholder="手机号" label="手机号"/>
						<Input label="姓名" placeholder="姓名"/>
						<CitySelect ref={(e) => this._citySelect = e} label='城市区域'/>
						<DateRange ref={(e) => this._dateRange = e} label="注册时间"/>
						<NumberRange ref={(e) => this._numberRange = e} label="账户余额"/>
						<SelectInput ref={(e) => this._selectInput = e} label="模糊搜索" selectOptions={userSearchTypeMap}/>
						<Button icon="search" onClick={this.search.bind(this)}>查询</Button>
					</Form>
					<div>
						{query.conditionFlag}
						~
						{query.keywords}
					</div>
					<DataTable columns={columns} api={userApi.queryPage} query={query}/>
				</Box>

				<Modal show={modalShow} backdrop={false}>
					<Map width="100%" height="400"/>
				</Modal>

			</Content>
		)
	}

	search() {
		let query = {
			'userStatusValue': this._userStatus.text,
			'qRegistTimeStart': this._dateRange.startDate,
			'qRegistTimeEnd': this._dateRange.endDate,
			'qBalanceType': '1',
			'qBalanceStart': this._numberRange.startNumber,
			'qBalanceEnd': this._numberRange.endNumber,
			'keywords': this._selectInput.inputValue,
			'registerCityCode': this._citySelect.cityCode,
			'conditionFlag': this._selectInput.selectValue
		};

		this.setState({query})
	}

	openDetails(userId) {
		this.setState({
			modalShow: true
		})
	}

	signIn() {
		let inputs = this.state.inputs;
		inputs.push({num: inputs.length});
		this.setState({
			inputs
		})
	}

	showMsg(userId) {
		console.log(userId);
	}

}
