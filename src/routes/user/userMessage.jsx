import React from 'react';
import {observer} from 'mobx-react';
import {Button, Content, Box, DateRange, Input, Form, Field, DataTable, dtUtils} from "beefly-common";
import userStore from "../../stores/userStore";
import symsApi from '../../apis/symsApi';
import SendMessageModal from './modals/SendMessageModal';
import {purposeType} from '../../maps/userMap';
import $ from 'jquery';


/**
 * 用户管理 短信管理
 */

@observer
export default class UserMessage extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      columns: [
        {title: '用户编号', data: 'userCode'},
				{title: '手机号', data: 'mobile'},
				{title: '发送时间', data: 'sendTime', render: dtUtils.renderDateTime},
				{title: '发送人员', data: 'senderName'},
				{title: '发送目的', data: 'serviceType', render: (data) => dtUtils.renderMap(data, purposeType)},
				{title: '信息内容', data: 'content'},
      ],

      query: {
        qSendTimeStart: '',
        qSendTimeEnd: '',
        mobiles: ''
      },
    }
  }

  render() {
    let {columns, query} = this.state
    return(
      <Content>
        <Box>
          <Form inline className='user-block'>
            <DateRange label="发送时间" model="query.qSendTimeStart,query.qSendTimeEnd"/>
            <Input label="手机号" model="query.mobiles" placeholder='输入手机号，精确搜索' />
            <Field>
							<Button icon="search" onClick={this.search.bind(this)}>查询</Button>
					  </Field>
          </Form>
					<Button onClick={this.sendNewMessage.bind(this)}>发送新短信</Button>
          <div>
            <DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={symsApi.pageSms}/>
          </div>

        </Box>
        <SendMessageModal ref={(e) => this._sendMessageModal = e} onSuccess={this.search.bind(this)}/>
      </Content>
    )
  }

  search(){
    let {query} = this.state;
    this._dataTable.search(query)
  }

  sendNewMessage(){
    this._sendMessageModal.show()
  }
}
