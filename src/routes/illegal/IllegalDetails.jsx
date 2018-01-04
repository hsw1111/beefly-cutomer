import React from 'react';
import {Box, Content, dtUtils} from "beefly-common";
import {urlUtils} from 'jeselvmo';
import tripProblemApi from "../../apis/tripProblemApi";
import {reportState} from '../../maps/illegalMap';
/**
 * 违停上报详情
 */
export default class IllegalDetails extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			datas: {},
			remarksDatas: [],
			faultpic: []
		}
	}

	render() {
		let {datas , remarksDatas , faultpic} = this.state;
		return (
			<Content>
				<Box theme="query">
					<div style={{marginTop:'30px'}}>
						<p>上报编号：{datas.id}</p>
						<p>上报人员姓名：{datas.userName}</p>
						<p>上报人员手机号：{datas.mobile}</p>
						<p>上报时间：{datas.lastReportTime}</p>
						<p>上报车辆编号：{datas.bikeCode}</p>
						<p>城市：{datas.cityName}</p>
						<p>上报信息：{datas.content}</p>
						<p>车辆故障图片：</p>
						<div>
							{faultpic.map((r) => (
								<div style={{float:"left",marginRight:'10px'}}>
									<img src={r} alt="" style={{width:"200px",height:'200px'}}/>
								</div>
							))}
						</div>
						<div style={{clear:'both'}}></div>
						<p style={{marginTop:'10px'}}>上报人员角色:{ dtUtils.renderMap(datas.reportRole,reportState)}</p>
						<div>
							<p>
								<div style={{width:'800px',border:'1px soild red'}}>
									<div style={{width:'300px',float:"left"}}>接单处理时间：{datas.acceptTime}</div>
									<div style={{width:'300px',float:"left"}}>发送地勤确定时间：{datas.sendOperTime}</div>
								</div>
							</p>
							<p>
								<div style={{width:'800px'}}>
									<div style={{width:'300px',float:"left"}}>接受处理人员：{datas.accepterName}</div>
									<div style={{width:'300px',float:"left"}}>发送地勤确认人员：{datas.sendOperName}</div>
								</div>
							</p>
                            <p>
								<div style={{width:'800px'}}>
									<div style={{width:'300px',float:"left"}}>处理完成时间：{datas.completeTime}</div>
									<div style={{width:'300px',float:"left"}}>处理完成人员：{datas.completerName}</div>
								</div>
							</p>
						</div>
						<div style={{clear:'both'}}></div>
						<p style={{marginTop:'10px'}}><b>备注：</b></p>
						<div>
							{remarksDatas.map((r) => (
								<div>
									<div style={{float:"left",width:'100%'}}>
										<div style={{float:"left",width:'100px'}}>{r.createName}</div>
										<div style={{float:"left",width:'200px'}}>{r.createTime}</div>
										<div style={{float:"left",}}>备注内容: {r.content}</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</Box>
			</Content>
		)
	}

	async componentWillMount(){
		let params = urlUtils.getParams();
		let result = await tripProblemApi.detail (params.id);
		this.setState({
			datas: result.data,
			faultpic: result.data.picUrls,
			remarksDatas: result.data.remarks,
		});
	}

}
