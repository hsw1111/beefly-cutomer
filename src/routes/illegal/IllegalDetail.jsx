import React from 'react';
import {Button, Content} from "beefly-common";
import {urlUtils} from 'jeselvmo';
import tripProblemApi from "../../apis/tripProblemApi";
import RejectModal from "./modals/RejectModal";
import Detail from "./blocks/Detail";
import beefly from "../../js/beefly";

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
		this.fetchDetail()
	}

	render() {
		let {detail} = this.state;
		if (detail) {
			return (
				<Content>
					<Detail detail={detail} showHandle showRemarks/>
					<div className="pull-right buttons margin-b-20">
						{this.renderPrize()}
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
		this.fetchDetail()
	}

	// 确认处理
	confirm() {
		beefly.tabs.addTab({
			name: '确认处理-' + this.state.detail.id,
			path: '/illegal/confirm',
			params: {
				id: this.state.detail.id
			}
		})
	}

	//关闭详情
	closed() {
		beefly.tabs.closeTab();
	}

	async fetchDetail() {
		let {id} = urlUtils.getParams();
		let result = await tripProblemApi.detail({id});
		let detail = result.data;
		this.setState({
			detail
		});
	}

	renderPrize() {
		let {detail} = this.state;
		if(detail.state == 5) {
			return <Button onClick={this.closed.bind(this)}>关闭</Button>
		}else{
			return <div>
				<Button onClick={this.reject.bind(this)}>驳回处理</Button>
				<Button onClick={this.confirm.bind(this)}>确认处理</Button>
				<Button onClick={this.closed.bind(this)}>关闭</Button>
			</div>
		}
	}

}
