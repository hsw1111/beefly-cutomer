import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, Modal,Input, msgBox, Textarea } from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
import beefly from "../../../js/beefly";
import userApi from "../../../apis/userApi";

/**
 * 取消冻结用户
 */
export default class UnfreezeModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			data: {},
			blackBeason:'',
			remark: '',
		}
	}

	render() {
		let {show,data,remark,blackBeason} = this.state;
		return (
			<Modal show={show} title="取消冻结用户押金" onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
				<Modal.Body>
					    <div className="margin-l-15">冻结原因：<span style={{color:'#ccc'}}>{blackBeason}</span>	 	</div>
					    <div className="margin-l-15">确定取消冻结用户“{data.mmobile}”的押金么？</div>
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

	async show(data) {
		console.log(data,44444444444444)
		this.setState({
			show: true,
			data,
			remark: ''
		});
		let parms={
			appUserId:data.id,
			type:3
		};
		let result = await userApi.creditRemark(parms);
		this.setState({
            blackBeason:result.data
		});
		console.log(result,4561323)
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
		let result = await userApi.credibly(parms);
		if(result.resultCode==1){
			this.hide(true);
			msgBox.success('取消冻结用户押金成功');
		}


	}

}
