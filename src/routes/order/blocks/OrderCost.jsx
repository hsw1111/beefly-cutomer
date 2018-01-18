import React from 'react'
import {Box, Form, Row, Col, Text} from "beefly-common";

export default class OrderCost extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      id: '1'
    }
  }

  render(){
    let {id} = this.state
    return(
      <Box title="订单费用">
        <Form className="form-label-150" horizontal>
          <Row>
            <Col md={6}>
              <Text label="订单总额" value={id}/>
              <Text label="订单里程金额" value={id}/>
              <Text label="用户支付金额" value={id}/>
              <Text label="使用赠送金额" value={id}/>
              <Text label="行程问题反馈" value={id}/>
            </Col>
            <Col md={6}>
              <Text label="订单时长金额" value={id}/>
              <Text label="使用出行券金额" value={id}/>
              <Text label="用户余额支付" value={id}/>
              <Text label="出行券编号" value={id}/>
            </Col>
          </Row>
        </Form>
      </Box>
    )
  }
}
