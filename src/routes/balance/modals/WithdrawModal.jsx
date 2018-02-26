import React from 'react';
import {Button, Form, Modal,Input, msgBox, Textarea, Row, Col, Text, Box, DataTable, dtUtils } from "beefly-common";
import balaceRecordApi from "../../../apis/balaceRecordApi";
import beefly from "../../../js/beefly";

/**
 * 提现
 */
export default class BalanceModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      show: false,
      detail: '',
			query: {
        appUserId: '',
        payeeAccount: '',
        payeeAmount: '',
        payeeRealName: '',
        payeeRemark: ''
      },
      columns: [
				{title: '提现时间', data: 'applyTime', render: dtUtils.renderDateTime},
				{title: '提现金额', data: 'payeeAmount', render: (data, type, row) => (row.modifyType == 1 ? '+' : '-') + data},
				{title: '支付宝账号', data: 'payeeAccount'},
				{title: '收款人姓名', data: 'payeeRealName'},
				{title: '备注', data: 'payeeRemark'},
      ],
      queryTable: {
        appUserId: '',
      }
		}
	}

	render() {
    let {show, query, columns, queryTable} = this.state;
    console.log(query)
		return (
			<Modal show={show} title="提现" size='lg' onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
      {show &&
				<Modal.Body style={{height: 660}}>
					<Form className="form-label-100" horizontal>
            <Input label="支付宝账户" model="query.payeeAccount" placeholder='支付宝账号/手机号' width={250}  validation={{required: true}} />
            <Input label="收款人姓名" model="query.payeeRealName" placeholder='默认为用户姓名' width={250}  />
            <Input label="提现备注" model="query.payeeRemark"  width={250} />
            <Input label="提现金额" type="number" model="query.payeeAmount" placeholder='默认为充值剩余金额' width={250}  validation={{required: true}} />
					</Form>
          <div style={{ float: 'right'}}>
              <Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)} className="margin-r-20" />
              <Button value={'确定'} onClick={this.ok.bind(this)}/>
          </div>
          <div  className='margin-t-50'>
            <Box title='提现记录'>
              <DataTable ref={(e) => this._dataTable = e}
                  columns={columns} api={balaceRecordApi.withdrawPage} query={queryTable}/>
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
        appUserId: data.id
      },
      query: {
        appUserId: data.id,
        payeeAccount: '',
        payeeAmount: data.balance,
        payeeRealName: data.name,
        payeeRemark: ''
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
    if (query.payeeAccount == '') {
      msgBox.warning("支付宝账户不能为空");
      return
    }
    if (query.payeeAmount == '') {
      msgBox.warning("提现金额不能为空");
      return
    }
    if (query.payeeAmount <= 0) {
      msgBox.warning("提现金额不能小于0");
      return
    }
    let result = await balaceRecordApi.withdraw(query)
    if(result.resultCode == 1){
      msgBox.success('提现成功！');
      this.hide(true);
    }
	}

}
