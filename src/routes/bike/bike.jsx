import React from 'react';
import {Box, Button, Content, DataTable, Field, SelectInput, tabUtils, dtUtils} from "beefly-common";
import {handleType, operateState, reportState, vagueState} from '../../maps/illegalMap';
import AddRemarkModal from "./modals/AddRemarkModal";
import RejectModal from "./modals/RejectModal";
import tripProblemApi from "../../apis/tripProblemApi";
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
  }

  render(){
    <Content>
      <Box>
        <SelectInput label="精确搜索" model="query.category,query.keyword" selectOptions={vagueState}/>
        <Field>
          <Button icon="search" onClick={this.search.bind(this)}>查询</Button>
        </Field>
      </Box>
    </Content>
  }
}