import React from 'react';
import {Button, Form, Modal, Input, msgBox, Select, Textarea} from "beefly-common";
import {purpose} from '../../../maps/userMap'
import symsApi from "../../../apis/symsApi";

/**
 * 发送新短信
 */
export default class SendMessageModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      show: false,
      query: {
        mobiles: '',
        serviceType: 1,
				content: '',
      }
    }
    
	}

	render() {
		let {show} = this.state;
		return (
			<Modal show={show} title="发送短信" onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
				<Modal.Body>
					  <Form inline>
              <Input label="手机号" model='query.mobiles' width={250}
                    validation={{required: true}}/>
              <Select label="发送目的" model="query.serviceType" options={purpose}  validation={{required: true}} width={200} whole={false}/>
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
        mobiles: '',
        serviceType: 1,
        content: ''
      }
		})
	}

	hide() {
		this.setState({
			show: false
		})
	}

	async ok() {
		let {onSuccess} = this.props
		let {query} = this.state
		let result = await symsApi.sendSms({
			...query,
			serviceTypeName: purpose[query.serviceType]
		})
		if (result.resultCode == 1) {
			this.hide();
			onSuccess && onSuccess()
			msgBox.success('发送短信成功！');
		}

	}

}
