import React from 'react';
import {Content} from "beefly-common";
import {urlUtils} from 'jeselvmo';
import tripProblemApi from "../../apis/tripProblemApi";
import UserAward from "./blocks/UserAward";
import HandleSuggestion from "./blocks/HandleSuggestion";
import IllegalCategory from "./blocks/IllegalCategory";
import Detail from "./blocks/Detail";

/**
 * 违停上报确认
 */
export default class IllegalConfirm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			detail: null,
			orderDetail: null
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
		let {detail, orderDetail} = this.state;
		if (detail) {
			return (
				<Content>
					<Detail detail={detail} simple/>
					{detail.reportRole != 0 && <IllegalCategory detail={detail}
																onOrderChange={this.orderChange.bind(this)}/>}
					{detail.reportRole == 0 ? <UserAward detail={detail}/> :
						<HandleSuggestion detail={detail} orderDetail={orderDetail}/>}
				</Content>
			)
		}
		return null
	}

	orderChange(orderDetail) {
		this.setState({
			orderDetail
		})
	}
}
