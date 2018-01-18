import React from 'react';
import {observer} from 'mobx-react';
import {Content} from "beefly-common";
import UserAward from "./blocks/UserAward";
import HandleSuggestion from "./blocks/HandleSuggestion";
import IllegalCategory from "./blocks/IllegalCategory";
import Detail from "./blocks/Detail";
import illegalStore from "./stores/illegalStore";

/**
 * 违停上报确认
 */
@observer
export default class IllegalConfirm extends React.Component {

	componentWillMount() {
		illegalStore.fetchDetail()
	}

	render() {
		let {detail} = illegalStore;
		if (detail) {
			return (
				<Content>
					<Detail simple/>
					{detail.reportRole != 0 && <IllegalCategory/>}
					{detail.reportRole == 0 ? <UserAward/> : <HandleSuggestion/>}
				</Content>
			)
		}
		return null
	}
}
