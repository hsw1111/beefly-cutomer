import React from 'react';
import beefly from './js/beefly';
import Router from './router';
import {localStore} from 'jeselvmo';
import './styles/index.scss';
import {DataTable} from 'beefly-common'
import $ from 'jquery';
import {regexp} from 'jeselvmo';

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
	beforeSend: function (xhr) {
		// console.log('xhr:', xhr)
	},
	complete: function (XMLHttpRequest, textStatus) {
		// console.log(XMLHttpRequest, textStatus);
		try {
			// var json = $.parseJSON(XMLHttpRequest.responseText);
			let json = XMLHttpRequest.responseJSON;
			if (json.resultCode === -1) {
				beefly.gritter.error(json.message);
				if (json.data === 0) {
					setTimeout(()=>{
						parent.location = '../login.html'
					}, 1000)
				}
			}
		} catch (e) {
			console.log(e)
		}
	}
});

// Modify options, control originalOptions, store jqXHR, etc
$.ajaxPrefilter((options, originalOptions, jqXHR) => {

	if ('get'.indexOf(options.type)) {

		// 使用测试用户
		// console.log(options.data);
		// options.data = regexp.replace(options.data, /appUserId=\w+/ig, 'appUserId=52468');
		// console.log(options.data);
	}

	// console.log('options:', options);
	// console.log('originalOptions:', originalOptions);
	// console.log('jqXHR:', jqXHR);
	// debugger;
});

console.log(beefly);

DataTable.defaultProps.onAjax = (api, params, data, callback) => {

	// 添加分页参数
	params['pageNo'] = (data.start / data.length) + 1;
	params['pageSize'] = data.length;

	api(params).then((result) => {
		let returnData = {};
		returnData.data = result.data || [];
		returnData.recordsTotal = result.totalItems || 0;
		returnData.recordsFiltered = result.totalItems || 0;
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
