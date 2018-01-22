import React from 'react';
import {observer} from 'mobx-react';
import {Button, Content, Box, DateRange, Input, Form, Field, DataTable, dtUtils} from "beefly-common";
import userStore from "../../stores/userStore";
import symsApi from '../../apis/symsApi'
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
				{title: '手机号', data: 'mobile'},
				{title: '发送时间', data: 'sendTime', render: dtUtils.renderDateTime},
				{title: '短信内容', data: 'content'},
      ],
      
      query: {
        mobiles: '',
        serviceType: 0
      }
    }
  }

  render() {
    let {columns, query} = this.state
    return(
      <Content>
        <Box>
          <Form inline className='user-block'>
            <Input label="手机号" model="query.mobiles" placeholder='输入手机号，精确搜索' />
            <Field>
							<Button icon="search" onClick={this.search.bind(this)}>查询</Button>
					  </Field>
          </Form>
          <DataTable ref={(e) => this._dataTable = e}
							   columns={columns} api={symsApi.pageSms} query={query}/>
        </Box>
      </Content>
    )
  }

  search(){
    let {query} = this.state
    this._dataTable.search(query)
  }
}