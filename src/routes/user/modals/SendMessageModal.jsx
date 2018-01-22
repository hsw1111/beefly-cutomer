import React from 'react';
import {Button, Form, Modal, Input, msgBox, Select, Textarea} from "beefly-common";
import {purposeType} from '../../../maps/userMap'
import appUserApi from "../../../apis/appUserApi";

/**
 * 发送新短信
 */
export default class SendMessageModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      show: false,
      query: {
        'mobile': '',
        'serviceType': 1,
        'content': ''
      }
    }
    
	}

	render() {
		let {show} = this.state;
		return (
			<Modal show={show} title="发送短信" onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
				<Modal.Body>
					  <Form inline>
              <Input label="手机号" model='query.mobile' width={250}
                    validation={{required: true}}/>
              <Select label="发送目的" model="query.serviceType" options={purposeType}  validation={{required: true}} width={200} whole={false}/>
              <Textarea label="短信内容" model='query.content'   validation={{required: true}} width={400}/>
            </Form>
				</Modal.Body>
				<Modal.Footer>
					<Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)}/>
					<Button value={'确定'} onClick={this.ok.bind(this)}/>
				</Modal.Footer>
			</Modal>
		)
	}

	show() {
		this.setState({
			show: true,
			query: {
        'mobile': '',
        'serviceType': 1,
        'content': ''
      }
		})
	}

	hide() {
		this.setState({
			show: false
		})
	}

	async ok() {
    let {query} = this.state
		console.log(query)
		let result = await appUserApi.sendMessage(query)
		if (result.resultCode == 1) {
			this.hide();
			msgBox.success('发送短信成功！');
		}

	}

}
