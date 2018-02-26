import React from 'react';
import orderApi from "../../apis/orderApi";
import {Box, Button, Content, DataTable, DateRange, Field, Form, Select, SelectInput, dtUtils} from "beefly-common";
import {orderState, orderType, vagueState, timeType} from '../../maps/orderMap';

import EndOrderModal from './modals/EndOrderModal' 
import DetailModal from './modals/DetailModal' 
import OpenLockModal from './modals/OpenLockModal' 
import CloseLockModal from './modals/CloseLockModal' 
import beefly from "../../js/beefly";

/**
 * 订单管理
 */

export default class Order extends React.Component {
	constructor(props) {

		super(props);

		this.state = {
			columns: [
				{title: '订单编号', data: 'id', render: this.renderId.bind(this)},
				{title: '用户编号', data: 'userId'},
				{title: '手机号', data: 'mobile'},
				{title: '下单时间', data: 'placeOrderTime', render: dtUtils.renderDateTime},
				{title: '结束时间', data: 'endTime', render: dtUtils.renderDateTime},
				{title: '取车时续航里程（m）', data: 'leftMileage', width: 75},
				{title: '车辆编号', data: 'bikeCode'},
				{title: '取车地点', data: 'pickLocation', width: 150},
				{title: '骑行时间（m）', data: 'timeInOrder'},
				{title: '骑行里程（m）', data: 'mileage'},
				{title: '订单费用（￥）', data: 'actualAmount'},
				{title: '订单状态', data: 'state'},
				{title: '操作', type: 'object', render: this.renderActions},
			],
			query: {
				'addType': '',
        'orderFlow': '',
        'timeType': 1,
				'beginDate': '',
				'endDate': '',
				'searchType': 1,
        'keywords': '',
			},
		};

		beefly.details = this.details.bind(this);
		beefly.endOrder = this.endOrder.bind(this);
		beefly.openLock = this.openLock.bind(this);
		beefly.closeLock = this.closeLock.bind(this);
	}
	renderId(data, type, row){
		return `<a href="javascript:beefly.details('${data}')">${data}</a>`
	}
	render() {
		let {columns, query} = this.state;
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
							   columns={columns} api={orderApi.listPage}/>
        </Box>

        <DetailModal ref={(e) => this._detailModal = e}/>
        <EndOrderModal ref={(e) => this._endOrderModal = e} onSuccess={this.refresh.bind(this)}/>
        <OpenLockModal ref={(e) => this._openLockModal = e} onSuccess={this.refresh.bind(this)}/>
        <CloseLockModal ref={(e) => this._closeLockModal = e}  onSuccess={this.refresh.bind(this)}/>
      </Content>
    )
  }

  search(){
    let {query} = this.state;

    // 多选一个字段处理
    // query.mobile = query.id = query.name = '';
    // query[query.category] = query.keyword;

    this._dataTable.search(query);
  }

  refresh(){
    this._dataTable.refresh()
  }

  renderActions(data, type, row){
    console.log(row)

      let actions = [
				{text: '查看详情', icon: 'search', onclick: `beefly.details('${row.id}')`},
				{text: '结束订单', icon: 'user-plus', onclick: `beefly.endOrder('${row.id},${row.bikeCode}')`, visible: row.state == '未取车' || row.state == '已取车' || row.state == '开锁中'},
        {text: '车辆开锁', icon: 'user-plus', onclick: `beefly.openLock('${row.id},${row.bikeCode}')`, visible: row.state == '已结束' || row.state == '开锁失败' || row.state == '已取车' || row.state == '开锁中' || row.state == '已取消' || row.state == '人工结束'},
        {text: '车辆关锁', icon: 'user-plus', onclick: `beefly.closeLock('${row.id},${row.bikeCode}')`, visible: row.state == '已结束' || row.state == '开锁失败' || row.state == '已取车' || row.state == '开锁中' || row.state == '已取消' || row.state == '人工结束'},
      ]
      return dtUtils.renderActions(actions, 'dropdown')
  }

  // 查看详情
  details(id){
    this._detailModal.show({
      id
    })
  }
  	//结束订单
	endOrder(data){
		let m = data.split(",");
		this._endOrderModal.show({
			id: m[0],
			bikeCode: m[1]
		});
	}

	//开锁
	openLock(data){
		let m = data.split(",");
		this._openLockModal.show({
			id: m[0],
			bikeCode: m[1]
		});
	}

	//关琐
	closeLock(data){
		let m = data.split(",");
		this._closeLockModal.show({
			id: m[0],
			bikeCode: m[1]
		});
	}


}
