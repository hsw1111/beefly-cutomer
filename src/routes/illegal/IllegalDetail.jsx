import React from 'react';
import {observer} from 'mobx-react';
import {Button, Content} from "beefly-common";
import {urlUtils} from 'jeselvmo';
import tripProblemApi from "../../apis/tripProblemApi";
import RejectModal from "./modals/RejectModal";
import Detail from "./blocks/Detail";
import beefly from "../../js/beefly";
import illegalStore from "./stores/illegalStore";

/**
 * 违停上报详情
 */
@observer
export default class IllegalDetails extends React.Component {

	componentWillMount() {
		illegalStore.fetchDetail()
	}

	render() {
		let {detail} = illegalStore;
		if (detail) {
			return (
				<Content>
					<Detail showHandle showRemarks/>
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
			id: illegalStore.detail.id
		});
	}

	rejectSuccess() {
		illegalStore.fetchDetail()
	}

	// 确认处理
	confirm() {
		beefly.tabs.addTab({
			name: '确认处理-' + illegalStore.detail.id,
			path: '/illegal/confirm',
			params: {
				id: illegalStore.detail.id
			}
		})
	}

	//关闭详情
	closed() {
		beefly.tabs.closeTab();
	}

	renderPrize() {
		let {detail} = illegalStore;
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
