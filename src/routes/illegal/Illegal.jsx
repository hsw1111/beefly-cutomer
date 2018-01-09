import React from 'react';
import beefly from "../../js/beefly";
import {
	Box, Button, CitySelect, Content, DataTable, DateRange, dtUtils, Form, Map, Modal, Select,
	SelectInput, utils, Input
} from "beefly-common";
import {handleType, operateState, reportState, vagueState} from '../../maps/illegalMap';
import userApi from "../../apis/userApi";
import AddRemarkModal from "./modals/AddRemarkModal";
import RejectModal from "./modals/RejectModal";
import tripProblemApi from "../../apis/tripProblemApi";
import ReplaceOrderModal from "./modals/ReplaceOrderModal";
import IntegralModal from "./modals/IntegralModal";
import SymsModal from "./modals/SymsModal";

/**
 * 违停上报
 */
export default class Illegal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			columns: [
				{title: '上报编号', data: 'id'},
				{title: '城市', data: 'cityName'},
				{title: '上报姓名', data: 'userName'},
				{title: '上报角色', data: 'reportRole', render: (data) => dtUtils.renderMap(data, reportState)},
				{title: '手机号', data: 'mobile'},
				{title: '车辆编号', data: 'bikeCode'},
				{title: '上报时间', data: 'lastReportTime', render: dtUtils.renderDateTime},
				{title: '处理进度', data: 'state', render: (data) => dtUtils.renderMap(data, handleType)},
				{title: '操作', type: 'object', render: this.renderActions},
			],

			query: {
				'state': '',
				'stateText': '',
				'cityCode': '',
				'beginDate': '',
				'endDate': '',
				'content': '',
				'carState': '',
				'category': 'mobile',
				'keyword': '',
				'mobile': '',
				'bikeCode': '',
			},

		};

		beefly.details = this.details.bind(this);
		beefly.addRemark = this.addRemark.bind(this);
		beefly.reject = this.reject.bind(this);
		beefly.confirm = this.confirm.bind(this);
		beefly.replace = this.replace.bind(this);
		beefly.integral = this.integral.bind(this);
		beefly.syms = this.syms.bind(this);
	}

	renderActions(data, type, row) {
		let actions = [
			{text: '查看详情', icon: 'search', onclick: `beefly.details('${row.id}')`},
			{text: '添加备注', icon: 'user-plus', onclick: `beefly.addRemark('${row.id}')`},
			{text: '驳回处理', icon: 'user-plus', onclick: `beefly.reject('${row.id}')`},
			{text: '确认处理', icon: 'user-plus', onclick: `beefly.confirm('${row.id}')`},
			{text: '更换订单', icon: 'user-plus', onclick: `beefly.replace('${row.bikeCode}')`},
			{text: '信用积分', icon: 'user-plus', onclick: `beefly.integral('${row.id}')`},
			{text: '违停短信', icon: 'user-plus', onclick: `beefly.syms('${row.id}')`},
		];
		return dtUtils.renderActions(actions, 'dropdown')
	}

	render() {
		let {columns, query} = this.state;
		return (
			<Content>
				<Box theme="query">
					<Form inline>
						<Select label="处理进度" model="query.state" options={handleType} whole={true}/>
						<CitySelect label='城市区域' model="query.cityCode"/>
						<Select label="车辆运营状态" model="query.carState" options={operateState} whole={true}/>
						<Select label="上报角色" model="query.content" options={reportState} whole={true}/>
						<DateRange label="上报时间" model="query.beginDate,query.endDate"/>
						<SelectInput label="精确搜索" model="query.category,query.keyword" selectOptions={vagueState}/>
						<div className="form-group">
							<Button icon="search" onClick={this.search.bind(this)}>查询</Button>
						</div>
					</Form>
					<DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={tripProblemApi.page} query={query}/>
				</Box>

				<AddRemarkModal ref={(e) => this._addRemarkModal = e}/>
				<RejectModal ref={(e) => this._rejectModal = e}/>
				<ReplaceOrderModal ref={(e) => this._replaceModal = e}/>
                <IntegralModal ref={(e) => this._integralModal = e}/>
                <SymsModal ref={(e) => this._symesModal = e}/>
			</Content>
		)
	}

	search() {
		let {query} = this.state;

		// 多选一个字段处理
		query.mobile = query.bikeCode = '';
		query[query.category] = query.keyword;

		this._dataTable.search(query);
	}

	// 查看详情
	details(id) {
		utils.addTab({
			name: '违停上报详情-' + id,
			path: '/illegal/detail',
			params: {
				id
			}
		})
	}

	// 添加备注
	addRemark(id) {
		this._addRemarkModal.show({
			id
		});
	}

	// 驳回处理
	reject(id) {
		this._rejectModal.show({
			id
		});
	}

	// 更改订单
	replace(bikeCode) {
		this._replaceModal.show({
			bikeCode
		});
	}

	//信用积分
	integral(id){
		this._integralModal.show({
			id
		})
	}

	//违停短信
	syms(id){
		this._symesModal.show({
			id
		})
	}

	// 确认处理
	confirm(id) {
		utils.addTab({
			name: '确认处理-' + id,
			path: '/illegal/confirm',
			params: {
				id
			}
		})
	}

}
