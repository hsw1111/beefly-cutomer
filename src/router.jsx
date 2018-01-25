import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { asyncComponent } from 'beefly-common';

const Error404 = asyncComponent(() => import(/* webpackChunkName: "error/404" */'./routes/error/Error404'));
const Home = asyncComponent(() => import(/* webpackChunkName: "home/index" */'./routes/home/Home'));
const Illegal = asyncComponent(() => import(/* webpackChunkName: "illegal/index" */'./routes/illegal/Illegal'));
const IllegalConfirm = asyncComponent(() => import(/* webpackChunkName: "illegal/confirm" */'./routes/illegal/IllegalConfirm'));
const IllegalDetail = asyncComponent(() => import(/* webpackChunkName: "illegal/detail" */'./routes/illegal/IllegalDetail'));

/**
 * 模块路由
 */
export default () => (
	<Router>
		<Switch>
			<Route exact path="/error/404" component={Error404}/>
			<Route exact path="/home" component={Home}/>
			<Route exact path="/illegal" component={Illegal}/>
			<Route exact path="/illegal/confirm" component={IllegalConfirm}/>
			<Route exact path="/illegal/detail" component={IllegalDetail}/>
			<Route path="*" component={Error404}/>
		</Switch>
	</Router>
)
