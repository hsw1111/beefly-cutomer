import React from 'react';
import {Box, Button, Content, DataTable, Field, Form, Select, DateRange, SelectInput, dtUtils, tabUtils } from "beefly-common";

import beefly from "../../js/beefly";
import userApi from "../../apis/userApi";
import {withdrawState, vagueState} from '../../maps/balanceMap';
import DetailModal from './modals/DetailModal'

/**
 * 余额信息
 */
export default class Balance extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      columns: [
				{title: '提现编号', data: 'id', render: this.renderId},
				{title: '用户编号', data: 'id'},
				{title: '用户名', data: 'name'},
				{title: '手机号码', data: 'mobile'},
				{title: '提现金额（￥）', data: 'balance'},
				{title: '提现时间', data: 'balance'},
				{title: '提现账号', data: 'credScore'},
				{title: '提现状态', data: 'credScore'},
				{title: '操作', type: 'object', render: this.renderActions},
			],
      query: {
        state: '',
        beginWithdrawTime: '',
        endWithdrawTime: '',
        category: 'mobile',
				keyword: '',
      }
    }
    beefly.details = this.details.bind(this);
  }

  renderId(data, type, row){
		return `<a href="javascript:beefly.details('${row.id}')">${data}</a>`
  }
  
  renderActions(data, type, row){
    
		let actions = [
			{text: '详情',  onclick: `beefly.details('${row.id}')`},
		];

		return dtUtils.renderActions(actions, 'link')
  }
	render() {
		let {columns, query} = this.state;
		return (
			<Content>
				<Box>
        <Form inline>
            <Select label="提现状态" model="query.state" options={withdrawState} whole={true}/>
            <DateRange label="提现时间" model="query.beginWithdrawTime,query.endWithdrawTime"/>
						<SelectInput label="精确搜索" model="query.category,query.keyword" selectOptions={vagueState}/>
						<Field>
							<Button icon="search" onClick={this.search.bind(this)}>查询</Button>
						</Field>
					</Form>
					<DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={userApi.page} query={query}/>
				</Box>
        <DetailModal ref={(e) => this._detailModal = e}/>
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

  details(data){
    console.log(this._detailModal)
    this._detailModal.show(data)
  }

}
