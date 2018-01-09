import React from 'react';
import {Box, Button, Form, Input, Tab, Tabs, Text, Textarea} from "beefly-common";

/**
 * 用户奖励
 */
export default class UserAward extends React.Component {

	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		return (
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
		)
	}

}
