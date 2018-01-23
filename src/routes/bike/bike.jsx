import React from 'react';
import {Box, Button, Content, Form, DataTable, Field, SelectInput, tabUtils, dtUtils} from "beefly-common";
import {codeType} from '../../maps/bikeMap';
import bikeApi from '../../apis/bikeApi'
import WhistleModal from './modals/WhistleModal'
import EditStateModal from './modals/EditStateModal'
import beefly from "../../js/beefly";

/**
 * 车辆管理
 */

export default class bike extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      columns: [
        {title: '车辆编号', data: 'code'},
				{title: '所属城市', data: 'cityName'},
				{title: '车辆状态', data: 'state'},
				{title: '电池编号', data: 'batteryNo'},
				{title: '电池电量', data: 'margin'},
				{title: '在线状态', data: 'isOnline'},
				{title: '电机状态', data: 'state'},
				{title: '电池状态', data: 'state'},
				{title: '入库时间', data: 'initInStoreTime', render: dtUtils.renderDateTime},
				{title: '操作', type: 'object', render: this.renderActions},
      ],
      query: {
        category: 'bikeCode',
        keywords: ''
      }
    }

    beefly.whistle = this.whistle.bind(this);
		beefly.bikeLog = this.bikeLog.bind(this);
		beefly.editState = this.editState.bind(this);
		beefly.reject = this.reject.bind(this);
		beefly.confirm = this.confirm.bind(this);
  }

  render(){
    let {columns, query} = this.state
    return (
      <Content>
      <Box>
        <Form inline>
          <SelectInput label="精确搜索" model="query.category,query.keywords" selectOptions={codeType}/>
          <Field>
            <Button icon="search" onClick={this.search.bind(this)}>查询</Button>
          </Field>
        </Form>
        <DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={bikeApi.page} query={query}/>
      </Box>
      <WhistleModal ref={(e) => this._whistleModal = e}/>
      <EditStateModal ref={(e) => this._editStateModal = e}/>
    </Content>
    )
  }

  search(){
    let {query} = this.state
    console.log(query)
    if(query.category === 'bikeCode'){
      this._dataTable.search({
        'bikeCode': query.keywords
      })
    }else{
      this._dataTable.search({
        'batteryCode': query.keywords
      })
    }
  }

  renderActions(data, type, row){
    let actions = [
      {text: '鸣笛', icon: 'search', onclick: `beefly.whistle('${row.code}')`},
      {text: '车辆日志', icon: 'user-plus', onclick: `beefly.bikeLog('${row.code}')`},
      {text: '车辆详情', icon: 'user-plus', onclick: `beefly.reject('${row.code}')`},
      {text: '车辆开锁', icon: 'user-plus', onclick: `beefly.confirm('${row.code}')`},
      {text: '车辆关锁', icon: 'user-plus', onclick: `beefly.confirm('${row.code}')`},
      {text: '修改状态', icon: 'user-plus', onclick: `beefly.editState('${row.code}','${row.batteryNo}')`},
    ];
    return dtUtils.renderActions(actions, 'dropdown')
  }

  whistle(){
    this._whistleModal.show()
  }

  bikeLog(code){
    tabUtils.addTab({
			name: '车辆日志-' + code,
			path: '/bike/log',
			params: {
				bikeCode: code
			}
		})
  }

  editState(code, batteryNo){
    this._editStateModal.show({
      bikeCode: code,
      batteryCode: batteryNo
    })
  }

  reject(){

  }

  confirm(){

  }
}