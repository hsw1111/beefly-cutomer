import React from 'react'
import {Box, Form, Row, Col, Text} from "beefly-common";

export default class Detail extends React.Component {

	render() {
		let {detail} = this.props;
		return (
			<Box>
				<Form horizontal>
					<Row>
						<Col md={6}>
							<Text label="订单编号" value={detail.id}/>
							<Text label="订单状态" value={detail.state}/>
						</Col>
						<Col md={6}>
							<Text label="取车方式" value={detail.addTypeStr}/>
							<Text label="订单创建时间" value={detail.placeOrderTime}/>
						</Col>
					</Row>
					<div className="margin-t-20">
						<Row>
							<Col md={6}>
								<Text label="用户编号" value={detail.userId}/>
								<Text label="用户姓名" value={detail.userName}/>
							</Col>
							<Col md={6}>
								<Text label="手机号" value={detail.mobile}/>
							</Col>
						</Row>
					</div>
					<div className="margin-t-20">
						<Row>
							<Col md={6}>
								<Text label="车辆编号" value={detail.bikeCode}/>
								<Text label="扫码解锁时间" value={detail.pickTime}/>
								<Text label="取车地点" value={detail.pickLocation}/>
								<Text label="扫码时车辆位置" value={detail.bikeLocation}/>
								<Text label="还车时间" value={detail.endTime}/>
								<Text label="订单结束原因" value={detail.finishReason}/>
							</Col>
							<Col md={6}>
								<Text label="取车时续航里程" value={detail.leftMileage}/>
								<Text label="车辆启动（计费）时间" value={detail.chargeTime}/>
								<Text label="扫码时手机位置" value={detail.createLocation}/>
								<Text label="还车时手机位置" value={detail.backLocation}/>
								<Text label="还车时车辆位置" value={detail.backBikeLocation}/>
							</Col>
						</Row>
					</div>

				</Form>
			</Box>
		)
	}

}
