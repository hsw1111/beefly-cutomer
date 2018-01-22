import React from 'react';
import {observer} from 'mobx-react';
import {Box, Button, Content, Form, Row, Col, Text, tabUtils, dtUtils, DataTable} from "beefly-common";
import bikeApi from '../../apis/bikeApi'
import bikeLog from './stores/bikeStores'
import {urlUtils} from 'jeselvmo';

/**
 * 车辆日志
 */

@observer
export default class BikeLog extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      columns: [
        {title: '操作人', render: this.renderOperater},
				{title: '角色', data: 'operaterTypeName'},
				{title: '在线状态', data: 'operateBoxState'},
				{title: '操作日志', data: 'operateContent'},
				{title: '操作时间', data: 'bike.operTime', render: dtUtils.renderDateTime},
      ],
      query: {
        bikeCode: ''
      },
      detail: ''
    }
  }
  componentWillMount() {
    let { bikeCode } = urlUtils.getParams();
    this.setState({
      query: {
        bikeCode
      }
    })
    bikeLog.fetchDetail()
  }

  render(){
    let {detail} = bikeLog
    let {columns, query} = this.state
    return (
      <Content>
        {detail && 
        	<Form className="form-label-150" horizontal>
						<Row>
							<Col md={5}>
								<Text label="车辆编号" value={detail.code}/>
								<Text label="入库时间" value={detail.initInStoreTime}/>
							</Col>
							<Col md={7}>
								<Text label="内置智能设置编号" value={detail.boxCode}/>
								<Text label="所属城市" value={detail.cityName}/>
							</Col>
						</Row>
					</Form>
          
        }
        <Box title='车辆日志'>
          <Form>
            <DataTable ref={(e) => this._dataTable = e}
                columns={columns}  api={bikeApi.bikeLogPage}  query={query}/> 
          </Form>
          
        </Box>
       
      </Content>
    )
  }

  renderOperater(data, type, row){
    return row.operater.role === 3 ? row.operater.realName : row.operater.userName
  }

}