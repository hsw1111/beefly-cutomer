import React from 'react';
import {Modal, Form, Textarea, utils} from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";

/**
 * 添加备注弹框
 */
export default class AddRemarkModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			id: '',
			remark: ''
		}
	}

	render() {
		let {show} = this.state;
		return (
			<Modal show={show}
				   title="添加备注"
				   onHide={this.hide.bind(this)}
				   onOk={this.ok.bind(this)}>
				<Form>
					<Textarea label="备注" rows={5} model="remark"/>
				</Form>
			</Modal>
		)
	}

	show({id}) {
		this.setState({
			show: true,
			id,
			remark: ''
		})
	}

	hide() {
		this.setState({
			show: false
		})
	}

	async ok() {
		let {id, remark} = this.state;

		let result = await tripProblemApi.addRemark({id, remark});
		if (result.resultCode == 1) {
			this.hide();
			utils.alert('添加备注成功！');
			this.timer = setTimeout(
				() => {
					utils.close();
				},
				3000
			);
		}
	}

}
