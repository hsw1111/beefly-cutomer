import React from 'react'
import {Box, Form, Row, Col, Text} from "beefly-common";

export default class OrderCost extends React.Component{
	constructor(props){
		super(props)

	}

	render(){
		let {detail} = this.props;
		return(
			<Box title="订单费用">
				<Form horizontal>
					<Row>
						<Col md={6}>
							<Text label="订单总额" value={(detail.actualAmount || 0) + '元'}/>
							<Text label="订单里程金额" value={(detail.mileageAmount || 0) + '元'}/>
							<Text label="用户支付金额" value={(detail.userPayAmount || 0) + '元'}/>
							<Text label="使用赠送金额" value={(detail.grantAmount || 0) + '元'}/>
							<Text label="行程问题反馈" value={detail.integral}/>
						</Col>
						<Col md={6}>
							<Text label="订单时长金额" value={(detail.timeAmount || 0) + '元'}/>
							<Text label="使用出行券金额" value={(detail.couponAmount || 0) + '元'}/>
							<Text label="用户余额支付" value={(detail.balanceAmount || 0) + '元'}/>
							<Text label="出行券编号" value={detail.payCouponId}/>
						</Col>
					</Row>
				</Form>
			</Box>
		)
	}
}
