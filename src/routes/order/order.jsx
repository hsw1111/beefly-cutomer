import React from 'react';
import {Box, Button,  Content, DataTable, DateRange, Field, Form, Select, SelectInput} from "beefly-common";
import {orderState, orderType, vagueState, timeType} from '../../maps/orderMap';
import orderApi from "../../apis/orderApi";
import EndOrderModal from './modals/EndOrderModal' 
import DetailModal from './modals/DetailModal' 
import beefly from "../../js/beefly";

/**
 * 订单管理
 */

export default class Order extends React.Component{
  constructor(props){

    super(props)
    
    this.state = {
      columns: [
        {title: '订单编号', data: 'id'},
				{title: '用户编号', data: 'userId'},
				{title: '手机号', data: 'mobile'},
				{title: '下单时间', data: 'placeOrderTime', render: beefly.dtUtils.renderDateTime},
				{title: '结束时间', data: 'endTime', render: beefly.dtUtils.renderDateTime},
				{title: '取车时续航里程（m）', data: 'leftMileage', width:75},
				{title: '车辆编号', data: 'bikeCode'},
				{title: '取车地点', data: 'pickLocation', width:150},
				{title: '骑行时间（m）', data: 'timeInOrder'},
				{title: '骑行里程（m）', data: 'mileage'},
				{title: '订单费用（￥）', data: 'actualAmount'},
				{title: '订单状态', data: 'state'},
				{title: '操作', type: 'object', render: this.renderActions},
			],
      query: {
				'addType': '',
        'orderFlow': '',
        'timeType': '',
				'beginDate': '',
				'endDate': '',
				'searchType': '',
        'keywords': '',
			},
    }

    beefly.details = this.details.bind(this);
    beefly.endOrder = this.endOrder.bind(this);
    beefly.unlock = this.unlock.bind(this);
    beefly.lock = this.lock.bind(this);
  }

  render(){
    let {columns, query} = this.state
    return (
      <Content>
        <Box>
          <Form inline className='user-block'>
						<Select label="订单类别" model="query.addType" options={orderType} whole={true}/>
						<Select label="订单状态" model="query.orderFlow" options={orderState} whole={true}/>
						<Select label="时间" model="query.timeType" options={timeType} whole={false}/>
						<DateRange model="query.beginDate,query.endDate"/>
						<SelectInput label="精确搜索" model="query.searchType,query.keywords" selectOptions={vagueState}/>
						<Field>
							<Button icon="search" onClick={this.search.bind(this)}>查询</Button>
						</Field>
					</Form>
          <p className="text-gray margin-t-10">*只显示近3个月以内的订单数据</p>
          <DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={orderApi.listPage} query={query}/>
        </Box>

        <EndOrderModal ref={(e) => this._endOrderModal = e}/>
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

  renderActions(data, type, row){
    let actions = [
      {text: '查看详情', icon: 'search', onclick: `beefly.details('${row.id}')`},
      {text: '结束订单', icon: 'user-plus', onclick: `beefly.endOrder('${row.id}')`},
      {text: '车辆开锁', icon: 'user-plus', onclick: `beefly.unlock('${row.id}')`},
      {text: '车辆关锁', icon: 'user-plus', onclick: `beefly.lock('${row.id}')`},
    ]
    return beefly.dtUtils.renderActions(actions, 'dropdown')
  }

  // 查看详情
  details({id}){
    this._detailModal.show({
      id
    })
  }
  // 结束订单
  endOrder(id){
    this._endOrderModal.show({
      id
    })
  }
  // 车辆开锁
  unlock(){

  }
  // 车辆关锁
  lock(){

  }

}