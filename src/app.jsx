import React from 'react';
import beefly from './js/beefly';
import Router from './router';
import 'beefly-common/styles/index.scss';
import './styles/index.scss';
import {DataTable, CitySelect, msgBox} from 'beefly-common'
import $ from 'jquery';
import {validator} from 'jeselvmo';
import cityApi from "./apis/cityApi";

console.log(beefly);

$.ajaxSetup({
	xhrFields: {
		withCredentials: true
	},
	data: {
		accessToken: function () {
			let loginUser = beefly.getLoginUser();
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
				msgBox.error(json.message);
				if (json.data === 0) {
					setTimeout(() => {
						parent.location = 'login.html'
					}, 1000)
				}
			}
		} catch (e) {
			console.log(e)
		}
	}
});

$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
	// console.log(options, originalOptions, jqXHR);

	if ("POST".indexOf(options.type.toUpperCase()) >= 0) {
		if (validator.isFormData(options.data)) {
			let loginUser = beefly.getLoginUser();
			options.data.append('accessToken', loginUser ? loginUser.token : '')
		}
	}

});

// 表格组件，数据请求
DataTable.defaultProps.onAjax = (api, params, data, callback) => {
	// 添加分页参数
	if (data.length != -1) {
		params['pageNo'] = (data.start / data.length) + 1;
		params['pageSize'] = data.length;
	}

	api(params).then((result) => {
		let returnData = {};
		returnData.data = result.data || [];
		returnData.recordsTotal = result.totalItems || 0;
		returnData.recordsFiltered = result.totalItems || 0;
		callback(returnData);
	})
};

// 城市区域选择组件，数据请求
CitySelect.defaultProps.onAjax = (callback) => {
	// 初始化城市列表
	cityApi.list().then((result) => {
		if (beefly.isSuccess(result)) {
			callback(result.data)
		}
	});
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
