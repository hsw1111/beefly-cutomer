import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, Modal, Textarea} from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
import beefly from "../../../js/beefly";

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
			<Modal show={show} title="添加备注" onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
				<Modal.Body>
					<Form ref={e => this._form = e}>
						<Textarea label="备注" rows={5} model="remark" validation={{required: true}}/>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)}/>
					<Button value={'确定'} onClick={this.ok.bind(this)}/>
				</Modal.Footer>
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
			beefly.gritter.success('添加备注成功！');
		}
	}

}
