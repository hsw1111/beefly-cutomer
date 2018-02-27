import React from 'react';
import {Button, Form, Modal,Text,} from "beefly-common";
import balaceRecordApi from "../../../apis/balaceRecordApi";
import {withdrawState} from '../../../maps/balanceMap';


/**
 * 提现详情
 */
export default class DetailModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      show: false,
      detail: '',
		}
	}

	render() {
    let {show, detail} = this.state;
		return (
			<Modal show={show} title="提现详情" size='md' onHide={this.hide.bind(this)}>
      {show &&
				<Modal.Body>
					<Form className="form-label-100"  horizontal>
            <Text label="提现编号" value={detail.id}/>
            <Text label="用户编号" value={detail.userId}/>
            <Text label="用户姓名" value={detail.userName}/>
            <Text label="手机号" value={detail.mobile}/>
            <div className='margin-t-20 margin-b-20'>
              <Text label="提现时间" value={detail.applyTime}/>
              <Text label="提现状态" value={withdrawState[detail.state]}/>
              <Text label="提现账号" value={detail.payeeAccount}/>
              <Text label="提现金额" value={detail.payeeAmount+'元'}/>
            </div>
            
            <Text label="操作人" value={detail.createName}/>
            <Text label="备注" value={detail.payeeRemark}/>
					</Form>
          <div style={{ float: 'right'}}>
              <Button value={'关闭'} theme={'default'} onClick={this.hide.bind(this)} />
          </div>
				</Modal.Body>
      }
			</Modal>
		)
	}

	async show(data) {
    let result = await balaceRecordApi.withdrawDetail({id: data.id})
    this.setState({
      show: true,
      detail: result.data
    })
	}

	hide() {
		this.setState({
      show: false,
    });
	}
}
