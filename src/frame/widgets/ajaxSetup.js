import $ from 'jquery';
import beefly from "../../js/beefly";

$.ajaxSetup({
	xhrFields: {
		withCredentials: true
	},
	data: {
		accessToken: function () {
			let loginUser = beefly.getLoginUser();
			return loginUser ? loginUser.token : ''
		}
	}
});

