import React from 'react';
import beefly from './js/beefly';
import Router from './router';
import {request, localStore} from 'jeselvmo';
import './styles/index.scss';
import {DataTable} from 'beefly-common'

request.addParam('managerToken', localStore.get('managerToken'));
request.addParam('systemUserId', localStore.get('systemUserId'));

console.log(beefly);

DataTable.defaultProps.onAjax = (api, params, callback) => {
	if (typeof api === 'string') {
		request
			.post(api, params)
			.then((result) => {
				let returnData = {};
				returnData.data = result.data.data;
				returnData.recordsTotal = result.data.totalCount;
				returnData.recordsFiltered = result.data.totalCount;
				callback(returnData);
			})
	} else if (api instanceof Function) {
		api(params).then((result) => {
			let returnData = {};
			returnData.data = result.data.data;
			returnData.recordsTotal = result.data.totalCount;
			returnData.recordsFiltered = result.data.totalCount;
			callback(returnData);
		})
	}

};

/**
 * app
 */
export default class App extends React.Component {

	render() {
		return (
			<Router/>
		)
	}

}
