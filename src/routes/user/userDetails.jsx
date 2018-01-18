import React from 'react';
import {Button, Content} from "beefly-common";
import {urlUtils} from 'jeselvmo';
import appUserApi from "../../apis/appUserApi";
import beefly from "../../js/beefly";
import Detail from "./blocks/Details";

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
				</Content>
			)
		}
		return null
	}

	//关闭详情
	closed() {
		beefly.tabs.closeTab();
	}

	async fetchDetail() {
		let {id} = urlUtils.getParams();
		let result = await appUserApi.userDetail({id});
		let detail = result.data;
		console.log(id,787878)
		this.setState({
			detail
		});
	}

}
