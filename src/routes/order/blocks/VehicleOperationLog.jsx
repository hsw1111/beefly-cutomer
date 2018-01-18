import React from 'react'
import {Box, DataTable} from "beefly-common";
import orderApi from '../../../apis/orderApi';

export default class VehicleOperationLog extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      column: [
        {title: '操作时间', data: 'id'},
        {title: '操作内容', data: 'userId'}
      ]
    }
  }

  render(){
    let {columns} = this.state
    return (
      <Box title='车辆操作日志'>
          <DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={orderApi.listPage}/>
      </Box>
    )
  }

}