import React from 'react';
import {Box, Button, CitySelect, Content, DataTable, DateRange, Field, Form, Select, SelectInput, NumberRange} from "beefly-common";
import {userState, vagueState, depositState} from '../../maps/userMap';
import ModifyModal from "./modals/ModifyModal";
import tripProblemApi from "../../apis/tripProblemApi";
import appUserApi from "../../apis/appUserApi";
import orderApi from "../../apis/orderApi";
import beefly from "../../js/beefly";

/**
 * 用户管理
 */
export default class Illegal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			columns: [
				{title: '用户编号', data: 'id'},
				{title: '用户姓名', data: 'name'},
				{title: '手机号', data: 'mobile'},
				{title: '登录城市', data: 'cityName'},
				{title: '用户状态', data: 'userStatusName'},
				{title: '注册时间', data: 'registerTime', render: beefly.dtUtils.renderDateTime},
				{title: '账户余额（￥）', data: 'grantBalance'},
				{title: '信用积分', data: 'credScore'},
				{title: '押金状态', data: 'depositState', render: (data) => beefly.dtUtils.renderMap(data, depositState)},
				{title: '操作', type: 'object', render: this.renderActions},
			],

			query: {
				'state': '0',
				'cityCode': '',
				'beginRegisterTime': '',
				'endRegisterTime': '',
				'minBalance': '',
				'maxBalance': '',
				'category': 'mobile',
				'keyword': '',
			},

		};

		beefly.details = this.details.bind(this);
		beefly.modify = this.modify.bind(this);
		beefly.seeOrder = this.seeOrder.bind(this);
		// beefly.black = this.black.bind(this);
	}

	renderActions(data, type, row) {
			let actions = [
				{text: '查看详情', icon: 'search', onclick: `beefly.details('${row.id}')`},
				{text: '查看订单', icon: 'user-plus', onclick: `beefly.seeOrder('${row.id}')`},
				// {text: '拉黑', icon: 'user-plus', onclick: `beefly.black('${row.id}')`},
				// {text: '余额管理', icon: 'user-plus', onclick: `beefly.confirm('${row.id}')`},
				// {text: '出行券管理', icon: 'user-plus', onclick: `beefly.confirm('${row.id}')`},
				// {text: '信用积分管理', icon: 'user-plus', onclick: `beefly.confirm('${row.id}')`},
				// {text: '冻结用户押金', icon: 'user-plus', onclick: `beefly.confirm('${row.id}')`},
				{text: '修改手机号', icon: 'user-plus', onclick: `beefly.modify('${row.appUserId},${row.mobile}')`},
				// {text: '清除验证码限制', icon: 'user-plus', onclick: `beefly.confirm('${row.id}')`},
			];
			return beefly.dtUtils.renderActions(actions, 'dropdown')
	}

	render() {
		let {columns, query} = this.state;
		return (
			<Content>
				<Box>
					<Form inline>
						<Select label="用户状态" model="query.state" options={userState} whole={false}/>
						<CitySelect label='城市' model="query.cityCode"/>
						<NumberRange model="query.minBalance,query.maxBalance" label="账户余额"/>
						<DateRange label="注册时间" model="query.beginRegisterTime,query.endRegisterTime"/>
						<SelectInput label="精确搜索" model="query.category,query.keyword" selectOptions={vagueState}/>
						<Field>
							<Button icon="search" onClick={this.search.bind(this)}>查询</Button>
						</Field>
					</Form>
					<DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={appUserApi.page} query={query}/>
				</Box>
				<ModifyModal ref={(e) => this._modifyModal = e}/>
			</Content>
		)
	}

	search() {
		let {query} = this.state;

		// 多选一个字段处理
		query.mobile = query.id = query.name = '';
		query[query.category] = query.keyword;

		this._dataTable.search(query);
	}

	async export() {
		let {query} = this.state;
		let result = await tripProblemApi.export(query);
	}

	// 查看详情
	details(id) {
		beefly.tabs.addTab({
			name: '用户管理详情-' + id,
			path: '/user/details',
			params: {
				id
			}
		})
	}

	// 修改手机号
	modify(data) {
		let m = data.split(",");
		this._modifyModal.show({
			appUserId: m[0],
			mmobile: m[1]
		});
	}
	//查看订单
	async seeOrder(id) {
		// let result = await orderApi.page({appUserId:id});
		// console.log(result,8787)
		beefly.tabs.addTab({
			name: '用户管理详情-' + id,
			path: '/user/order',
			params: {
				id
			}
		})
	}
	//拉黑
	// block(id){
	// 	console.log(id,6666)
	// }


}
