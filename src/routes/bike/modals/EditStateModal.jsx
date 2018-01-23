import React from 'react';
import {Modal, Button, Form, Select, msgBox} from "beefly-common";
import {bikeState} from '../../../maps/bikeMap'
import bikeApi from '../../../apis/bikeApi'



/**
 * 车辆信息——修改状态 弹框
 */

export default class EditStateModal extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
      show: false,
      bikeCode: '',
      batteryCode: '',
      state: '',
      data: {
        text: '请选择车辆状态', value: ''
      }
		}
	}

	render() {
		let {show, bikeCode, data} = this.state;
		return (
			<Modal show={show} title="修改状态" onHide={this.hide.bind(this)}>
				<Modal.Body>
          <Form className="form-label-300">
            <Select label={'车辆（编号：' + bikeCode + '）状态修改为'}  model="state" options={bikeState} wholeOption={data} width={250}  whole={true} />
          </Form>
				</Modal.Body>
				<Modal.Footer>
					<Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)}/>
					<Button value={'确定'} onClick={this.ok.bind(this)}/>
				</Modal.Footer>
			</Modal>
		)
	}

	show({bikeCode, batteryCode}) {
    this.setState({
      show: true,
      bikeCode,
			batteryCode,
			state: ''
		})
	}

	hide() {
		this.setState({
			show: false
		})
	}

	async ok() {
    let {bikeCode, batteryCode, state} = this.state;
		let result = await bikeApi.editState({
			bikeCode,
			state,
			batteryCode: state === 4 ? batteryCode : ''
		})
    
    if (result.resultCode === 1) {
			this.hide();
			msgBox.success('修改车辆状态成功！');
		}
	}

}
