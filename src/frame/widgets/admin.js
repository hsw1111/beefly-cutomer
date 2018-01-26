/* Admin()
 * ======
 */
import $ from 'jquery';
import beefly from "../../js/beefly";
import systemApi from "../../apis/systemApi";


beefly.checkLogin = async function (callback) {
	var loginUser = beefly.getLoginUser();
	if (loginUser) {
		// 测试登录状态
		let result = await systemApi.testToken({});
		if (beefly.isSuccess(result)) {
			callback(loginUser)
		} else {
			beefly.toLogin()
		}
	} else {
		beefly.toLogin()
	}
};

beefly.checkLogin((loginUser) => {
	$('*[name=username]').text(loginUser.userName)
});

$('#logoff').on('click', function () {
	beefly.removeLoginUser();
	beefly.toLogin()
});
