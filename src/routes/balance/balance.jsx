import React from 'react';
import {Box, Button, Content, DataTable, Field, Form, SelectInput, dtUtils, tabUtils } from "beefly-common";

import beefly from "../../js/beefly";
import userApi from "../../apis/userApi";
import { vagueState } from '../../maps/balanceMap';
import EditBalanceModal from './modals/EditBalanceModal'
import RechargeModal from './modals/RechargeModal'
import WithdrawModal from './modals/WithdrawModal'

/**
 * 余额信息
 */
export default class Balance extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      columns: [
				{title: '用户编号', data: 'id'},
				{title: '用户名', data: 'name'},
				{title: '手机号码', data: 'mobile'},
				{title: '当前充值余额（￥）', data: 'balance', render: this.renderBalance},
				{title: '赠送余额（￥）', data: 'credScore'},
				{title: '操作', type: 'object', render: this.renderActions},
			],
      query: {
        'category': 'mobile',
				'keyword': '',
      }
    }
    beefly.editBalance = this.editBalance.bind(this);
    beefly.withdraw = this.withdraw.bind(this);
    beefly.recharge = this.recharge.bind(this);
  }
  
  renderBalance(data, type, row){
    return `<a href="javascript:beefly.recharge('${row.id}','${row.mobile}','${data}')">${data}</a>`
  }
  renderActions(data, type, row){
    
		let actions = [
			{text: '修改余额',  onclick: `beefly.editBalance('${row.id}','${row.mobile}')`},
			{text: '提现', onclick: `beefly.withdraw('${row.id}','${row.name}')`, visible: row.balance > 0}
		];

		return dtUtils.renderActions(actions, 'link')
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
							   columns={columns} api={userApi.page} query={query}/>
				</Box>
        <EditBalanceModal ref={(e) => this._editBalanceModal = e} onSuccess={this.refresh.bind(this)}/>
        <RechargeModal ref={(e) => this._rechargeModal = e}/>
        <WithdrawModal ref={(e) => this._withdrawModal = e} onSuccess={this.refresh.bind(this)}/>
			</Content>
		)
  }
  
  search(){
    let {query} = this.state;

		// 多选一个字段处理
		query.mobile = query.id = query.name = '';
		query[query.category] = query.keyword;

		this._dataTable.search(query);
  }

  refresh(){
    this._dataTable.refresh()
  }

  editBalance(id, mobile){
    this._editBalanceModal.show({id, mobile})
  }

  withdraw(id, name){
		this._withdrawModal.show({
			id,
			name
		})
	}
	recharge(id, mobile, rechargeBalance){
		this._rechargeModal.show({
			id,
			mobile,
			rechargeBalance
		})
	}

}
