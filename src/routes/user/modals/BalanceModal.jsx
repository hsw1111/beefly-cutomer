import React from 'react';
import {Button, Form, Modal,Input, msgBox, Textarea, Row, Col, Text, Box, DataTable, dtUtils } from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
import beefly from "../../../js/beefly";
import balaceRecordApi from "../../../apis/balaceRecordApi";

/**
 * 修改手机号
 */
export default class BalanceModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      show: false,
      data: '',
			query: {
        amount: '',
        remark: ''
      },
      columns: [
        {title: '编号', data: 'id'},
				{title: '时间', data: 'createTime', render: dtUtils.renderDateTime},
				{title: '操作人', data: 'createdName'},
				{title: '增加/减少金额', data: 'amount', render: (data, type, row) => (row.modifyType === 0 ? '+' : '-') + data},
				{title: '当前总余额', data: 'newBalance'},
				{title: '备注', data: 'remark'},
      ],
      queryTable: {
        userId: '',
        modifySource: 1
      }
		}
	}

	render() {
		let {show, data, query, columns, queryTable} = this.state;
		return (
			<Modal show={show} title="余额管理" size='lg' onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
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
            <Input label="金额" type='number' model={'query.amount'} validation={{required: true}} width={250} placeholder='正数为增加，负数为减少'/>
						<Textarea label="备注" model={'query.remark'}  width={450}/>
					</Form>
          <div style={{ float: 'right'}}>
              <Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)} className="margin-r-20" />
              <Button value={'确定'} onClick={this.ok.bind(this)}/>
          </div>
          <div  className='margin-t-50'>
            <Box title='赠送余额充值记录'>
              <DataTable ref={(e) => this._dataTable = e}
                  columns={columns} api={balaceRecordApi.page} query={queryTable}/> 
            </Box>
          </div>
          
				</Modal.Body>
			</Modal>
		)
	}

	show(data) {
		this.setState({
      show: true,
      data,
    });
    let {queryTable} = this.state
    queryTable.userId =  data.id
    this._dataTable.search(queryTable)
	}

	hide() {
		this.setState({
      show: false,
      queryTable: {
        userId: ''
      }
		});
	}

	async ok() {
    let {query} = this.state;
    if (query.amount == '') {
      msgBox.warning("金额不能为空");
      return
    }
		this.hide();
	}

}
