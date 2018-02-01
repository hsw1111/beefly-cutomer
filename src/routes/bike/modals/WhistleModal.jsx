import React from 'react';
import {Modal, Button} from "beefly-common";
import bikeApi from '../../../apis/bikeApi'



/**
 * 车辆信息——鸣笛 弹框
 */

export default class WhistleModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			show: false,
		}
	}

	render() {
		let {show} = this.state;
		return (
			<Modal show={show} title="提示" onHide={this.hide.bind(this)}>
				<Modal.Body>
					<div>确定要鸣笛吗？</div>
				</Modal.Body>
				<Modal.Footer>
					<Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)}/>
					<Button value={'确定'} onClick={this.ok.bind(this)}/>
				</Modal.Footer>
			</Modal>
		)
	}

	show({bikeCode}) {
    this.setState({
			show: true,
			bikeCode
		})
	}

	hide() {
		this.setState({
			show: false
		})
	}

	async ok() {
		let {bikeCode} = this.state;
		let result = await bikeApi.whistle({bikeCode})
		this.hide()
	}

}
