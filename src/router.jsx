import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { asyncComponent } from 'beefly-common';

const Bike = asyncComponent(() => import(/* webpackChunkName: "bike/index" */'./routes/bike/Bike'));
const BikeInfo = asyncComponent(() => import(/* webpackChunkName: "bike/info" */'./routes/bike/BikeInfo'));
const BikeLog = asyncComponent(() => import(/* webpackChunkName: "bike/log" */'./routes/bike/BikeLog'));
const BikeMonitor = asyncComponent(() => import(/* webpackChunkName: "bike/monitor" */'./routes/bike/BikeMonitor'));
const BikeWindMornitor = asyncComponent(() => import(/* webpackChunkName: "bike/windMornitor" */'./routes/bike/BikeWindMornitor'));
const Error404 = asyncComponent(() => import(/* webpackChunkName: "error/404" */'./routes/error/Error404'));
const Error500 = asyncComponent(() => import(/* webpackChunkName: "error/500" */'./routes/error/Error500'));
const User = asyncComponent(() => import(/* webpackChunkName: "user/index" */'./routes/user/User'));
const UserInfo = asyncComponent(() => import(/* webpackChunkName: "user/info" */'./routes/user/UserInfo'));
const UserProblem = asyncComponent(() => import(/* webpackChunkName: "user/problem" */'./routes/user/UserProblem'));
const UserSms = asyncComponent(() => import(/* webpackChunkName: "user/sms" */'./routes/user/UserSms'));
const UserVerification = asyncComponent(() => import(/* webpackChunkName: "user/verification" */'./routes/user/UserVerification'));

/**
 * 模块路由
 */
export default () => (
	<Router>
		<Switch>
			<Route exact path="/bike" component={Bike}/>
			<Route exact path="/bike/info" component={BikeInfo}/>
			<Route exact path="/bike/log" component={BikeLog}/>
			<Route exact path="/bike/monitor" component={BikeMonitor}/>
			<Route exact path="/bike/windMornitor" component={BikeWindMornitor}/>
			<Route exact path="/error/404" component={Error404}/>
			<Route exact path="/error/500" component={Error500}/>
			<Route exact path="/user" component={User}/>
			<Route exact path="/user/info" component={UserInfo}/>
			<Route exact path="/user/problem" component={UserProblem}/>
			<Route exact path="/user/sms" component={UserSms}/>
			<Route exact path="/user/verification" component={UserVerification}/>
			<Route path="*" component={Error404}/>
		</Switch>
	</Router>
)
