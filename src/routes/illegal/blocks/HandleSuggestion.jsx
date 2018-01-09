import React from 'react';
import {Box, Button, Form, Input, Tab, Tabs, Text, Textarea} from "beefly-common";

/**
 * 处理意见
 */
export default class HandleSuggestion extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
			<Box title="处理意见" icon="fa-tag">
				<Box.Body>
					<p>鉴于订单的违规类别和信用积分，我们建议的处理意见为 扣积分 ，你也可以更改处理意见。</p>
					<Form horizontal>
						<Tabs>
							<Tab title="扣积分">
								<Input label="扣除积分" width={250}/>
								<Textarea label="备注" width={'50%'}/>
								<div>

								</div>
								<div className="form-group">
									<div className="col-sm-offset-2 col-sm-10">
										<div className="checkbox">
											<label>
												<input type="checkbox" checked/> 同时给违规人发送短信通知
											</label>
										</div>
									</div>
								</div>
								<Text label="手机号" value="1388888888"/>
								<Text label="发送目的" value="违规通知"/>
								<Textarea label="短信内容" width={'50%'}/>
							</Tab>
							<Tab title="扣押金">
								<p className="text-red">*该用户押金已经提现，暂时无法扣押金，先冻结用户押金</p>
								<Textarea label="短信内容" width={'50%'}/>
							</Tab>
							<Tab title="不处罚">
								<p>订单（编号：1213）符合如下第2点不处罚的情况，该违规人不不处罚。</p>
								<ol>
									<li>违停上报的时间点 处理订单未结束状态，不处罚</li>
									<li className="text-red">最近一次订单状态是已结束，里程＜500米，时长＜5分钟，不处罚</li>
									<li>最近一次订单与违停上报时间点相差超过5天，不处罚</li>
									<li>订单状态是＂开锁失败＂，不处罚</li>
								</ol>
							</Tab>
							<Tab title="发短信">
								<Text label="手机号" value="1388888888"/>
								<Text label="发送目的" value="违规通知"/>
								<Textarea label="短信内容" width={'50%'}/>
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
		)
	}

}
