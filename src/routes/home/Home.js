import React from 'react';
import {Content, utils, Form, Input, Checkbox, Box, Button} from 'beefly-common';
import systemApi from "../../apis/systemApi";
import {localStore} from 'jeselvmo';

export default class Home extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: 'admin',
			password: '123456',
			loginUser: null,
		};
	}

	render() {
		return (
			<Content>
				<div className="row margin-bottom">
					<div className="text-center">
						<h1>欢迎登录蜜蜂出行客服管理平台</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-md-3"/>
					<div className="col-md-6">
						<Box title={'用户登录'}>
							<Box.Body>
								<Form horizontal>
									<div className="box-body">
										<Input label={'用户名'} model={'username'}/>
										<Input label={'密码'} model={'password'}/>
									</div>
								</Form>
							</Box.Body>
							<Box.Footer className={'text-right'}>
								<Button value={'登录'} onClick={this.login.bind(this)}/>
							</Box.Footer>
						</Box>
					</div>
					<div className="col-md-3"/>
				</div>
			</Content>
		)
	}

	componentDidMount() {

		let loginUser = localStore.get('loginUser');
		this.setState({
			loginUser
		})

	}


	async login() {
		let {username, password} = this.state;
		const result = await systemApi.login({
			userName: username,
			passWord: password
		});

		if (result.resultCode === 1) {
			let loginUser = result.data;
			localStore.set('loginUser', loginUser);
			this.setState({
				loginUser
			})
		}

		utils.alert(result.message)
	}

	logoff() {
		let loginUser = null;
		localStore.set('loginUser', loginUser);
		this.setState({
			loginUser
		})
	}
}
