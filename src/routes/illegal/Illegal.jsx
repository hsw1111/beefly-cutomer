import React from 'react';
import beefly from "../../js/beefly";
import {
	Box, Button, CitySelect, Content, DataTable, DateRange, dtUtils, Form, Map, Modal, Select,
	SelectInput, utils
} from "beefly-common";
import {handleType, operateState, reportState, vagueState} from '../../maps/illegalMap';
import userApi from "../../apis/userApi";
import AddRemarkModal from "./modals/AddRemarkModal";
import RejectModal from "./modals/RejectModal";
import tripProblemApi from "../../apis/tripProblemApi";

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
				{title: '上报角色', data: 'reportRole', render: (data) => dtUtils.renderMap(data,reportState)},
				{title: '手机号', data: 'mobile'},
				{title: '车辆编号', data: 'bikeCode'},
				{title: '上报时间', data: 'lastReportTime', render: dtUtils.renderDateTime},
				{title: '处理进度', data: 'state', render: (data) => dtUtils.renderMap(data,handleType)},
				{title: '操作', type: 'object', render: this.renderActions},
			],
			modalShow: false,
			inputs: [],


			query: {
				'state': '',
				'cityCode': '',
				'beginDate': '',
				'endDate': '',
				'mobile': '',
				'bikeCode': '',
				'content': '',
				'carState': ''
			},

			showAddRemarkModal: false,
			showRejectModal: false,

		};

		beefly.details = this.details.bind(this);
		beefly.addRemark = this.addRemark.bind(this);
		beefly.reject = this.reject.bind(this);
		beefly.confirm = this.confirm.bind(this);
	}

	renderActions(data, type, row) {
		let actions = [
			{text: '查看详情', icon: 'search', onclick: `beefly.details('${row.id}')`},
			{text: '添加备注', icon: 'user-plus', onclick: `beefly.addRemark('${row.id}')`},
			{text: '驳回处理', icon: 'user-plus', onclick: `beefly.reject('${row.userId}')`},
			{text: '确认处理', icon: 'user-plus', onclick: `beefly.confirm('${row.userId}')`},
		];
		return dtUtils.renderActions(actions, 'dropdown')
	}

	render() {
		let {columns, query, modalShow, showAddRemarkModal, showRejectModal} = this.state;
		return (
			<Content>
				<Box theme="query">
					<Form inline>
						<Select ref={(e) => this._handleStatus = e} label="处理进度" options={handleType} whole={true}/>
						<CitySelect ref={(e) => this._citySelect = e} label='城市区域'/>
						<Select ref={(e) => this._operateStatus = e} label="车辆运营状态" options={operateState}
								whole={true}/>
						<Select ref={(e) => this._reportStatus = e} label="上报角色" options={reportState} whole={true}/>
						<DateRange ref={(e) => this._dateRange = e} label="上报时间"/>
						<SelectInput ref={(e) => this._selectInput = e} label="模糊搜索" selectOptions={vagueState}/>
						<Button icon="search" onClick={this.search.bind(this)}>查询</Button>
					</Form>
					<DataTable columns={columns} api={tripProblemApi.page} query={query}/>
				</Box>

				<AddRemarkModal ref={(e) => this._addRemarkModal = e}/>
				<RejectModal show={showRejectModal}/>

			</Content>
		)
	}

	search() {
		let query = {
			'state': this._handleStatus.value,
			'cityCode': this._citySelect.cityCode,
			'beginDate': this._dateRange.startDate,
			'endDate': this._dateRange.endDate,
			'mobile': '',
			'bikeCode': '',
			'content': this._reportStatus.value,
			'carState': this._operateStatus.value
		};

		if (this._selectInput.selectValue == 'mobile') {
			query.mobile = this._selectInput.inputValue;
			query.bikeCode = ''
		} else {
			query.mobile = '';
			query.bikeCode = this._selectInput.inputValue
		}

		this.setState({query})
	}

	// 查看详情
	details(id) {
		utils.addTab({
			name: '违停上报详情-'+id,
			path: '/illegal/details',
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
	reject() {
		this.setState({
			showRejectModal: true
		})
	}

	// 确认处理
	confirm() {

	}

}
