import React from 'react';
import {Box, Content, dtUtils} from "beefly-common";
import {urlUtils} from 'jeselvmo';
import tripProblemApi from "../../apis/tripProblemApi";
import {reportState} from '../../maps/illegalMap';
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
					<Detail detail={detail}/>
				</Content>
			)
		}
		return null
	}

}
