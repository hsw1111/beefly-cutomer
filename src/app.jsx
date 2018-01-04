import React from 'react';
import beefly from './js/beefly';
import Router from './router';
import {localStore} from 'jeselvmo';
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
	},
	complete: function (XMLHttpRequest, textStatus) {
		console.log(XMLHttpRequest, textStatus);
		try {
			// var json = $.parseJSON(XMLHttpRequest.responseText);
			let json = XMLHttpRequest.responseJSON;
			if (json.message === "用户登录超时") {
				alert(json.message);
			}
		} catch (e) {
			console.log(e)
		}
	}
});

// Modify options, control originalOptions, store jqXHR, etc
$.ajaxPrefilter((options, originalOptions, jqXHR) => {
	// console.log(options, originalOptions, jqXHR);
});

console.log(beefly);

DataTable.defaultProps.onAjax = (api, params, data, callback) => {

	// 添加分页参数
	params['pageNo'] = (data.start / data.length) + 1;
	params['pageSize'] = data.length;

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
