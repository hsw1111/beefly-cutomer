import React from 'react';
import {Content} from 'beefly-common';

export default class Home extends React.Component {

	render() {
		let {company, platform} = window.config;
		return (
			<Content>
				<div className="row margin-bottom">
					<div className="text-center">
						<h1>欢迎登录{company}{platform}</h1>
					</div>
				</div>
			</Content>
		)
	}
}
