import React from 'react';
import {Button, Form, Modal,Text,} from "beefly-common";


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
    let {show, detail,} = this.state;
		return (
			<Modal show={show} title="提现详情" size='md' onHide={this.hide.bind(this)}>
      {show &&
				<Modal.Body>
					<Form className="form-label-100">
            <Text label="提现编号" value={detail.id}/>
            <Text label="用户编号" value={detail.id}/>
            <Text label="用户姓名" value={detail.id}/>
            <Text label="手机号" value={detail.id}/>
            <div className='margin-t-20 margin-b-20'>
              <Text label="提现时间" value={detail.id}/>
              <Text label="提现状态" value={detail.id}/>
              <Text label="提现账号" value={detail.id}/>
              <Text label="提现金额" value={detail.id}/>
            </div>
            
            <Text label="操作人" value={detail.id}/>
            <Text label="备注" value={detail.id}/>
					</Form>
          <div style={{ float: 'right'}}>
              <Button value={'关闭'} theme={'default'} onClick={this.hide.bind(this)} />
          </div>
				</Modal.Body>
      }
			</Modal>
		)
	}

	show(data) {
    this.setState({
      show: true,
      detail: data
    })
	}

	hide() {
		this.setState({
      show: false,
    });
	}
}
