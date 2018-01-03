import React from 'react';
import {Box, Content, Modal, Form, Input} from "beefly-common";

/**
 * 添加备注弹框
 */
export default class AddRemarkModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
		}
	}

	render() {
		let {show} = this.state;
		return (
			<Modal show={show} title="添加备注" onOk={this.onOk.bind(this)}>
				<Form>
					<Input ref={e => this._remark = e} label="备注"/>
				</Form>
			</Modal>
		)
	}

	show() {
		this.setState({
			show: true
		})
	}

	onOk() {
		let {onOk} = this.props;
		console.log(this._remark.value)
		if (onOk) {
			onOk(this._remark.value)
		}
	}

}
