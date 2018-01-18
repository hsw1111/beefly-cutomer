import {action, observable, reaction, computed} from 'mobx';
import tripProblemApi from "../../../apis/tripProblemApi";
import {urlUtils} from 'jeselvmo';
import orderApi from "../../../apis/orderApi";
import symsApi from "../../../apis/symsApi";
import creditScoreApi from "../../../apis/creditScoreApi";
import beefly from "../../../js/beefly";

/**
 *
 */
class IllegalStore {
	@observable detail = null;
	@observable orderDetail = null;  // 订单详情
	@observable buckleCount = 0;     // 已扣信用分次数
	@observable smsCount = 0;        // 收到违停短信次数
	@observable misreport = 0;        // 误报风险
	@observable suggestHandleType = 0;		// 建议的处理意见
	@observable actualHandleType = 0;		// 实际的处理意见

	async fetchDetail() {
		let {id} = urlUtils.getParams();
		let result = await tripProblemApi.detail({id});
		this.detail = result.data;
	}

	// 订单详情
	async fetchOrderDetail(orderId) {
		if (!orderId) {
			let result = await orderApi.page({
				bikeCode: this.detail.bikeCode,
				pageSize: 1,
			});
			if (result.resultCode === 1) {
				if (result.data && result.data.length > 0) {
					orderId = result.data[0].id
				} else {
					beefly.gritter.warning('该车辆无订单数据')
				}
			}
		}

		let result = await orderApi.detail({
			orderId
		});
		if (result.resultCode === 1) {
			this.orderDetail = result.data;
			//误报风险提示
			if(this.orderDetail.mileage < 100){
				 this.misreport = 1;
			}

			if(this.orderDetail && this.orderDetail.mileage < 500 || this.orderDetail.timeInOrder < 5){
				this.suggestHandleType = 2;
				this.actualHandleType = this.suggestHandleType;
			}
            this.fetchBuckleCount();
            this.fetchSmsCount()
		}

	}

	// 已扣信用分次数
	async fetchBuckleCount() {
		let result = await creditScoreApi.count({
			userId: this.orderDetail.userId,
			unit: 1
		});
		if (result.resultCode === 1) {
			this.buckleCount = result.data;
			this.suggestHandleType = this.buckleCount === 0 ? 0 : 1;
			this.actualHandleType = this.suggestHandleType;
		}
	}

	// 收到违停短信次数
	async fetchSmsCount() {
		let result = await symsApi.countSms({
			userId: this.orderDetail.userId
		});
		if (result.resultCode === 1) {
			this.smsCount = result.data
		}
	}


}

// 实例化
const illegalStore = new IllegalStore();
export default illegalStore;
