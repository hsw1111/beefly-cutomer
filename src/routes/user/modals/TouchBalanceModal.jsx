import React from 'react';
import {Button, Form, Modal, Row, Col, Text, Box, DataTable, dtUtils } from "beefly-common";
import balaceRecordApi from "../../../apis/balaceRecordApi";
import appUserApi from "../../../apis/appUserApi";

/**
 * 余额变动明细
 */

export default class BalanceModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      show: false,
      detail: '',
      columns: [
				{title: '操作时间', data: 'createTime', render: dtUtils.renderDateTime},
				{title: '操作人', data: 'createdName'},
				{title: '类别', data: 'createdName'},
				{title: '充值余额变动（¥）', data: 'newBalance', render: (data, type, row) => (row.modifyType === 1 ? '+' : '-') + data},
				{title: '剩余充值余额（¥）', data: 'createdName'},
				{title: '赠送余额变动（¥）', data: 'newBalance', render: (data, type, row) => (row.modifyType === 1 ? '+' : '-') + data},
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
		let {show, detail, query, columns} = this.state;
		return (
			<Modal show={show} title="余额变动明细" size='lg' onHide={this.hide.bind(this)}>
      {show && 
        <div>
				<Modal.Body>
					<Form className="form-label-100" horizontal>
            <Row>
              <Col md={5}>
                <Text label="用户编号" value={detail.id}/>
              </Col>
              <Col md={5}>
                <Text label="手机号" value={detail.mobile}/>  
              </Col>
            </Row>
            <p style={{margin: '10px 14px'}}>用户当前余额：<span className='text-orange'>	{(detail.balance || 0) + (detail.grantBalance || 0)}元</span>（充值金额{detail.balance || 0}元+赠送金额{detail.grantBalance || 0}元）</p>
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
        </div>
      }
			</Modal>
		)
	}

	async show(data) {
		this.setState({
      show: true,
      query: {
        userId: data.id
      }
    });
    let result = await appUserApi.userDetail({id: data.id}) 
    this.setState({
      detail: result.data
    })
	}

	hide() {
		this.setState({
      show: false,
      query: {
        userId: ''
      }
		});
	}
}
