import React from 'react';
import beefly from './js/beefly';
import Router from './router';
import {request, localStore} from 'jeselvmo';
import './styles/index.scss';
import {DataTable} from 'beefly-common'
import $ from 'jquery';

$.ajaxSetup({
	xhrFields: {
		withCredentials: true
	},
	data: {
		accessToken: function () {
			let loginUser = localStore.get('loginUser');
			return loginUser ? loginUser.token : ''
		}
	}
});

// Modify options, control originalOptions, store jqXHR, etc
$.ajaxPrefilter((options, originalOptions, jqXHR) => {
	// console.log(options, originalOptions, jqXHR);
});

//
// $.ajaxSuccess((event, XMLHttpRequest, ajaxOptions) => {
// 	console.log(event, XMLHttpRequest, ajaxOptions);
// });

console.log(beefly);

DataTable.defaultProps.onAjax = (api, params, callback) => {
	api(params).then((result) => {
		let returnData = {};
		returnData.data = result.data;
		returnData.recordsTotal = result.totalItems;
		returnData.recordsFiltered = result.totalItems;
		callback(returnData);
	})
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
