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
$('#login').click(async () => {
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
});

$(document).keydown(function(event){
	if(event.keyCode == 13){
		$('#login').click()
	}
});
