import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, Modal,Input, msgBox, Textarea } from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
import beefly from "../../../js/beefly";
import userApi from "../../../apis/userApi";

/**
 * 修改手机号
 */
export default class BlackModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			data: {},
			remark: '',
		}
	}

	render() {
		let {show,data,remark} = this.state;
		return (
			<Modal show={show} title="拉黑" onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
				<Modal.Body>
					    <div className="margin-l-15">确定是否把用户“{data.mmobile}”拉黑？</div>
					    <div className="margin-l-15 margin-t-5" style={{color:'#ccc'}}>拉黑后，用户无法再租用小蜜蜂.</div>
					<Form ref={e => this._form = e}>
						<Textarea label="备注" rows={5} model="remark" validation={{required: true}}/>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)}/>
					<Button value={'确定'} onClick={this.ok.bind(this)}/>
				</Modal.Footer>
			</Modal>
		)
	}

	show(data) {
		this.setState({
			show: true,
			data,
			remark: ''
		});
		console.log(data)
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
		if(remark==''){
			msgBox.warning("备注不能为空");
			return
		}
		let parms={
			appUserId:data.id,
			remark:remark
		};
		let result = await userApi.black(parms);
		this.hide(true);
		msgBox.warning(result.message);
	}

}
