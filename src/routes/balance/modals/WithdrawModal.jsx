import React from 'react';
import {Button, Form, Modal,Input, msgBox, Textarea, Row, Col, Text, Box, DataTable, dtUtils } from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
import beefly from "../../../js/beefly";
import balaceRecordApi from "../../../apis/balaceRecordApi";
import userApi from "../../../apis/userApi";

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
        userId: '',
        amount: '',
        remark: ''
      },
      columns: [
				{title: '提现时间', data: 'createTime', render: dtUtils.renderDateTime},
				{title: '提现金额', data: 'amount', render: (data, type, row) => (row.modifyType == 1 ? '+' : '-') + data},
				{title: '支付宝账号', data: 'newBalance'},
				{title: '收款人姓名', data: 'newBalance'},
				{title: '备注', data: 'remark'},
      ],
      queryTable: {
        userId: '',
        modifySource: 1   //查询赠送余额列表，固定传参为1
      }
		}
	}

	render() {
    let {show, query, columns, queryTable} = this.state;
		return (
			<Modal show={show} title="提现" size='lg' onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
      {show &&
				<Modal.Body style={{height: 660}}>
					<Form className="form-label-100" horizontal>
            <Input label="支付宝账户" model="query.mobiles" placeholder='支付宝账号/手机号' width={250}  validation={{required: true}} />
            <Input label="收款人姓名" model="query.mobiles" placeholder='默认为用户姓名' width={250}  />
            <Input label="提现备注" model="query.mobiles"  width={250} />
            <Input label="提现金额" model="query.mobiles" placeholder='默认为充值剩余金额' width={250}  validation={{required: true}} />
					</Form>
          <div style={{ float: 'right'}}>
              <Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)} className="margin-r-20" />
              <Button value={'确定'} onClick={this.ok.bind(this)}/>
          </div>
          <div  className='margin-t-50'>
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
