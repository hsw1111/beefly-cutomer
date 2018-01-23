import React from 'react';
import {Modal, Button} from "beefly-common";
import orderApi from "../../../apis/orderApi";
import beefly from "../../../js/beefly";

/**
 * 车辆开锁锁弹框
 */

export default class endOrderModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      show: false,
      id: ''
    }
  }

  render(){
    let {show} = this.state;
    return (
      <Modal show={show} title="车辆开锁" onHide={this.hide.bind(this)}>
        <Modal.Body>
						<div>
              你确定车辆开锁么？（订单编号：12123，车辆编号：3456）
						</div>
				</Modal.Body>
				<Modal.Footer>
					<Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)}/>
					<Button value={'确定'} onClick={this.ok.bind(this)}/>
				</Modal.Footer>
      </Modal>
    )
  }

<<<<<<< HEAD
  show({id}){
    this.setState({
      show: true,
      id
=======
  show(){
    this.setState({
			show: true
>>>>>>> 89c5ba43d0e75cdba67d33c9b094b3eefbf8b8e6
		})
  }


  hide(){
    this.setState({
			show: false
		})
  }

 async ok(){


  }

}
