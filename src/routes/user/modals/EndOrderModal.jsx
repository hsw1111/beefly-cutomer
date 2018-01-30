import React from 'react';
import {Modal, Button, msgBox} from "beefly-common";
import orderApi from "../../../apis/orderApi";
import OverAbroadModal from "./OverAbroadModal"




/**
 * 结束订单弹框
 */

export default class endOrderModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      show: false,
      id: '',
      bikeCode: '',
      isOver: false,  //是否在违停区域内
      isEnd: true, //
      isAbroad: false, // 是否显示在运营区域外
      isReturn: false, // 是否还车失败
      type: 0, // 是否计费
    }
  }

  render(){
    let {show, id, bikeCode, isOver, isEnd, isAbroad, isReturn} = this.state
    return (
      <div>
      <Modal show={show} title="结束订单" onHide={this.hide.bind(this)}>
        <Modal.Body>
						{isEnd && 
              <div>
                <p>你确定结束{id}的订单么？</p>
                {isOver && <p className='text-red'>该订单的车辆{id}当前位于违停区域内！</p>}
                <div className="margin-t-20 isChecked">
                  <span className='text-red'>*</span>请选择该订单是否计费：
                  <input name='radio' type="radio" value='0' checked /> <span className='margin-r-20'>计费</span>    
                  <input name='radio' type="radio" value='1' /> <span>不计费</span> 
                </div>
              </div>
            }

            {isAbroad &&
              <div>
                该订单的车辆{bikeCode}正在运营区域外！
              </div>
            }

            {isReturn &&
              <div>
                还车失败！
              </div>
            }
				</Modal.Body>
				<Modal.Footer>
          {isEnd &&
          <div>
            <Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)}/>
            <Button value={'确定'} onClick={this.ok.bind(this)}/>
          </div>
          }
           {isAbroad &&
          <div>
            <Button value={'强制关闭'} theme={'default'} onClick={this.forceClose.bind(this)}/>
            <Button value={'暂不关闭'} onClick={this.hide.bind(this)}/>
          </div>
          }
           {isReturn &&
          <div>
            <Button value={'强制关闭'} theme={'default'} onClick={this.forceClose.bind(this)}/>
            <Button value={'暂不关闭'} onClick={this.hide.bind(this)}/>
          </div>
          }
					
				</Modal.Footer>
      </Modal>
      <OverAbroadModal ref={(e) => this._overAbroadModal = e}/>
      </div>
    )
  }

  async show(data){
    this.setState({
      show: true,
      id: data.id,
      bikeCode: data.bikeCode
    })
    let result = await orderApi.isNoParkingArea({id: data.id})
    if(result.resultCode == -1){
      this.setState({
        isOver: true
      })
    }else{
      this.setState({
        isOver: false
      })
    }
  }


  hide(isCallBack){
    let {onSuccess} = this.props;
    this.setState({
			show: false
    })
    if(isCallBack){
      onSuccess && onSuccess();
    }
  }

// 结束订单
 async ok(){
   let {id, bikeCode} = this.state
    // this.hide(true)
    // 是否计费
    this.setState({
      type: $(".isChecked input:checked").val()
    })
    console.log($(".isChecked input:checked").val())
    let result = await orderApi.abroadCloseOrder({id})
    if(result.resultCode==-1){
      // this._overAbroadModal.show({id, bikeCode})
      // this.hide()
      this.setState({
        isEnd: false,
        isAbroad: true,
      })
      return
    }
  }

  // 强制关闭
  async forceClose(){

  }

  // 还车
  async returnCar(){
    let {id, type} = this.state
    let result = await orderApi.returnCar({id, type})
    if(result.resultCode == 1){
      msgBox.success("还车成功！")
      this.hide(true)
    }
  }


}
