import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { asyncComponent } from 'beefly-common';

const Bike = asyncComponent(() => import(/* webpackChunkName: "bike/index" */'./routes/bike/Bike'));
const BikeDetails = asyncComponent(() => import(/* webpackChunkName: "bike/details" */'./routes/bike/BikeDetails'));
const BikeInfo = asyncComponent(() => import(/* webpackChunkName: "bike/info" */'./routes/bike/BikeInfo'));
const BikeLog = asyncComponent(() => import(/* webpackChunkName: "bike/log" */'./routes/bike/BikeLog'));
const BikeMonitor = asyncComponent(() => import(/* webpackChunkName: "bike/monitor" */'./routes/bike/BikeMonitor'));
const BikeWindMornitor = asyncComponent(() => import(/* webpackChunkName: "bike/windMornitor" */'./routes/bike/BikeWindMornitor'));
const Error404 = asyncComponent(() => import(/* webpackChunkName: "error/404" */'./routes/error/Error404'));
const Error500 = asyncComponent(() => import(/* webpackChunkName: "error/500" */'./routes/error/Error500'));
const Home = asyncComponent(() => import(/* webpackChunkName: "home/index" */'./routes/home/Home'));
const Illegal = asyncComponent(() => import(/* webpackChunkName: "illegal/index" */'./routes/illegal/Illegal'));
const IllegalConfirm = asyncComponent(() => import(/* webpackChunkName: "illegal/confirm" */'./routes/illegal/IllegalConfirm'));
const IllegalDetails = asyncComponent(() => import(/* webpackChunkName: "illegal/details" */'./routes/illegal/IllegalDetails'));
const AddRemarkModal = asyncComponent(() => import(/* webpackChunkName: "illegal/modals/AddRemarkModal" */'./routes/illegal/modals/AddRemarkModal'));
const RejectModal = asyncComponent(() => import(/* webpackChunkName: "illegal/modals/RejectModal" */'./routes/illegal/modals/RejectModal'));
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
			<Route exact path="/bike/details" component={BikeDetails}/>
			<Route exact path="/bike/info" component={BikeInfo}/>
			<Route exact path="/bike/log" component={BikeLog}/>
			<Route exact path="/bike/monitor" component={BikeMonitor}/>
			<Route exact path="/bike/windMornitor" component={BikeWindMornitor}/>
			<Route exact path="/error/404" component={Error404}/>
			<Route exact path="/error/500" component={Error500}/>
			<Route exact path="/home" component={Home}/>
			<Route exact path="/illegal" component={Illegal}/>
			<Route exact path="/illegal/confirm" component={IllegalConfirm}/>
			<Route exact path="/illegal/details" component={IllegalDetails}/>
			<Route exact path="/illegal/modals/AddRemarkModal" component={AddRemarkModal}/>
			<Route exact path="/illegal/modals/RejectModal" component={RejectModal}/>
			<Route exact path="/user" component={User}/>
			<Route exact path="/user/info" component={UserInfo}/>
			<Route exact path="/user/problem" component={UserProblem}/>
			<Route exact path="/user/sms" component={UserSms}/>
			<Route exact path="/user/verification" component={UserVerification}/>
			<Route path="*" component={Error404}/>
		</Switch>
	</Router>
)
