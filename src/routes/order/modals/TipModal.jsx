import React from 'react';
import {Modal} from "beefly-common";

/**
 * 车辆关锁
 */

export default class TipModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
		}
	}

	render() {
		let {show} = this.state;
		return (
			<Modal show={show} title="">
				<Modal.Body>
					<div style={{textAlign: 'center'}}>
						处理中...
					</div>
				</Modal.Body>
			</Modal>
		)
	}

	show(show) {
		this.setState({
			show
		})
	}
}
