import React from 'react';
import {Box, Field, Form, Text, Row, Col, Tab, Tabs,} from "beefly-common";
import {reportState,handleType} from '../../../maps/illegalMap';

/**
 * 详情
 */
export default class Detail extends React.Component {

	constructor(props) {
		super(props);

		let {detail} = this.props;
		this.state = {
			type:0,
		}

	}
	async componentWillMount() {
		let {detail} = this.props;
		console.log(detail.id,88888888888888)

	}

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
				<Tabs model="type">
					<Tab title="余额">
						<Text label="发送目的" value="违规通知"/>
					</Tab>
					<Tab title="押金">
						<Text label="发送目的" value="违规通知"/>
					</Tab>
					<Tab title="出行券">
						<Text label="发送目的" value="违规通知"/>
					</Tab>
					<Tab title="权益卡">
						<Text label="发送目的" value="违规通知"/>
					</Tab>
					<Tab title="信用积分">
						<Text label="发送目的" value="违规通知"/>
					</Tab>
					<Tab title="拉黑">
						<Text label="发送目的" value="违规通知"/>
					</Tab>
				</Tabs>
			</Box>
		)
	}
}
