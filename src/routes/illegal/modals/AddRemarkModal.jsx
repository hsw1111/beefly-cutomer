import React from 'react';
import {Box, Content, Modal} from "beefly-common";

/**
 * 添加备注弹框
 */
export default class AddRemarkModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false
		}
	}

	render() {
		let {show} = this.state;
		return (
			<Modal show={show} title="添加备注">
				违停上报详情
			</Modal>
		)
	}

	show() {
		this.setState({
			show: true
		})
	}

}
