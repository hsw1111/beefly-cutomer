import React from 'react';
import {Content, Button, utils} from "beefly-common";
import {urlUtils} from 'jeselvmo';
import tripProblemApi from "../../apis/tripProblemApi";
import RejectModal from "./modals/RejectModal";
import Detail from "./blocks/Detail";

/**
 * 违停上报详情
 */
export default class IllegalDetails extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			detail: null
		}
	}

	async componentWillMount() {
		let {id} = urlUtils.getParams();
		let result = await tripProblemApi.detail({id});
		let detail = result.data;

		this.setState({
			detail
		});
	}

	render() {
		let {detail} = this.state;
		if (detail) {
			return (
				<Content>
					<Detail detail={detail} showHandle showRemarks/>
					<div className="pull-right buttons margin-b-20">
						<Button onClick={this.reject.bind(this)}>驳回处理</Button>
						<Button onClick={this.confirm.bind(this)}>确认处理</Button>
						<Button onClick={this.closed.bind(this)}>关闭</Button>
						<RejectModal ref={(e) => this._rejectModal = e} onClose={this.rejectSuccess.bind(this)}/>
					</div>
				</Content>
			)
		}
		return null
	}

	// 驳回处理
	reject() {
		this._rejectModal.show({
			id: this.state.detail.id
		});
	}

	rejectSuccess() {
		location.reload()
	}

	// 确认处理
	confirm() {
		utils.addTab({
			name: '确认处理-' + this.state.detail.id,
			path: '/illegal/confirm',
			params: {
				id: this.state.detail.id
			}
		})
	}

	//关闭详情
	closed() {
		utils.closeTab();
	}

}
