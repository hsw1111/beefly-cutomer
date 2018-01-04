import React from 'react';
import {Box, Content, Modal} from "beefly-common";

/**
 * 驳回处理弹框
 */
export default class RejectModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false
		}
	}

	render() {
		let {show} = this.state;
		return (
			<Modal show={show} title="驳回处理">
				确定驳回此次违停上报记录吗？
			</Modal>
		)
	}

	show() {
		this.setState({
			show: true
		})
	}

}
