import React from 'react';
import {Modal, Button, msgBox, dtUtils} from "beefly-common";
import userApi from "../../../apis/userApi";
import symsApi from "../../../apis/symsApi";

/**
 * 清除验证码限制
 */
export default class ClearSmsModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			data: {},
			count:''
		}

	}

	render() {
		let {show,data,count} = this.state;
		return (
			<Modal show={show} title="清除验证码限制" onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
				<Modal.Body>
					<div className="margin-l-15">确定要清除手机号({data.mmobile})今日收到验证码的次数限制么？</div>
					<div className="margin-l-15 margin-t-5" style={{fontSize:12,color:'#555'}}>今日已收到的验证码次数为：{count}次</div>
				</Modal.Body>
				<Modal.Footer>
					<Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)}/>
					<Button value={'确定'} onClick={this.ok.bind(this)}/>
				</Modal.Footer>
			</Modal>
		)
	}

	async show(data) {
		this.setState({
			show: true,
			data
		});
		let parms={
			mobile:data.mmobile,
			serviceType:0,
			qSendTimeStart: dtUtils.renderDate(new Date())
		};
		let result = await symsApi.countSms(parms);
		this.setState({
			count:result.data
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
		let {data} = this.state;
		let parms={
			appUserId:data.id,
		};
		let result = await userApi.clearSms(parms);
		this.hide(true);
		msgBox.warning(result.message);
	}

}
