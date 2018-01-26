import React from 'react';
import {Box, Button, CitySelect, Content, DataTable, DateRange, Field, Form, Select, SelectInput, tabUtils, dtUtils, msgBox} from "beefly-common";
import {handleType, operateState, reportState, vagueState} from '../../maps/illegalMap';
import AddRemarkModal from "./modals/AddRemarkModal";
import RejectModal from "./modals/RejectModal";
import tripProblemApi from "../../apis/tripProblemApi";
import beefly from "../../js/beefly";
import env from "../../js/env";
/**
 * 违停上报
 */
export default class Illegal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			columns: [
				{title: '上报编号', data: 'id',render: this.renderId.bind(this)},
				{title: '城市', data: 'cityName'},
				{title: '上报姓名', data: 'userName'},
				{title: '上报角色', data: 'reportRole', render: (data) => dtUtils.renderMap(data, reportState)},
				{title: '手机号', data: 'mobile'},
				{title: '车辆编号', data: 'bikeCode'},
				{title: '上报时间', data: 'createTime', render: dtUtils.renderDateTime},
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
	}

	renderId(data, type, row){
		return `<a href="javascript:beefly.details('${data}')">${data}</a>`
	}

	renderActions(data, type, row) {

		if (row.state == 5) {
			let actions = [
				{text: '查看详情', icon: 'search', onclick: `beefly.details('${row.id}')`},
				{text: '添加备注', icon: 'user-plus', onclick: `beefly.addRemark('${row.id}')`},
			];
			return dtUtils.renderActions(actions, 'dropdown')
		} else {
			let actions = [
				{text: '查看详情', icon: 'search', onclick: `beefly.details('${row.id}')`},
				{text: '添加备注', icon: 'user-plus', onclick: `beefly.addRemark('${row.id}')`},
				{text: '驳回处理', icon: 'user-plus', onclick: `beefly.reject('${row.id}')`},
				{text: '确认处理', icon: 'user-plus', onclick: `beefly.confirm('${row.id}')`},
			];
			return dtUtils.renderActions(actions, 'dropdown')
		}
	}

	render() {
		let {columns, query} = this.state;
		return (
			<Content>
				<Box>
					<Form inline>
						<Select label="处理进度" model="query.state" options={handleType} whole={true}/>
						<CitySelect label='城市区域' model="query.cityCode"/>
						<Select label="车辆运营状态" model="query.carState" options={operateState} whole={true}/>
						<Select label="上报角色" model="query.content" options={reportState} whole={true}/>
						<DateRange label="上报时间" model="query.beginDate,query.endDate"/>
						<SelectInput label="精确搜索" model="query.category,query.keyword" selectOptions={vagueState}/>
						<Field>
							<Button icon="search" onClick={this.search.bind(this)}>查询</Button>
						</Field>
						<Field>
							<Button onClick={this.export.bind(this)}>导出</Button>
						</Field>
					</Form>
					<DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={tripProblemApi.page} query={query}/>
				</Box>

				<AddRemarkModal ref={(e) => this._addRemarkModal = e}/>
				<RejectModal ref={(e) => this._rejectModal = e} onClose={this.onClose.bind(this)}/>
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
	onClose(){
		let {query} = this.state;
		this._dataTable.search(query);
	}
	async export() {
		let {query} = this.state;
		let result = await tripProblemApi.export(query);
		if(beefly.isSuccess(result)){
			let url = env.apiPath + result.data;
			$('body').append(`<iframe src="${url}" style="display: none;"></iframe>`)
		}
	}

	// 查看详情
	details(id) {
		tabUtils.addTab({
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
	async reject(id) {
		let parms={
			id:id
		};
		let result = await tripProblemApi.detail(parms);
		if(result.data.state==5){
          this.search();
			msgBox.warning("该违停记录已处理过！");
          return
		}
		this._rejectModal.show({
			id
		});
	}

	// 确认处理
	async confirm(id) {
		let parms={
			id:id
		};
		let result = await tripProblemApi.detail(parms);
		if(result.data.state==5){
			this.search();
			msgBox.warning("该违停记录已处理过！");
			return
		}
		tabUtils.addTab({
			name: '确认处理-' + id,
			path: '/illegal/confirm',
			params: {
				id
			}
		})
	}

}
