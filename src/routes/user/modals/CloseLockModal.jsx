import React from 'react';
import {Modal, Button, msgBox} from "beefly-common";
import orderApi from "../../../apis/orderApi";
import bikeApi from "../../../apis/bikeApi";
import TipModal from './TipModal'

/**
 * 车辆关锁
 */

export default class endOrderModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
			id: '',
			bikeCode: '',
		}
	}

	render() {
		let {show, id, bikeCode} = this.state;
		return (
			<div>
				<Modal show={show} title="车辆关锁" onHide={this.hide.bind(this)}>
					<Modal.Body>
						<div>
							你确定车辆关锁么？（订单编号：{id}，车辆编号：{bikeCode}）
						</div>
					</Modal.Body>
					<Modal.Footer>
						<Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)}/>
						<Button value={'确定'} onClick={this.ok.bind(this)}/>
					</Modal.Footer>
				</Modal>
				<TipModal ref={(e) => this._tipModal = e} />
			</div>
		)
	}

	show(data) {
		this.setState({
			show: true,
			id: data.id,
			bikeCode: data.bikeCode,
			isFalse: false
		})
	}


	hide(isCallBack){
    let {onSuccess} = this.props;
    this.setState({
			show: false
    })
    if(isCallBack){
      onSuccess && onSuccess();
		}
  }

 async ok(){
   let {bikeCode} =  this.state;
   let result = await orderApi.closeLock({type: 2, bikeCode})
   if(result.resultCode==1){
		this._tipModal.show(true)
		var count = 0;
		var timer = setInterval(()=>{
			count++;
			this.reBikeState(timer)
			// 30s后停止轮询、关锁失败
			if(count==6){
				msgBox.error('关锁失败')
				clearInterval(timer)
				this._tipModal.show(false)  
				this.hide(true); 
			}
		},5000)
		
	 }
	}

	// 轮询车辆状态接口
	async reBikeState(timer){
		let { bikeCode} = this.state;
		let result = await  bikeApi.reBikeState({bikeCode})
		// (1)如果车辆状态改变就停止轮询、关锁成功
		let data = result.data
		if(result.resultCode == 1 && data.result==1){
			msgBox.success('关锁成功') 
			clearInterval(timer)
			this._tipModal.show(false)  
			this.hide(true); 
			return 
		}
	}
}
