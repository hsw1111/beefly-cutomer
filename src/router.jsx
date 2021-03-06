import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { asyncComponent } from 'beefly-common';

const balance = asyncComponent(() => import(/* webpackChunkName: "balance/index" */'./routes/balance/balance'));
const withdrawInfo = asyncComponent(() => import(/* webpackChunkName: "balance/withdrawInfo" */'./routes/balance/withdrawInfo'));
const bike = asyncComponent(() => import(/* webpackChunkName: "bike/index" */'./routes/bike/bike'));
const bikeLog = asyncComponent(() => import(/* webpackChunkName: "bike/log" */'./routes/bike/bikeLog'));
const Error404 = asyncComponent(() => import(/* webpackChunkName: "error/404" */'./routes/error/Error404'));
const Home = asyncComponent(() => import(/* webpackChunkName: "home/index" */'./routes/home/Home'));
const Illegal = asyncComponent(() => import(/* webpackChunkName: "illegal/index" */'./routes/illegal/Illegal'));
const IllegalConfirm = asyncComponent(() => import(/* webpackChunkName: "illegal/confirm" */'./routes/illegal/IllegalConfirm'));
const IllegalDetail = asyncComponent(() => import(/* webpackChunkName: "illegal/detail" */'./routes/illegal/IllegalDetail'));
const order = asyncComponent(() => import(/* webpackChunkName: "order/index" */'./routes/order/order'));
const user = asyncComponent(() => import(/* webpackChunkName: "user/index" */'./routes/user/user'));
const userAuthCode = asyncComponent(() => import(/* webpackChunkName: "user/authCode" */'./routes/user/userAuthCode'));
const userDetails = asyncComponent(() => import(/* webpackChunkName: "user/details" */'./routes/user/userDetails'));
const userInfo = asyncComponent(() => import(/* webpackChunkName: "user/info" */'./routes/user/userInfo'));
const userMessage = asyncComponent(() => import(/* webpackChunkName: "user/message" */'./routes/user/userMessage'));
const userOrder = asyncComponent(() => import(/* webpackChunkName: "user/order" */'./routes/user/userOrder'));
const userVoucher = asyncComponent(() => import(/* webpackChunkName: "user/voucher" */'./routes/user/userVoucher'));

/**
 * 模块路由
 */
export default () => (
	<Router>
		<Switch>
			<Route exact path="/balance" component={balance}/>
			<Route exact path="/balance/withdrawInfo" component={withdrawInfo}/>
			<Route exact path="/bike" component={bike}/>
			<Route exact path="/bike/log" component={bikeLog}/>
			<Route exact path="/error/404" component={Error404}/>
			<Route exact path="/home" component={Home}/>
			<Route exact path="/illegal" component={Illegal}/>
			<Route exact path="/illegal/confirm" component={IllegalConfirm}/>
			<Route exact path="/illegal/detail" component={IllegalDetail}/>
			<Route exact path="/order" component={order}/>
			<Route exact path="/user" component={user}/>
			<Route exact path="/user/authCode" component={userAuthCode}/>
			<Route exact path="/user/details" component={userDetails}/>
			<Route exact path="/user/info" component={userInfo}/>
			<Route exact path="/user/message" component={userMessage}/>
			<Route exact path="/user/order" component={userOrder}/>
			<Route exact path="/user/voucher" component={userVoucher}/>
			<Route path="*" component={Error404}/>
		</Switch>
	</Router>
)
