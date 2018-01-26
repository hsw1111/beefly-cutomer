import {action, observable, reaction, computed} from 'mobx';
import tripProblemApi from "../../../apis/tripProblemApi";
import {urlUtils} from 'jeselvmo';
import orderApi from "../../../apis/orderApi";
import symsApi from "../../../apis/symsApi";
import creditScoreApi from "../../../apis/creditScoreApi";
import beefly from "../../../js/beefly";
import {msgBox} from 'beefly-common';
import transRecordApi from "../../../apis/transRecordApi";

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
	@observable depositState = 0; 			// 押金状态
	@observable transId = null; 			//

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
				beginDate:this.detail.createTime
			});
			if (result.resultCode === 1) {
				if (result.data && result.data.length > 0) {
					orderId = result.data[0].id
				} else {
					msgBox.warning('该车辆无订单数据')
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


			await this.fetchBuckleCount();
			await this.fetchSmsCount();
			await this.fetchDepositState();

			setTimeout(()=>{
				if((!this.detail.content.includes('双人骑行')) && this.orderDetail && (this.orderDetail.mileage < 500 || this.orderDetail.timeInOrder < 5 ||(this.orderDetail.endTime > this.detail.createTime ||'')||
					(beefly.DateMinus(this.orderDetail.placeOrderTime,this.detail.createTime)>5)||(this.orderDetail.orderFlow == 10))){
					this.suggestHandleType = 2;
					this.actualHandleType = this.suggestHandleType;
				}
			}, 300)
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
			mobile: this.orderDetail.mobile,
			serviceType:4
		});
		if (result.resultCode === 1) {
			this.smsCount = result.data
		}
	}

	async fetchDepositState() {
		let result = await transRecordApi.getDepositState({
			appUserId: this.orderDetail.userId
		});

		if (result.resultCode == 1) {
			this.depositState = result.data.depositState;
			this.transId =result.data.transId
		}
	}

}

// 实例化
const illegalStore = new IllegalStore();
export default illegalStore;
