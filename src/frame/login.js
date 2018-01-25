/*! login.js
* ================
*/

import $ from 'jquery';
import systemApi from "../apis/systemApi";
import beefly from "../js/beefly";

$.ajaxSetup({
	xhrFields: {
		withCredentials: true
	}
});

// 用户登录
async function login() {
	var username = $('#username').val();
	var password = $('#password').val();

	if (username === "") {
		alert('帐号不能为空！');
		return;
	}
	if (password === "") {
		alert('密码不能为空！');
		return;
	}

	let result = await systemApi.login({
		account: username,
		passWord: password
	});

	if (beefly.isSuccess(result)) {
		beefly.setLoginUser(result.data);
		beefly.toIndex();
	} else {
		alert(result.message)
	}
}

$('#login').click(login);
