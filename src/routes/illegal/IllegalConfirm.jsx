import React from 'react';
import {Box, Content, Tab, Tabs, Form, Input, Textarea, Text, Button} from "beefly-common";
import {urlUtils} from 'jeselvmo';
import tripProblemApi from "../../apis/tripProblemApi";
import {reportState} from '../../maps/illegalMap';

/**
 * 违停上报确认
 */
export default class IllegalConfirm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			datas: {},
			remarksDatas: [],
			faultpic: []
		}
	}

	render() {
		let {datas, remarksDatas, faultpic} = this.state;
		return (
			<Content>
				<Box title={'违停上报详情'}>
					<dl className="dl-horizontal margin">
						<dt>上报编号:</dt>
						<dd>{datas.id}</dd>

						<dt>上报人员姓名:</dt>
						<dd>{datas.userName}</dd>

						<dt>上报人员手机号:</dt>
						<dd>{datas.mobile}</dd>

						<dt>上报时间:</dt>
						<dd>{datas.lastReportTime}</dd>

						<dt>上报车辆编号:</dt>
						<dd>{datas.bikeCode}</dd>

						<dt>城市:</dt>
						<dd>{datas.cityName}</dd>

						<dt>上报信息:</dt>
						<dd>{datas.content}</dd>

						<dt>车辆故障图片:</dt>
						<dd>{faultpic.map((r) => <img key={r} src={r} width={200} className="margin-r-10"/>)}</dd>

						<dt>上报人员角色:</dt>
						<dd>{reportState[datas.reportRole]}</dd>
					</dl>
				</Box>

				<Box title="用户奖励" icon="fa-tag">
					<Box.Body>
						<p>给用户的奖励可以选择如下任一种：</p>
						<Form horizontal>
							<Tabs>
								<Tab title="奖积分">
									<Text label="奖罚类型" value="积分奖励"/>
									<Text label="处理类型" value="其他"/>
									<Input label="奖励积分" width={250}/>
									<Textarea label="备注" width={'50%'}/>
								</Tab>
								<Tab title="奖出行券">
									<Input label="出行券金额" width={150}/>
									<Input label="出行券张数" width={150}/>
									<Input label="过期时间" width={250}/>
								</Tab>
								<Tab title="奖余额">
									<Text label="用户当前余额" value={'958.3元 （充值金额950.0元+赠送金额8.3元）'}/>
									<Input label="金额" width={250}/>
									<Textarea label="备注" width={'50%'}/>
								</Tab>
								<Tab title="不奖励">
									本次上报不给用户奖励
								</Tab>
							</Tabs>
						</Form>
					</Box.Body>
					<Box.Footer>
						<div className="pull-right">
							<Button value="取消" theme="default" margin/>
							<Button value="确定"/>
						</div>
					</Box.Footer>
				</Box>

			</Content>
		)
	}

	async componentWillMount() {
		let params = urlUtils.getParams();
		let result = await tripProblemApi.detail(params.id);
		this.setState({
			datas: result.data,
			faultpic: result.data.picUrls,
			remarksDatas: result.data.remarks,
		});
	}

}
