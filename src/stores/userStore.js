import {action, observable, reaction, computed} from 'mobx';
import {urlUtils} from 'jeselvmo';
import beefly from "../js/beefly";
import userApi from "../apis/userApi";

/**
 *
 */
class UserStore {
	@observable detail = null;

	async fetchDetail() {
		let {id} = urlUtils.getParams();
		let result = await userApi.userDetail({id});
		this.detail = result.data;
	}

}

// 实例化
const userStore = new UserStore();
export default userStore;
