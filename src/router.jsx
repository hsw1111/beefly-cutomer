import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { asyncComponent } from 'beefly-common';

const Error404 = asyncComponent(() => import(/* webpackChunkName: "error/404" */'./routes/error/Error404'));
const Error500 = asyncComponent(() => import(/* webpackChunkName: "error/500" */'./routes/error/Error500'));
const Home = asyncComponent(() => import(/* webpackChunkName: "home/index" */'./routes/home/Home'));
const Illegal = asyncComponent(() => import(/* webpackChunkName: "illegal/index" */'./routes/illegal/Illegal'));
const IllegalConfirm = asyncComponent(() => import(/* webpackChunkName: "illegal/confirm" */'./routes/illegal/IllegalConfirm'));
const IllegalDetail = asyncComponent(() => import(/* webpackChunkName: "illegal/detail" */'./routes/illegal/IllegalDetail'));
<<<<<<< HEAD
const AddRemarkModal = asyncComponent(() => import(/* webpackChunkName: "illegal/modals/AddRemarkModal" */'./routes/illegal/modals/AddRemarkModal'));
const IntegralModal = asyncComponent(() => import(/* webpackChunkName: "illegal/modals/IntegralModal" */'./routes/illegal/modals/IntegralModal'));
const RejectModal = asyncComponent(() => import(/* webpackChunkName: "illegal/modals/RejectModal" */'./routes/illegal/modals/RejectModal'));
const ReplaceOrderModal = asyncComponent(() => import(/* webpackChunkName: "illegal/modals/ReplaceOrderModal" */'./routes/illegal/modals/ReplaceOrderModal'));
const SymsModal = asyncComponent(() => import(/* webpackChunkName: "illegal/modals/SymsModal" */'./routes/illegal/modals/SymsModal'));
const illegalStore = asyncComponent(() => import(/* webpackChunkName: "illegal/stores/illegalStore" */'./routes/illegal/stores/illegalStore'));
const detailModal = asyncComponent(() => import(/* webpackChunkName: "order/modals/detailModal" */'./routes/order/modals/detailModal'));
const endOrderModal = asyncComponent(() => import(/* webpackChunkName: "order/modals/endOrderModal" */'./routes/order/modals/endOrderModal'));
const lockModal = asyncComponent(() => import(/* webpackChunkName: "order/modals/lockModal" */'./routes/order/modals/lockModal'));
const unlockModal = asyncComponent(() => import(/* webpackChunkName: "order/modals/unlockModal" */'./routes/order/modals/unlockModal'));
const order = asyncComponent(() => import(/* webpackChunkName: "order/index" */'./routes/order/order'));
const Details = asyncComponent(() => import(/* webpackChunkName: "user/blocks/Details" */'./routes/user/blocks/Details'));
const ModifyModal = asyncComponent(() => import(/* webpackChunkName: "user/modals/ModifyModal" */'./routes/user/modals/ModifyModal'));
=======
>>>>>>> 5a1ffa09572215a90d991dcb0c2d72ee0995c2f1
const user = asyncComponent(() => import(/* webpackChunkName: "user/index" */'./routes/user/user'));
const userDetails = asyncComponent(() => import(/* webpackChunkName: "user/details" */'./routes/user/userDetails'));
const userOrder = asyncComponent(() => import(/* webpackChunkName: "user/order" */'./routes/user/userOrder'));

/**
 * 模块路由
 */
export default () => (
	<Router>
		<Switch>
			<Route exact path="/error/404" component={Error404}/>
			<Route exact path="/error/500" component={Error500}/>
			<Route exact path="/home" component={Home}/>
			<Route exact path="/illegal" component={Illegal}/>
			<Route exact path="/illegal/confirm" component={IllegalConfirm}/>
			<Route exact path="/illegal/detail" component={IllegalDetail}/>
<<<<<<< HEAD
			<Route exact path="/illegal/modals/AddRemarkModal" component={AddRemarkModal}/>
			<Route exact path="/illegal/modals/IntegralModal" component={IntegralModal}/>
			<Route exact path="/illegal/modals/RejectModal" component={RejectModal}/>
			<Route exact path="/illegal/modals/ReplaceOrderModal" component={ReplaceOrderModal}/>
			<Route exact path="/illegal/modals/SymsModal" component={SymsModal}/>
			<Route exact path="/illegal/stores/illegalStore" component={illegalStore}/>
			<Route exact path="/order/modals/detailModal" component={detailModal}/>
			<Route exact path="/order/modals/endOrderModal" component={endOrderModal}/>
			<Route exact path="/order/modals/lockModal" component={lockModal}/>
			<Route exact path="/order/modals/unlockModal" component={unlockModal}/>
			<Route exact path="/order" component={order}/>
			<Route exact path="/user/blocks/Details" component={Details}/>
			<Route exact path="/user/modals/ModifyModal" component={ModifyModal}/>
=======
>>>>>>> 5a1ffa09572215a90d991dcb0c2d72ee0995c2f1
			<Route exact path="/user" component={user}/>
			<Route exact path="/user/details" component={userDetails}/>
			<Route exact path="/user/order" component={userOrder}/>
			<Route path="*" component={Error404}/>
		</Switch>
	</Router>
)
