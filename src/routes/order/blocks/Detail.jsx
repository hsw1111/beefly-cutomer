import React from 'react'
import {Box, Form, Row, Col, Text} from "beefly-common";

export default class Detail extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      show: false,
      id:'2'
    }
  }

  render(){
    let {show, id} = this.state
    return (
      <Box>
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
            <Row>
              <Col md={6}>
                <Text label="用户编号" value={show}/>
                <Text label="用户姓名" value={id}/>
              </Col>
              <Col md={6}>
                <Text label="手机号" value={show}/>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Text label="车辆编号" value={show}/>
                <Text label="扫码解锁时间" value={id}/>
                <Text label="取车地点" value={id}/>
                <Text label="扫码时车辆位置" value={id}/>
                <Text label="还车时间" value={id}/>
                <Text label="订单结束原因" value={id}/>
              </Col>
              <Col md={6}>
                <Text label="取车时续航里程" value={show}/>
                <Text label="车辆启动（计费）时间" value={show}/>
                <Text label="扫码时手机位置" value={show}/>
                <Text label="换车时手机位置" value={show}/>
                <Text label="还车时车辆位置" value={show}/>
              </Col>
            </Row>
          </Form>
      </Box>
    )
  }

}