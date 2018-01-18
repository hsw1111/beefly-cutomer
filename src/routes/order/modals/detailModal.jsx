import React from 'react';
import {Modal, Button, Form, Row, Col, Text} from "beefly-common";
import Detail from '../blocks/Detail'
import OrderCost from '../blocks/OrderCost'
import VehicleOperationLog from '../blocks/VehicleOperationLog'
import OrderReportLog from '../blocks/OrderReportLog'
import orderApi from "../../../apis/orderApi";
import beefly from "../../../js/beefly";

/**
 * 订单详情 弹框
 */

export default class detailModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      show: false,
      id: ''
    }
  }

  render(){
    let {show} = this.state
    return (
      <Modal show={show} title="订单详情" size='lg' onHide={this.hide.bind(this)}>
        <Modal.Body>
          
          <Detail />
          <OrderCost />
          <VehicleOperationLog />
          <OrderReportLog />

				</Modal.Body>
        
				<Modal.Footer>
					<Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)}/>
					<Button value={'确定'} onClick={this.ok.bind(this)}/>
				</Modal.Footer>
      </Modal>
    )
  }

  show({id}) {
    this.setState({
      show: true,
      id
		})
  }


  hide(){
    this.setState({
			show: false
		})
  }

  async ok() {
   
 }

}
