import React from 'react';
import {observer} from 'mobx-react';
import {Button, Content} from "beefly-common";
import {urlUtils} from 'jeselvmo';
import userApi from "../../apis/userApi";
import beefly from "../../js/beefly";
import Detail from "./blocks/Details";
import userStore from "../../stores/userStore";

/**
 * 用户管理详情
 */
@observer
export default class IllegalDetails extends React.Component {


	componentWillMount() {
		userStore.fetchDetail()
	}

	render() {
		let {detail} = userStore;
		if (detail) {
			return (
				<Content>
					<Detail showHandle showRemarks/>
				</Content>
			)
		}
		return null
	}

	//关闭详情
	closed() {
		beefly.tabs.closeTab();
	}

}
