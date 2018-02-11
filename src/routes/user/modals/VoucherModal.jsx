import React from 'react';
import {Button,  Modal, msgBox} from "beefly-common";
import couponApi from "../../../apis/couponApi";

/**
 *  确定群发出行券
 */
export default class VoucherModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			data: [],
			query: ''
		}
	}

	render() {
		let {show, data} = this.state;
		return (
			<Modal show={show} title="群发出行券" onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
				{data && <Modal.Body>
							以下手机号不属于我们的用户，你可以选择“继续发送”，对其他手机号发送出行券；或者点击“取消发送”，删除或修改这些手机号后，再发送。
							<div>
							{data.map((item, index)=>{
							return	<span style={{'white-space':'normal',lineHeight:'30px', color: '#aaa', marginRight: 10}}  key={index}> {item}</span>
							})}
							</div>
				</Modal.Body>}
				<Modal.Footer>
					<Button value={'取消发送'} theme={'default'} onClick={this.hide.bind(this)}/>
					<Button value={'继续发送'} onClick={this.ok.bind(this)}/>
				</Modal.Footer>
			</Modal>
		)
	}

	async show(data, formData) {
		this.setState({
			show: true,
			data: data,
			query: formData
		});
	}

	hide() {
		this.setState({
			show: false,
		});
	}

	async ok() {
		let {data, query} = this.state;
		let {onSuccess} = this.props;
		query.mobile = query.mobile.split(",").filter((item)=>{
			return data.indexOf(item)==-1
		}).join(",")
		let result = await couponApi.massCoupon(query);
		if (result.resultCode == 1) {
			msgBox.success("群发出行券成功")
			onSuccess && onSuccess();
			this.hide()
		}
	}

}
