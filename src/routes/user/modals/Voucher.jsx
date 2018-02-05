import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, Modal,Input, msgBox, Textarea } from "beefly-common";

import userApi from "../../../apis/userApi";

/**
 *  确定群发出行券
 */
export default class VoucherModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			data: [],
		}
	}

	render() {
		let {show, data} = this.state;
		return (
			<Modal show={show} title="确定群发出行券" onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
				<Modal.Body>
					    
				</Modal.Body>
				<Modal.Footer>
					<Button value={'取消发送'} theme={'default'} onClick={this.hide.bind(this)}/>
					<Button value={'确定发送'} onClick={this.ok.bind(this)}/>
				</Modal.Footer>
			</Modal>
		)
	}

	async show(data) {
		this.setState({
			show: true,
			data,
		});
	}

	hide(isCallback) {
		this.setState({
			show: false
		});

		if(isCallback){
			let {onSuccess} = this.props;
			onSuccess && onSuccess();
		}
	}

	async ok() {
		let {remark,data} = this.state;
		let result = await userApi.credibly(parms);
		if(result.resultCode==1){
			this.hide(true);
			msgBox.success('群发出行券成功');
		}


	}

}
