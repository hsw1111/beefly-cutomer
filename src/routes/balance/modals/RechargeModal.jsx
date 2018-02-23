import React from 'react';
import {Button, Form, Modal,Input, msgBox, Textarea, Row, Col, Text, Box, DataTable, dtUtils } from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
import beefly from "../../../js/beefly";
import balaceRecordApi from "../../../apis/balaceRecordApi";
import userApi from "../../../apis/userApi";

/**
 * 充值明细
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
				{title: '时间', data: 'createTime', render: dtUtils.renderDateTime},
				{title: '充值金额', data: 'amount', render: (data, type, row) => (row.modifyType == 1 ? '+' : '-') + data},
				{title: '当前剩余充值余额', data: 'newBalance'},
				{title: '充值方式', data: 'remark'},
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
			<Modal show={show} title="充值金额充值明细" size='lg' onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
      {show &&
				<Modal.Body style={{height: 660}}>
					<Form className="form-label-100" horizontal>
            <Row>
              <Col md={5}>
                <Text label="用户编号" value={detail.id}/>
              </Col>
              <Col md={5}>
                <Text label="手机号" value={detail.mobile}/>
              </Col>
            </Row>
            <p style={{margin: '10px 14px'}}>用户当前充值余额：<span className='text-orange'>{detail.rechargeBalance}</span></p>
					</Form>
          <div  className='margin-t-20'>
            <Box title='充值金额的充值记录'>
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
      detail:data,
      queryTable: {
        userId: data.id
      },
      query: {
        userId: data.id,
        amount: '',
        remark: ''
      }
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
