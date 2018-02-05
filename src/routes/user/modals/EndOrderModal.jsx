import React from 'react';
import {Modal, Button, msgBox} from "beefly-common";
import orderApi from "../../../apis/orderApi";
import bikeApi from "../../../apis/bikeApi";
import TipModal from './TipModal'




/**
 * 结束订单
 */

export default class EndOrderModal extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      show: false,
      id: '',
      bikeCode: '',
      isOver: false,  //是否在违停区域内
      isEnd: false, //
      isAbroad: false, // 是否显示在运营区域外
      isReturn: false, // 是否还车失败
      type: 1, // 是否计费
    }
  }

  render(){
    let {show, id, bikeCode, isOver, isEnd, isAbroad, isReturn} = this.state
    return (
      <div>
      <Modal show={show} title="结束订单" onHide={this.hide.bind(this)}>
        <Modal.Body>
          
            {isAbroad &&
              <div>
                该订单的车辆{bikeCode}正在运营区域外！
              </div>
            }

						{isEnd && 
              <div>
                <p>你确定结束{id}的订单么？</p>
                {isOver && <p className='text-red'>该订单的车辆{bikeCode}当前位于违停区域内！</p>}
                <div className="margin-t-20 isChecked">
                  <span className='text-red'>*</span>请选择该订单是否计费：
                  <input name='radio' type="radio" value='1' defaultChecked /> <span className='margin-r-20'>计费</span>    
                  <input name='radio' type="radio" value='2' /> <span>不计费</span> 
                </div>
              </div>
            }

            {isReturn &&
              <div>
                还车失败！
              </div>
            }
				</Modal.Body>
				<Modal.Footer>
          {isAbroad &&
          <div>
            <Button value={'强制关闭'} theme={'default'} onClick={this.forceClose.bind(this)}/>
            <Button value={'暂不关闭'} onClick={this.hide.bind(this)}/>
          </div>
          }

          {isEnd &&
          <div>
            <Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)}/>
            <Button value={'确定'} onClick={this.ok.bind(this)}/>
          </div>
          }
          
           {isReturn &&
          <div>
            <Button value={'强制关闭'} theme={'default'} onClick={this.returnCar.bind(this)}/>
            <Button value={'暂不关闭'} onClick={this.hide.bind(this)}/>
          </div>
          }
					
				</Modal.Footer>
      </Modal>
      <TipModal ref={(e) => this._tipModal = e} />
      </div>
    )
  }

  async show(data){
    this.setState({
      show: true,
      id: data.id,
      bikeCode: data.bikeCode
    })

    // 1.判断是否在运营区域外
    let result = await orderApi.abroadCloseOrder({id: data.id})
      // 在运营区域外
    if(result.resultCode==0){
      this.setState({
        isAbroad: true,
      })
    }else if(result.resultCode==1){
      // 不在运营区域外

       // 2.判断是否在违停区域内
       let result1 = await orderApi.isNoParkingArea({id: data.id})
          // 违停
        if(result1.resultCode == 0){
          this.setState({
            isEnd: true,
            isOver: true
          })
        }else{
          // 不违停
          this.setState({
            isEnd: true,
            isOver: false
          })
        }
    }else{
      // 判断是否境外还车异常
      this.hide()
    }
    
  }


  hide(isCallBack){
    let {onSuccess} = this.props;
    this.setState({
      show: false,
      isOver: false, 
      isEnd: false, 
      isAbroad: false,
      isReturn: false, 
    })
    if(isCallBack){
      onSuccess && onSuccess();
    }
  }

  // 运营区域外强制关闭
  async forceClose(){
    let {id} = this.state
     // 判断是否在违停区域内
     let result = await orderApi.isNoParkingArea({id})
          // 违停
        if(result.resultCode == -1){
          this.setState({
            isAbroad: false,
            isEnd: true,
            isOver: true
          })
        }else{
          // 不违停
          this.setState({
            isAbroad: false,
            isEnd: true,
            isOver: false
          })
        }
  }

 // 结束订单
 async ok(){
    // 是否计费
    this.setState({
      type: $(".isChecked input:checked").val()
    })
    let {id, bikeCode, type} = this.state
    // 还车
    let result = await orderApi.returnCar({id, type: $(".isChecked input:checked").val()})

    if(result.resultCode == 1){
      this._tipModal.show(true)
      // 3.调用returnCar接口成功后，每5秒轮询调车辆状态接口
      var count = 0;
      var timer =  setInterval(()=>{
        count++;
        this.reBackOrder(timer)
        // 30后停止轮询并显示还车失败
        if(count==6){
          clearInterval(timer)
          this._tipModal.show(false)  
          this.setState({
            isOver: false, 
            isEnd: false, 
            isAbroad: false,
            isReturn: true,
          })
        }
      },5000)

    }else{
      // 显示还车失败
      this.setState({
        isOver: false, 
        isEnd: false, 
        isAbroad: false,
        isReturn: true,
      })
    }
  }

  // 还车失败 点击强制还车
  async returnCar(){
    let {bikeCode} = this.state
    // 强制锁车
    let result = await bikeApi.forcedLock({bikeCode})
    if(result.resultCode == 1){
      msgBox.success("还车成功！")
      this.hide(true)
    }
  }

  // 轮询车辆状态接口
  async reBackOrder(timer){
    let {id} = this.state;
    let result = await  orderApi.reBackOrder({id})
    console.log('--------result',  result)
    // (1)如果车辆状态改变就停止轮询、还车成功
    let data = result.data;
    if(result.resultCode == 1&& data.result==1){
      clearInterval(timer)
      msgBox.success('还车成功')
      this._tipModal.show(false)          
      this.hide(true)
      return
    }
  }

}
