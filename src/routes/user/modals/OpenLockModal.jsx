import React from 'react';
import {Modal, Button, msgBox} from "beefly-common";
import orderApi from "../../../apis/orderApi";
import beefly from "../../../js/beefly";

/**
 * 车辆开锁
 */

export default class endOrderModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      show: false,
      id: '',
      bikeCode: ''
    }
  }

  render(){
    let {show, id, bikeCode} = this.state;
    return (
      <Modal show={show} title="车辆开锁" onHide={this.hide.bind(this)}>
        <Modal.Body>
						<div>
              你确定车辆开锁么？（订单编号：{id}，车辆编号：{bikeCode}）
						</div>
				</Modal.Body>
				<Modal.Footer>
					<Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)}/>
					<Button value={'确定'} onClick={this.ok.bind(this)}/>
				</Modal.Footer>
      </Modal>
    )
  }

  show(data){
    this.setState({
      show: true,
      id: data.id,
      bikeCode: data.bikeCode
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
   let result = await orderApi.openLock({type: 1, bikeCode})
   if(result.resultCode==1){
     msgBox.success("车辆开锁成功！");
     this.hide(true);
   }

}

}
