import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, Modal,Input, msgBox} from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
import beefly from "../../../js/beefly";
import appUserApi from "../../../apis/appUserApi";

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
					    <p>原手机号：{data.mmobile}</p>
					    <p><Input label="新手机号" model={'remark'} type="number" width={200} validation={{required: true}}/></p>
					    <p>*修改手机号后，原手机号所有数据被变更到新手机号下，如订单、</p>
					    <p>车辆、积分、出行券等，原手机号所有数据不再保存。</p>
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
		console.log(data)
	}

	hide() {
		this.setState({
			show: false
		})
	}

	async ok() {
		let {remark,data} = this.state;
		let parms={
			appUserId:data.id,
			mobile:remark
		};
		let result = await appUserApi.modifyMobile(parms);
		this.hide();
		msgBox.warning(result.message);

	}

}
