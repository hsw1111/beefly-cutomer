import {localStore} from 'jeselvmo';
import {LOGIN_USER} from "./constants";

let beefly = {

	// 获取登录用户
	getLoginUser() {
		return localStore.get(LOGIN_USER);
	},

	// 存储登录用户
	setLoginUser(loginUser) {
		localStore.set(LOGIN_USER, loginUser);
	},

	// 删除登录用户
	removeLoginUser() {
		localStore.remove(LOGIN_USER);
	},

	// 是成功的结果
	isSuccess(result) {
		return result && result.resultCode == 1
	},

	// 跳首页
	toIndex() {
		location = 'index.html'
	},

	// 跳登录
	toLogin() {
		location = 'login.html'
	},

	DateMinus(date1, date2) {
		let type1 = new Date(date1);
		let type2 = new Date(date2);
		let s1 = type1.getTime();
		let s2 = type2.getTime();
		let total = (s2 - s1) / 1000;

		let day = total / (24 * 60 * 60);//计算整数天数
		return day
	}

};

window.beefly = beefly;
export default beefly;
