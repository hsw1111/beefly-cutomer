import React from 'react';
import beefly from "../../js/beefly";
import { Map, Modal, Content, Box, Input, Select, DataTable, Button, Form, dtUtils ,CitySelect,DateRange } from "beefly-common";
import env from "../../js/env";
import { orderFlowMap,bikeStateMap,bikeOnlineStateMap,bikeMotorLockStateMap,bikeButteryStateMap,loadButteryStateMap } from '../../js/maps';

/**
 * 车辆信息
 */
export default class Bike extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			columns: [
				{ title: '车牌号', data: 'code' },
				{ title: '所属城市', data: 'cityName' },
				{ title: '运营状态', data: 'state', render: (data) => dtUtils.renderMap(data, bikeStateMap) },
				{ title: '电池编号', data: 'batteryNo' },
				{ title: '电池电量', data: 'margin' },
				{ title: '在线状态', data: 'isOnline', render: (data) => dtUtils.renderMap(data, bikeOnlineStateMap)  },
				{ title: '车辆位置', data: 'isOnline' },
				{ title: '电机状态', data: 'motorLockState', render: (data) => dtUtils.renderMap(data, bikeMotorLockStateMap) },
				{ title: '电池状态', data: 'butteryState', render: (data) => dtUtils.renderMap(data, bikeButteryStateMap) },
				{ title: '入库时间', data: 'endTime' , render: dtUtils.renderDateTime},
				{ title: '操作', render: this.renderActions.bind(this) },
			],
			modalShow: false,
			inputs: [],

			query: {
				'keywords':'',
				'cityCode':'',
			}
		}

		beefly.openDetails = this.openDetails.bind(this);
	}

	renderActions(data, type, row) {
		let actions = [
			{ text: '鸣笛', onclick: `beefly.showMsg('${row.userId}')` },
			{ text: '车辆日志', onclick: `beefly.showMsg('${row.userId}')` },
			{ text: '车辆信息', onclick: `beefly.showMsg('${row.userId}')` },
			{ text: '解除限速', onclick: `beefly.showMsg('${row.userId}')` },
			{ text: '车辆开锁', onclick: `beefly.showMsg('${row.userId}')` },
			{ text: '车辆关锁', onclick: `beefly.showMsg('${row.userId}')` },
			{ text: '修改城市', onclick: `beefly.showMsg('${row.userId}')` },
			{ text: '修改车辆状态', onclick: `beefly.showMsg('${row.userId}')` },
		];
		return dtUtils.renderActions(actions,'dropdown')
	}

	render() {
		let { columns, query, modalShow } = this.state;
		return (
			<Content>
				<Box theme="query">
					<Form inline>
						<Input ref={(e) => this._bikeInfo = e} placeholder="车辆编号/电池编号" label="模糊查询" />
						<Button icon="search" onClick={this.search.bind(this)}>查询</Button>
					</Form>
					<div>
						{query.userStatusValue}
					</div>
					<DataTable columns={columns} url={env.mifengSystem + "bike!queryPage.do"} query={query} />
				</Box>

				<Modal show={modalShow} backdrop={false}>
					<Map width="100%" height="400" />
				</Modal>

			</Content>
		)
	}

	search() {
		let query = {
			'keywords':this._bikeInfo.value,
			'cityCode':'',
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
