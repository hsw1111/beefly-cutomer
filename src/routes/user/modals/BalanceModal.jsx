import React from 'react';
import {Button, Form, Modal,Input, msgBox, Textarea, Row, Col, Text, Box, DataTable, dtUtils } from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
import beefly from "../../../js/beefly";
import balaceRecordApi from "../../../apis/balaceRecordApi";
import userApi from "../../../apis/userApi";

/**
 * 余额管理
 */
export default class BalanceModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      show: false,
      detail: '',
			query: {
        userId: '',
        amount: '',
        remark: ''
      },
      columns: [
        {title: '编号', data: 'id'},
				{title: '时间', data: 'createTime', render: dtUtils.renderDateTime},
				{title: '操作人', data: 'createdName'},
				{title: '增加/减少金额', data: 'amount', render: (data, type, row) => (row.modifyType == 1 ? '+' : '-') + data},
				{title: '当前总余额', data: 'newBalance'},
				{title: '备注', data: 'remark'},
      ],
      queryTable: {
        userId: '',
        modifySource: 1   //查询赠送余额列表，固定传参为1
      }
		}
	}

	render() {
		let {show, detail, query, columns, queryTable} = this.state;
		return (
			<Modal show={show} title="余额管理" size='lg' onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
      {show &&
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
            <p style={{margin: '10px 14px'}}>用户当前余额：<span className='text-orange'>	{((detail.balance*100 || 0) + (detail.grantBalance*100 || 0))/100}元</span>（充值金额{detail.balance || 0}元+赠送金额{detail.grantBalance || 0}元）</p>
            <Input label="金额" type='number' model='query.amount' validation={{required: true}} width={250} placeholder='正数为增加，负数为减少'/>
						<Textarea label="备注" model='query.remark'  width={450}/>
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
      }
			</Modal>
		)
	}

	async show(data) {
    this.setState({
      show: true,
      queryTable: {
        userId: data.id
      },
      query: {
        userId: data.id,
        amount: '',
        remark: ''
      }
    })

    let result = await userApi.userDetail({id: data.id})
    this.setState({
      detail: result.data
    })
	}

	hide(isCallback) {
		this.setState({
      show: false,
    });
    if(isCallback){
			let {onSuccess} = this.props;
			onSuccess && onSuccess();
		}
	}

	async ok() {
    let {query} = this.state;
    if (query.amount == '') {
      msgBox.warning("金额不能为空");
      return
    }
    let result = await balaceRecordApi.addRecord(query)
    if(result.resultCode == 1){
      msgBox.success('修改余额成功！');
      this.hide(true);
    }
	}

}
