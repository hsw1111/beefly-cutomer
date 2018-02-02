import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, Modal,Input, msgBox} from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
import beefly from "../../../js/beefly";
import userApi from "../../../apis/userApi";

/**
 * 修改手机号
 */
export default class ModifyModal extends React.Component {

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
			<Modal show={show} title="修改手机号" onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
				<Modal.Body>
					<Form className='form-label-150' inline>
							<p>原手机号：{data.mmobile}</p>
					    <Input label="新手机号" model={'remark'} type="number" width={200} validation={{required: true}}/>

					</Form>
					<div className='margin-t-30' style={{color:'#ccc'}}>*修改手机号后，原手机号所有数据被变更到新手机号下，如订单、<br />车辆、积分、出行券等，原手机号所有数据不再保存。</div>
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
		})
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
		let parms={
			appUserId:data.id,
			mobile:remark
		};

		var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		if(!myreg.test(parms.mobile)){
				msgBox.warning('请输入有效的手机号码！');
				return;
		}
		let result = await userApi.modifyMobile(parms);
		if(result.resultCode==1){
			msgBox.success('修改手机号码成功！')
			this.hide(true);
		}
	}

}
