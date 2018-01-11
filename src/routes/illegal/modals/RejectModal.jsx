import React from 'react';
import {Form, Modal, Textarea, utils} from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";

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
			<Modal show={show} title="驳回处理" onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
				<Form>
					<div>
						确定驳回此次违停上报记录吗？
					</div>
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
		let {onClose} = this.props;

		let result = await tripProblemApi.reject({id, remark});
		if (result.resultCode == 1) {
			this.hide();
			utils.alert('驳回成功', ()=>{
				onClose && onClose()
			});
			this.timer = setTimeout(
				() => {
					utils.close();
				},
				3000
			);
		}
	}

}


RejectModal.propTypes = {
	onClose: React.PropTypes.func,
}

RejectModal.defaultProps = {}
