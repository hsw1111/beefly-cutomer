import React from 'react';
import {DataTable, Form, Modal, dtUtils} from "beefly-common";
import {integralType, rewardType} from '../../../maps/illegalMap';
import creditScoreApi from "../../../apis/creditScoreApi";
import beefly from "../../../js/beefly";

/**
 * 信用积分弹框
 */
export default class IntegralModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			userId: '',
			mobile: '',
			columns: [
				{title: '编号', data: 'id'},
				{title: '操作时间', data: 'createTime'},
				{title: '操作人', data: 'manageName', render:(data) =>(data == '' ?'系统自动':data)},
				{title: '奖惩类型', data: 'unit', render: this.renderIntegral.bind(this)},
				{title: '处理类型', data: 'type', render: (data) => dtUtils.renderMap(data, integralType)},
				{title: '积分', data: 'value', render: (data,type,row) => (row.unit == 0?'+':'-')+data},
				{title: '剩余总积分', data: 'newValue'},
				{title: '备注', data: 'remark'},
			],
			query: {
				'userId': '',
				'unit': 1,
				'type': 9,
			},
		}

	}

	renderIntegral(data, type, row){
		if(row.unit == 0){
			return `<span>${dtUtils.renderMap(data, rewardType)}</span>`
		}else{
			return `<span class="label label-danger">${dtUtils.renderMap(data, rewardType)}</span>`
		}
	}

	render() {
		let {show, columns, query, userId, mobile} = this.state;
		return (
			<Modal show={show} title="信用积分" size="lg" onHide={this.hide.bind(this)}>
				{show &&
				<Form>
					<div className={'row'}>
						<div className={'col-sm-6'}>
							<div>用户编号：{userId}</div>
						</div>
						<div className={'col-sm-6'}>
							<div>手机号：{mobile}</div>
						</div>
					</div>
					<hr/>
					<h5><b>积分处罚记录</b></h5>
					<DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={creditScoreApi.page} query={query}/>
				</Form>
				}
			</Modal>
		)
	}

	show(data) {
		this.setState({
			show: true,
			userId: data.userId,
			mobile: data.mobile,
			query: {
				'userId': data.userId,
				'unit': 1,
				'type': 9,
			}
		});
	}

	hide() {
		this.setState({
			show: false
		})
	}

	componentDidUpdate(){
		// $(this._dataTable._dataTable).find('tr').each(function(){
		// 	if(parseInt($(this).find('td:eq(5)').text()) < 0){
		// 		$(this).css('background-color', 'red');
		// 	}
		// })

	}

}
