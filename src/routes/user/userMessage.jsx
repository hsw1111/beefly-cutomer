import React from 'react';
import {observer} from 'mobx-react';
import {Button, Content, Box, DateRange, Input, Form, Field, DataTable, dtUtils} from "beefly-common";
import userStore from "../../stores/userStore";
import userApi from '../../apis/appUserApi'
import SendMessageModal from './modals/SendMessageModal'


/**
 * 用户管理 短信管理
 */

@observer
export default class UserMessage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      columns: [
        {title: '用户编号', data: 'id'},
				{title: '手机号', data: 'cityName'},
				{title: '发送时间', data: 'userName', render: dtUtils.renderDateTime},
				{title: '发送人员', data: 'reportRole'},
				{title: '发送目的', data: 'mobile'},
				{title: '信息内容', data: 'bikeCode'},
      ],
      
      query: {
        beginDate: '',
        endDate: '',
        mobile: ''
      }
    }
  }

  render() {
    let {columns, query} = this.state
    return(
      <Content>
        <Box>
          <Form inline className='user-block'>
            <DateRange label="发送时间" model="query.beginDate,query.endDate"/>
            <Input label="手机号" model="query.mobile" placeholder='输入手机号，精确搜索' />
            <Field>
							<Button icon="search" onClick={this.search.bind(this)}>查询</Button>
					  </Field>
          </Form>
					<Button onClick={this.sendNewMessage.bind(this)}>发送新短信</Button>
          {/* <DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={userApi.listPage} query={query}/> */}
        </Box>
        <SendMessageModal ref={(e) => this._sendMessageModal = e}/>
      </Content>
    )
  }

  search(){

  }

  sendNewMessage(){
    this._sendMessageModal.show()
  }
}