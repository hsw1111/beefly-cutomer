import React from 'react';
import {Button, Form, Modal,Input, msgBox, Textarea, Row, Col, Text, Box, DateRange, DataTable, dtUtils } from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
import beefly from "../../../js/beefly";
import couponApi from "../../../apis/couponApi";
import {couponGetType} from '../../../maps/userMap'

/**
 *  出行券管理
 */
export default class CouponModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      show: false,
      data: '',
      isOver: false, //是否超过发送上线
			query: {
        appUserId: '',
        couponAmout: '',
        num: '',
        expireTime: '',
      },
      columns: [
        {title: '编号', data: 'id'},
        {title: '发放金额', data: 'amount'},
				{title: '获得时间', data: 'receiveDate', render: dtUtils.renderDateTime},
				{title: '消费时间', data: 'useTime', render: dtUtils.renderDateTime},
				{title: '消费订单', data: 'orderId'},
				{title: '到期时间', data: 'validityEndDate', render: dtUtils.renderDateTime},
				{title: '获得类型', data: 'receiveWay', render: (data) => dtUtils.renderMap(data, couponGetType) },
      ],
      queryTable: {
        userId: ''
      }
		}
	}

	render() {
		let {show, data, isOver, query, columns, queryTable} = this.state;
		return (
			<Modal show={show} title="出行券管理" size='lg' onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
				{show &&
        <Modal.Body style={{height: 660}}>
					<Form className="form-label-100" horizontal>
            <Row>
              <Col md={5}>
                <Text label="用户编号" value={data.id}/>
              </Col>
              <Col md={7}>
                <Text label="手机号" value={data.mmobile}/>
              </Col>
            </Row>
            <div className='user-block'>
              <Input label="出行券金额" type='number' model='query.couponAmout' validation={{required: true}} width={250} placeholder='金额，正整数'/>
              <Input label="出行券张数" type="number" model='query.num' validation={{required: true}} width={80} placeholder='张数'/>
              {isOver && <div className='text-red margin-l-10' style={{position: 'absolute', top: 110, left: 390}}>
                            今日已到你可发送出行券的上限了，不可发送了！</div>}
            </div>
            <Input label="过期时间" type='date' model='query.expireTime'  width={310}  validation={{required: true}}/>
            <div className='user-block' style={{ float: 'right'}}>
              <Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)} className="margin-r-20" />
              <Button value={'确定'} onClick={this.ok.bind(this)}/>
            </div>
					</Form>

          <div className='margin-t-50'>
            <Box title='发放记录'>
              <DataTable ref={(e) => this._dataTable = e}
                  columns={columns} api={couponApi.page} query={queryTable}/>
            </Box>
          </div>

				</Modal.Body>
        }
			</Modal>
		)
	}

	show(data) {
		this.setState({
      show: true,
      data,
      isOver: false,
      queryTable: {
        'userId': data.id
      },
      query: {
        appUserId: data.id,
        couponAmout: '',
        num: '',
        expireTime: '',
      },
    });
	}

	hide(isCallback) {
		this.setState({
      show: false,
    });
    if(isCallback){
			let {onSuccess} = this.props;
			onSuccess && onSuccess();
		}
	}

	async ok() {
    // this.setState({
    //   isOver: true
    // })
    let {query} = this.state;
    if (query.couponAmout == '') {
      msgBox.warning("出行券金额不能为空");
      return
    }
    if(query.couponAmout <= 0){
      msgBox.warning("出行券金额必须大于0");
      return
    }
    if(parseInt(query.couponAmout) != Number(query.couponAmout)){
      msgBox.warning("出行券金额必须为整数");
      return
    }
    if (query.num == '') {
      msgBox.warning("出行券数量不能为空");
      return
    }
    if (query.num <= 0) {
      msgBox.warning("出行券数量必须大于0");
      return
    }
    if(parseInt(query.num) != Number(query.num)){
      msgBox.warning("出行券数量必须为整数");
      return
    }

    if (query.expireTime == '') {
      msgBox.warning("过期时间不能为空");
      return
    }
    if(new Date(query.expireTime)-new Date() < 0){
      msgBox.warning("过期时间不能小于当前日期");
      return
    }

    let result = await couponApi.awardCoupon(query);
    if(result.resultCode==1){
      msgBox.success("奖励出行券操作成功！")
    }
		this.hide(true);
	}

}
