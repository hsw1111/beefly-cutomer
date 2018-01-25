import React from 'react';
import {observer} from 'mobx-react';
import {Button, Content, Box, DateRange, Input, Form, Field, DataTable, dtUtils,Text} from "beefly-common";
import $ from 'jquery';


/**
 * 用户管理 群发出行券
 */

@observer
export default class userVoucher extends React.Component {
  constructor(props){
    super(props);

    this.state = {
		rewardCoupon: {
			couponAmout: '',
			num: '',
			expireTime: ''
		},
    }
  }

  render() {
    let {columns} = this.state;
    return(
      <Content>
        <Box>
			<Form ref={e => this.form = e} horizontal>
				<Input label="出行券金额" model="rewardCoupon.couponAmout" type="number" width={150} validation={{required: true}}/>
				<Input label="出行券张数" model="rewardCoupon.num" type="number" width={150}  validation={{required: true}}/>
				<Input label="过期时间" model="rewardCoupon.expireTime" type="date" width={250} validation={{required: true}}/>
				<Text label="发送对象" validation={{required: true}}>
					<span>
						<input ref={e => this.file = e} type="file" name="file"/>
					</span>
				</Text>
				<Text>
					只支持".xls/.xlsx"格式；表格中只需包含"手机号"。<a href="files/initBike.xlsx">模板下载</a>
				</Text>
				<div className="margin-t-30">
					<div style={{float:'left'}}>
						<span className="h4">发送人员名单</span><span className="h6 margin-l-20">共计204人</span>
					</div>
					<div style={{float:'right'}}>
						<a href="javascript:void(0)">清空</a>
					</div>
				</div>
				<div className="clear" style={{borderTop:"1px solid"}}>

				</div>
				<div className="margin-t-80" style={{float:'right'}}>
					<Button value="确定"/>
				</div>
			</Form>
        </Box>
      </Content>
    )
  }

  sendNewMessage(){
    this._sendMessageModal.show()
  }
}
