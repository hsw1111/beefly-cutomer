import React from 'react';
import {Button, Form, Modal,Input, msgBox, Textarea, Row, Col, Text, Box, Select, DataTable, dtUtils } from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
import beefly from "../../../js/beefly";
import {awardPunishType, dealType, rewardType, integralType} from '../../../maps/userMap'
import creditScoreApi from "../../../apis/creditScoreApi";

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
        awardPunishType: 0,
        dealType: 0,
        awardPunishScore: '',
        remark: '',
      },
      columns: [
        {title: '编号', data: 'id'},
				{title: '操作时间', data: 'createTime', render: dtUtils.renderDateTime},
				{title: '操作人', data: 'manageName'},
				{title: '奖惩类型', data: 'unit', render: (data) => dtUtils.renderMap(data, rewardType)},
				{title: '处理类型', data: 'type', render: (data) => dtUtils.renderMap(data, integralType)},
				{title: '积分', data: 'value', render: (data, type, row) => (row.unit == 0 ?'+':'-') + data},
				{title: '剩余总积分', data: 'newValue'},
				{title: '备注', data: 'remark'},
      ],
      queryTable: {
        userId: ''
      }
		}
	}

	render() {
    let awardType = {
      0: '其他'
    }
    let punishType = {
      0: '违停扣分',
      1: '车辆轻度划伤',
      2: '车辆重度划伤',
      3: '加装私锁',
      4: '忘记关锁',
      5: '弃车逃走',
      6: '其他',
    }
    let backType = {
      0: '违停扣错',
      1: '其他'
    }
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
            <Select label="奖惩类型" model="query.awardPunishType" options={awardPunishType} whole={false} validation={{required: true}} width={250} />
            {query.awardPunishType == 0 && <Select label="处理类型" model="query.dealType" options={punishType} whole={false} validation={{required: true}} width={250} />}
            {query.awardPunishType == 1 && <Select label="处理类型" model="query.dealType" options={awardType} whole={false} validation={{required: true}} width={250} />}
            {query.awardPunishType == 2 && <Select label="处理类型" model="query.dealType" options={backType} whole={false} validation={{required: true}} width={250} />}
            <Input label="奖罚积分" type='number' model={'query.awardPunishScore'} validation={{required: true}} width={250}/>              
            <Textarea label="备注" model="query.remark" validation={{required: true}} width={450}/>
            <div className='user-block' style={{ float: 'right'}}>
              <Button value={'取消'} theme={'default'} onClick={this.hide.bind(this)} className="margin-r-20" />
              <Button value={'确定'} onClick={this.ok.bind(this)}/>
            </div>
					</Form>
          
          <div className='margin-t-50'>
            <Box title='奖罚记录'>
              <DataTable ref={(e) => this._dataTable = e}
                  columns={columns} api={creditScoreApi.page} query={queryTable}/>
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
