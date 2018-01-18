import React from 'react';
import {Modal, Button, Form, Row, Col, Text} from "beefly-common";
import orderApi from "../../../apis/orderApi";
import beefly from "../../../js/beefly";

/**
 * 订单详情 弹框
 */

export default class endOrderModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      show: false,
      id: ''
    }
  }

  render(){
    let {show, id} = this.state
    return (
      <Modal show={show} title="订单详情" size='lg' onHide={this.hide.bind(this)}>
        <Modal.Body>
          <Form className="form-label-150" horizontal>
            <Row>
              <Col md={6}>
                <Text label="订单编号" value={show}/>
                <Text label="订单状态" value={id}/>
              </Col>
              <Col md={6}>
                <Text label="取车方式" value={show}/>
                <Text label="订单创建时间" value={show}/>
              </Col>
            </Row>
          </Form>
				</Modal.Body>
				<Modal.Footer>
					<Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)}/>
					<Button value={'确定'} onClick={this.ok.bind(this)}/>
				</Modal.Footer>
      </Modal>
    )
  }

  show(){
    this.setState({
			show: true
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
