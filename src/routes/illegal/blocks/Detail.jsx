import React from 'react';
import {observer} from 'mobx-react';
import {Box, Field, Form, Text, Row, Col} from "beefly-common";
import {reportState,handleType} from '../../../maps/illegalMap';
import illegalStore from "../stores/illegalStore";

/**
 * 详情
 */
@observer
export default class Detail extends React.Component {

	render() {
		let {showHandle, showRemarks} = this.props;
		let {detail} = illegalStore;
		return (
			<Box>
				<Form horizontal>
					<Text label="上报编号" value={detail.id}/>
					<Text label="上报人员姓名" value={detail.userName}/>
					<Text label="上报人员手机号" value={detail.mobile}/>
					<Text label="上报时间" value={detail.createTime}/>
					<Text label="上报车辆编号" value={detail.bikeCode}/>
					<Text label="城市" value={detail.cityName}/>
					<Text label="上报信息" value={detail.content}/>
					<Field label="车辆故障图片">
						{detail.picUrls.map((r) => <img key={r} src={r} width={200} className="margin-r-10" data-widget="zoomify"/>)}
					</Field>
					<Text label="上报人员角色">
						<span className="text-orange h4">{reportState[detail.reportRole]}</span>
					</Text>
					<Text label="处理进度" value={handleType[detail.state]}/>
				</Form>
				{showHandle && (
					<Form horizontal>
						<Row>
							<Col md={5}>
								<Text label="接单处理时间" value={detail.acceptTime}/>
								<Text label="接受处理人员" value={detail.accepterName}/>
								<Text label="处理完成时间" value={detail.completeTime}/>
							</Col>
							<Col md={7}>
								<Text label="发送地勤确定时间" value={detail.sendOperTime}/>
								<Text label="发送地勤确认人员" value={detail.sendOperName}/>
								<Text label="处理完成人员" value={detail.completerName}/>
							</Col>
						</Row>
					</Form>
				)}
				{showRemarks && detail.remarks && detail.remarks.length > 0 && (
					<Form>
						<Field label={'备注'}>
							<table className="table">
								<tbody>
								<tr>
									<th style={{width: '10px'}}>#</th>
									<th style={{width: '100px'}}>提交人</th>
									<th style={{width: '160px'}}>提交时间</th>
									<th>内容</th>
								</tr>
								{detail.remarks.map((r, i) => (
									<tr key={r.content}>
										<td>{i + 1}.</td>
										<td>{r.createName}</td>
										<td>{r.createTime}</td>
										<td>{r.content}</td>
									</tr>
								))}
								</tbody>
							</table>
						</Field>
					</Form>
				)}
			</Box>
		)
	}

	componentDidMount(){
		$('img').zoomify();
	}
}

Detail.propTypes = {
	showHandle: React.PropTypes.bool,		// 显示处理信息
	showRemarks: React.PropTypes.bool,		// 显示备注信息
};

Detail.defaultProps = {
	showHandle: false,
	showRemarks: false,
};
