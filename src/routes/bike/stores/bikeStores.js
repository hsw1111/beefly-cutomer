import {action, observable, reaction, computed} from 'mobx';
import bikeApi from "../../../apis/bikeApi";
import {urlUtils} from 'jeselvmo';


/**
 *
 */
class BikeStores {
	@observable detail = null;


  // 车辆详情
	async fetchDetail() {
		let {bikeCode} = urlUtils.getParams();
		// // let result = await bikeApi.detail({bikeCode});
    // this.detail = result.data;
    // console.log('-------------bikeLog',this.detail)
	}

	
}

// 实例化
const bikeStores = new BikeStores();
export default bikeStores;
