import React from 'react';
import {Form, Modal, Textarea, Button, utils, msgBox} from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
import beefly from "../../../js/beefly";

/**
 * 驳回处理弹框
 */
export default class RejectModal extends React.Component {

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
			<Modal show={show} title="驳回处理" onHide={this.hide.bind(this)}>
				<Modal.Body>
					<Form>
						<div>
							确定驳回此次违停上报记录吗？
						</div>
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
		let {onClose} = this.props;
		if(remark==''){
			msgBox.warning("备注不能为空");
			return
		}
		let result = await tripProblemApi.reject({id, remark});
		if (result.resultCode == 1) {
			this.hide();
			msgBox.success('驳回成功');
			onClose && onClose()
		}
	}

}


RejectModal.propTypes = {
	onClose: React.PropTypes.func,
}

RejectModal.defaultProps = {}
