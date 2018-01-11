import React from 'react';
import {Content, utils} from 'beefly-common';
import systemApi from "../../apis/systemApi";
import {localStore} from 'jeselvmo';

export default class Home extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			username: 'admin2',
			password: '123456',
			loginUser: null,
		};
	}

	render() {
		let {username, password, loginUser} = this.state;
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
						<div className="box box-info">
							<div className="box-header with-border">
								<h3 className="box-title">用户登录</h3>
							</div>
							<form className="form-horizontal">
								<div className="box-body">
									<div className="form-group">
										<label className="col-sm-2 control-label">Username</label>

										<div className="col-sm-10">
											<input type="email" className="form-control" placeholder="Username"
												   value={username}/>
										</div>
									</div>
									<div className="form-group">
										<label className="col-sm-2 control-label">Password</label>

										<div className="col-sm-10">
											<input type="password" className="form-control" placeholder="Password"
												   value={password}/>
										</div>
									</div>
									<div className="form-group">
										<div className="col-sm-offset-2 col-sm-10">
											<div className="checkbox">
												<label>
													<input type="checkbox"/> Remember me
												</label>
											</div>
										</div>
									</div>
								</div>
								<div className="box-footer text-right">
									<button type="button" className="btn btn-default margin-r-5" onClick={this.logoff.bindt}>注销</button>
									<button type="button" className="btn btn-info" onClick={this.login.bind(this)}>登录
									</button>
								</div>
							</form>
						</div>
					</div>
					<div className="col-md-3"/>
				</div>
				<div className="row">
					<div className="col-md-12">
						<pre>{JSON.stringify(loginUser, null, '  ')}</pre>
					</div>
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

	logoff(){
		let loginUser = null;
		localStore.set('loginUser', loginUser);
		this.setState({
			loginUser
		})
	}
}
