import React from 'react';
import {Modal, Button} from "beefly-common";
import orderApi from "../../../apis/orderApi";
import beefly from "../../../js/beefly";

/**
 * 结束订单弹框
 */

export default class endOrderModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      show: false,
      id: ''
    }
  }

  render(){
    let {show} = this.state
    return (
      <Modal show={show} title="结束订单" onHide={this.hide.bind(this)}>
        <Modal.Body>
						<div>
              <p>你确定结束“8580936”的订单么？</p>
              <p className='text-red'>该订单的车辆34556678当前位于违停区域内</p>
              <div className="margin-t-20">
                <span className='text-red'>*</span>请选择该订单是否计费：
                <input name='radio' type="radio" value="0"/> <span className='margin-r-20'>计费</span>    
                <input name='radio' type="radio" value="1"/> <span>不计费</span> 
              </div>
              

						</div>
				</Modal.Body>
				<Modal.Footer>
					<Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)}/>
					<Button value={'确定'} onClick={this.ok.bind(this)}/>
				</Modal.Footer>
      </Modal>
    )
  }

  show(){
    this.setState({
			show: true
		})
  }


  hide(){
    this.setState({
			show: false
		})
  }

 async ok(){
    
    
  }

}
