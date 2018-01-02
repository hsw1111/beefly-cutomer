import React from 'react';
import beefly from '../../js/beefly';

export default class Home extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			title: '欢迎登录蜜蜂出行客服管理平台'
		};

		beefly.init = this.init.bind(this);
		beefly.getData = this.getData.bind(this);
	}

	render() {
		let {title} = this.state;
		return (
			<div className="text-center">
				<h1>{title}</h1>
			</div>
		)
	}

	init() {
		this.setState({
			title: '杨可可'
		})
	}

	getData() {
		return this.state
	}
}
