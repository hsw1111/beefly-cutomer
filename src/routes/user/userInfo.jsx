import React from 'react';
import {
	Box,
	Button,
	CitySelect,
	Content,
	DataTable,
	DateRange,
	Field,
	Form,
	Select,
	SelectInput,
	NumberRange,
	dtUtils,
	tabUtils
} from "beefly-common";
import {handleType, operateState, reportState} from '../../maps/illegalMap';
import {userState, vagueState, depositState} from '../../maps/userMap';
import ModifyModal from "./modals/ModifyModal";
import BlackModal from "./modals/BlackModal";
import CancelBlackModal from "./modals/CancelBlackModal";
import FrozenModal from "./modals/FrozenModal"
import UnfreezeModal from "./modals/UnfreezeModal"
import ClearSmsModal from "./modals/ClearSmsModal"
import appUserApi from "../../apis/appUserApi";
import beefly from "../../js/beefly";

/**
 * 用户管理
 */
export default class Illegal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			columns: [
				{title: '用户编号', data: 'id',render:this.renderId.bind(this)},
				{title: '用户姓名', data: 'name'},
				{title: '手机号', data: 'mobile'},
				{title: '登录城市', data: 'cityName'},
				{title: '用户状态', data: 'userStatusName'},
				{title: '注册时间', data: 'registerTime', render: dtUtils.renderDateTime},
				{title: '账户余额（￥）', data: 'grantBalance'},
				{title: '信用积分', data: 'credScore'},
				{title: '押金状态', data: 'certState', render: (data) => dtUtils.renderMap(data, depositState)},
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
		beefly.black = this.black.bind(this);
		beefly.cancelBlack = this.cancelBlack.bind(this);
		beefly.frozen = this.frozen.bind(this);
		beefly.unfreeze = this.unfreeze.bind(this);
		beefly.clearSms = this.clearSms.bind(this);
	}

	renderId(data, type, row){
		return `<a href="javascript:beefly.details('${data}')">${data}</a>`
	}

	renderActions(data, type, row) {

		let actions = [
			{text: '查看详情', icon: 'search', onclick: `beefly.details('${row.id}')`},
			{text: '查看订单', icon: 'user-plus', onclick: `beefly.seeOrder('${row.id}')`},
			{text: '修改手机号', icon: 'user-plus', onclick: `beefly.modify('${row.id},${row.mobile}')`},
			{text: '拉黑', icon: 'user-plus', onclick: `beefly.black('${row.id},${row.mobile}')`, visible: row.isFrozen == 0},
			{text: '取消拉黑', icon: 'user-plus', onclick: `beefly.cancelBlack('${row.id},${row.mobile}')`, visible: row.isFrozen == 1},
			{text: '冻结用户押金', icon: 'user-plus', onclick: `beefly.frozen('${row.id},${row.mobile}')`,visible:row.creditLimit=1},
			{text: '取消冻结用户押金', icon: 'user-plus', onclick: `beefly.unfreeze('${row.id},${row.mobile}')`,visible:row.creditLimit=0},
			// {text: '余额管理', icon: 'user-plus', onclick: `beefly.confirm('${row.id}')`},
			// {text: '出行券管理', icon: 'user-plus', onclick: `beefly.confirm('${row.id}')`},
			// {text: '信用积分管理', icon: 'user-plus', onclick: `beefly.confirm('${row.id}')`},
			{text: '修改手机号', icon: 'user-plus', onclick: `beefly.modify('${row.id},${row.mobile}')`},
			{text: '清除验证码限制', icon: 'user-plus', onclick: `beefly.clearSms('${row.id},${row.mobile}')`},
		];

		return dtUtils.renderActions(actions, 'dropdown')
	}

	render() {
		let {columns, query} = this.state;
		return (
			<Content>
				<Box>
					<Form inline>
						<SelectInput label="精确搜索" model="query.category,query.keyword" selectOptions={vagueState}/>
						<Field>
							<Button icon="search" onClick={this.search.bind(this)}>查询</Button>
						</Field>
					</Form>
					<DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={appUserApi.page} query={query}/>
				</Box>
				<ModifyModal ref={(e) => this._modifyModal = e}/>
				<BlackModal ref={(e) => this._blackModal = e} onSuccess={this.search.bind(this)}/>
				<CancelBlackModal ref={(e) => this._cancelModal = e} onSuccess={this.search.bind(this)}/>
				<FrozenModal ref={(e) => this._frozenModal = e} onSuccess={this.search.bind(this)}/>
				<UnfreezeModal ref={(e) => this._unfreezeModal = e} onSuccess={this.search.bind(this)}/>
				<ClearSmsModal ref={(e) => this._clearSmsModal = e} onSuccess={this.search.bind(this)}/>
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

	// 查看详情
	details(id) {
		tabUtils.addTab({
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
			id: m[0],
			mmobile: m[1]
		});
	}
	//查看订单
	seeOrder(id) {
		tabUtils.addTab({
			name: '用户管理订单-' + id,
			path: '/user/order',
			params: {
				id
			}
		})
	}

	//拉黑
	black(data) {
		let m = data.split(",");
		this._blackModal.show({
			id: m[0],
			mmobile: m[1]
		});
	}

	//取消拉黑
	cancelBlack(data) {
		let m = data.split(",");
		this._cancelModal.show({
			id: m[0],
			mmobile: m[1]
		});
	}

    //冻结押金用户
	frozen(data){
		let m = data.split(",");
		this._frozenModal.show({
			id: m[0],
			mmobile: m[1]
		});
	}

	//取消冻结押金用户
	unfreeze(data){
		let m = data.split(",");
		this._unfreezeModal.show({
			id: m[0],
			mmobile: m[1]
		});
	}
	//清除验证码限制
	clearSms(data){
		let m = data.split(",");
       this._clearSmsModal.show({
		   id: m[0],
		   mmobile: m[1]
	   })
	}


}
