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
      apType: 0,
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
      },
      query: {
        awardPunishType: 1,
        creditScoreType: 9,
        creditScoreCount: -10,
        remark: ''
      }
		}
	}

	render() {
    let awardType = {
      8: '其他'
    }
    let punishType = {
      8: '其它',
      9: '违停扣分',
      10: '车辆轻度划伤',
      11: '车辆重度划伤',
      12: '加装私锁',
      13: '忘记关锁',
      14: '弃车逃跑',
    }
    let backType = {
      16: '违停扣错',
      8: '其他'
    }

    
    let {show, data, columns, queryTable, query} = this.state;

		return (
			<Modal show={show} title="信用积分管理" size='lg' onHide={this.hide.bind(this)} onOk={this.ok.bind(this)}>
      {show && 
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
           <Select label="奖惩类型" model="query.awardPunishType" options={awardPunishType} whole={false} validation={{required: true}} width={250}  onChange={this.change.bind(this)}/>
      
           <Select label="处理类型" model="query.creditScoreType" options={query.awardPunishType==1?punishType:(query.awardPunishType==0?awardType:backType)} whole={false} validation={{required: true}} width={250} onChange={this.change.bind(this)}/>
           <Input label="奖罚积分"  type='number' model="query.creditScoreCount" validation={{required: true}} width={250}/>
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
      }
			</Modal>
		)
  }
  // 下拉菜单改变时，奖惩积分随之改变
  change(e){
    if(this.state.query.awardPunishType==0){
      this.setState({
        query: {
          awardPunishType: 0,
          creditScoreType:e.target.value,
          creditScoreCount: 10
        }
      })
    }else if(this.state.query.creditScoreType==9||this.state.query.creditScoreType==10){
      this.setState({
        query: {
          awardPunishType: 1,
          creditScoreType:e.target.value,
          creditScoreCount: -10
        }
      })
    }else if(this.state.query.awardPunishType==1&&(this.state.query.creditScoreType!=9||this.state.query.creditScoreType!=10)){
      this.setState({
        query: {
          awardPunishType: 1,
          creditScoreType:e.target.value,
          creditScoreCount: -30
        }
      })
    }else if(this.state.query.awardPunishType==1&&this.state.query.creditScoreType==8){
      this.setState({
        query: {
          awardPunishType: 1,
          creditScoreType:e.target.value,
          creditScoreCount: ''
        }
      })
    }else if(this.state.query.awardPunishType==2&&this.state.query.creditScoreType==8){
      this.setState({
        query: {
          awardPunishType: 2,
          creditScoreType:e.target.value,
          creditScoreCount: ''
        }
      })
    }else {
      this.setState({
        query: {
          awardPunishType: 2,
          creditScoreType:e.target.value,
          creditScoreCount: ''
        }
      })
    }
  }
 
	show(data) {
		this.setState({
      show: true,
      data,
      queryTable: {
        'userId': data.id
      }
    });
	}

	hide() {
		this.setState({
      show: false,
		});
	}

	async ok() {
    let {query} = this.state
		console.log(query)
	}

}
