import React from 'react';
import {Box, Field, Form, Text, Row, Col} from "beefly-common";
import {reportState,handleType} from '../../../maps/illegalMap';

/**
 * 详情
 */
export default class Detail extends React.Component {

	render() {
		let {detail, showHandle, showRemarks} = this.props;
		return (
			<Box>
				<Form className="form-label-150" horizontal>
					<Row>
						<Col md={5}>
							<Text label="用户编号" value={detail.id}/>
							<Text label="用户姓名" value={detail.name}/>
							<Text label="手机号" value={detail.mobile}/>
							<Text label="所属城市" value={detail.cityName}/>
							<Text label="余额" value={detail.totalBalance}/>
							<Text label="注册时间" value={detail.ctrTime}/>
						</Col>
						<Col md={7}>
							<Text label="用户状态" value={detail.name}/>
							<Text label="信用积分" value={detail.credScore}/>
							<Text label="押金状态" value={detail.name}/>
							<Text label="最近一次订单" value={detail.orderId}/>
							<Text label="最近一次订单时间" value={detail.orderTime}/>
						</Col>
					</Row>
				</Form>
			</Box>
		)
	}
}
