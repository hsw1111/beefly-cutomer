import React from 'react'
import {Box, DataTable} from "beefly-common";
import orderApi from '../../../apis/orderApi';

export default class VehicleOperationLog extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      column: [
        {title: '上报时间', data: 'id'},
        {title: '订单里程', data: 'userId'}
      ]
    }
  }

  render(){
    let {columns} = this.state
    return (
      <Box title='订单上报日志'>
          <DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={orderApi.listPage}/>
      </Box>
    )
  }

}