import React from 'react';
import {Button, Form, Modal,Input, msgBox, Textarea, Row, Col, Text, Box, Select, DataTable, dtUtils } from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
import beefly from "../../../js/beefly";
import couponApi from "../../../apis/couponApi";

/**
 * 修改手机号
 */
export default class CouponModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      show: false,
      data: '',
			query: {
        awardPunishType: '',
        num: '',
        time: '',
      },
      columns: [
        {title: '编号', data: 'id'},
        {title: '发放金额', data: 'amount'},
				{title: '获得时间', data: 'receiveDate', render: dtUtils.renderDateTime},
				{title: '消费时间', data: 'useTime', render: dtUtils.renderDateTime},
				{title: '消费订单', data: 'orderId'},
				{title: '到期时间', data: 'validityEndDate', render: dtUtils.renderDateTime},
				{title: '获得类型', data: 'receiveWay'},
      ],
      queryTable: {
        userId: ''
      }
		}
	}

	render() {
		let {show, data, query, columns, queryTable} = this.state;
		return (
			<Modal show={show} title="信用积分管理" size='lg' onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
				<Modal.Body>
					<Form className="form-label-100" horizontal>
            <Row>
              <Col md={5}>
                <Text label="用户编号" value={data.id}/>
              </Col>
              <Col md={7}>
                <Text label="手机号" value={data.mmobile}/>  
              </Col>
            </Row>
            {/* <Select label="奖惩类型" model="query.awardPunishType" options={handleType} whole={true} validation={{required: true}} width={250} />
            <Select label="处理类型" model="query.state" options={handleType} whole={true} validation={{required: true}} width={250} /> */}
            <Input label="奖罚积分" type='number' model={'query.couponAmout'} validation={{required: true}} width={250}/>              
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
			</Modal>
		)
	}

	show(data) {
		this.setState({
      show: true,
      data
    });
    let {queryTable} = this.state
    queryTable.userId =  data.id
    this._dataTable.search(queryTable)
	}

	hide() {
		this.setState({
      show: false,
		});
	}

	async ok() {
    let {query} = this.state;
    if (query.couponAmount == '') {
      msgBox.warning("出行券金额不能为空");
      return
    }
    if (query.num == '') {
      msgBox.warning("出行券数量不能为空");
      return
    }
    if (query.time == '') {
      msgBox.warning("过期时间不能为空");
      return
    }
		this.hide();
	}

}
