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
		}
	}

	render() {
		let {show} = this.state;
		return (
			<Modal show={show} title="添加备注" onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
				<Form>
					<Textarea label="备注" model="remark" rows={5}/>
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
		let {remark} = this.state;
		console.log('remark:', remark)
		this.hide()
	}

}
