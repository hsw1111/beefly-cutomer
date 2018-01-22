import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Form, Modal, Input, msgBox, Select, Textarea} from "beefly-common";
import {sendTarget} from '../../../maps/userMap'
import tripProblemApi from "../../../apis/tripProblemApi";
import beefly from "../../../js/beefly";
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
        'target': '',
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
              <Select label="发送目的" model="query.target" options={sendTarget}  validation={{required: true}} width={200}/>
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
    this.setState({
			show: false
		})

	}

}
