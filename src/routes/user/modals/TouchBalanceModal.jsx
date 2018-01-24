import React from 'react';
import {Button, Form, Modal, Row, Col, Text, Box, DataTable, dtUtils } from "beefly-common";
import balaceRecordApi from "../../../apis/balaceRecordApi";

/**
 * 余额变动明细
 */

export default class BalanceModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      show: false,
      data: '',
      columns: [
				{title: '操作时间', data: 'createTime', render: dtUtils.renderDateTime},
				{title: '操作人', data: 'createdName'},
				{title: '类别', data: 'createdName'},
				{title: '充值余额变动（¥）', data: 'createdName', render: (data, type, row) => (row.modifyType === 0 ? '+' : '-') + data},
				{title: '剩余充值余额（¥）', data: 'createdName'},
				{title: '赠送余额变动（¥）', data: 'createdName', render: (data, type, row) => (row.modifyType === 0 ? '+' : '-') + data},
				{title: '剩余赠送余额（¥）', data: 'createdName'},
				{title: '总余额', data: 'newBalance'},
				{title: '备注', data: 'remark'},
      ],
      query: {
        userId: '',
      }
		}
  }
  
	render() {
		let {show, data, query, columns} = this.state;
		return (
			<Modal show={show} title="余额变动明细" size='lg' onHide={this.hide.bind(this)}>
				<Modal.Body>
					<Form className="form-label-100" horizontal>
            <Row>
              <Col md={5}>
                <Text label="用户编号" value={data.id}/>
              </Col>
              <Col md={5}>
                <Text label="手机号" value={data.mmobile}/>  
              </Col>
            </Row>
            <p style={{margin: '10px 14px'}}>用户当前余额：<span className='text-orange'>1000元</span>（充值金额{500}元+赠送金额{500}元）</p>
					</Form>
          <div className="margin-t-30">
            <Box title='余额变动明细'>
              <DataTable ref={(e) => this._dataTable = e}
                  columns={columns} api={balaceRecordApi.page} query={query}/> 
            </Box>
          </div>
          
          
				</Modal.Body>
        <Modal.Footer>
          <Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)}/>
        </Modal.Footer>
			</Modal>
		)
	}

	show(data) {
		this.setState({
      show: true,
      data,
    });
    let {query} = this.state
    query.userId =  data.id
    this._dataTable.search(query)
	}

	hide() {
		this.setState({
      show: false,
      queryTable: {
        userId: ''
      }
		});
	}
}
