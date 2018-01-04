import React from 'react';
import {Box, Content, Modal, Form, Textarea} from "beefly-common";

/**
 * 添加备注弹框
 */
export default class AddRemarkModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			remark: '',
			remark1: '',
		}
	}

	render() {
		let {show, remark} = this.state;
		return (
			<Modal show={show} title="添加备注" onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
				<Form>
					<Textarea label="备注" rows={5} value={remark} model="remark1"
							  onChange={(e) => this.setState({remark: e.target.value})}/>
				</Form>
			</Modal>
		)
	}

	show() {
		this.setState({
			show: true
		})
	}

	hide() {
		this.setState({
			show: false
		})
	}

	ok() {
		let {remark, remark1} = this.state;
		console.log('remark:', remark)
		console.log('remark1:', remark1)
		this.hide()
	}

}
