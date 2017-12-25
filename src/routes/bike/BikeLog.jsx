import React from 'react';
import beefly from "../../js/beefly";
import { Map, Modal, Content, Box, Input, DataTable, Button, Form, dtUtils,DateRange } from "beefly-common";
import env from "../../js/env";

/**
 * 车辆日志
 */

export default class BikeLog extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			columns: [
				{ title: '车牌号', data: 'bikeCode' },
				{ title: '操作人', data: 'operater.realName' },
				{ title: '角色', data: 'operaterTypeName'},
				{ title: '在线状态', data: 'operateBoxState' },
				{ title: '操作日志', data: 'operateContent' },
				{ title: '操作时间', data: 'createTime' , render: dtUtils.renderDateTime }
			],
			modalShow: false,
			inputs: [],

			query: {
				'qStartDate':'',
				'qEndDate':'',
				'keywords':'',
				'bikeCode':''
			}
		}

		beefly.openDetails = this.openDetails.bind(this);
	}

	renderActions(data, type, row) {
		return `<button value="详情" onclick="beefly.openDetails('${row.userId}')">详情</button>`;
	}

	render() {
		let { columns, query, modalShow } = this.state;
		return (
			<Content>
				<Box theme="query">
					<Form inline>
					    <Input ref={(e) => this._bikeSearch = e} placeholder="车牌号" label="模糊搜索" />
					    <DateRange ref={(e) => this._dateRange = e} label="发送时间" />
						<Button icon="search" onClick={this.search.bind(this)}>查询</Button>
					</Form>
					<DataTable columns={columns} url={env.mifengSystem + "bikeLog!queryPage.do"} query={query} />
				</Box>

				<Modal show={modalShow} backdrop={false}>
					<Map width="100%" height="400" />
				</Modal>

			</Content>
		)
	}

	search() {
		let query = {
			'qStartDate':this._dateRange.startDate,
			'qEndDate':this._dateRange.endDate,
			'keywords':this._bikeSearch.value,
			'bikeCode':''
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
