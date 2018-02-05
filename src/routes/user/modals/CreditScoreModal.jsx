import React from 'react';
import {Button, Form, Modal,Input, msgBox, Textarea, Row, Col, Text, Box, Select, DataTable, dtUtils } from "beefly-common";
import {rewardType, integralType} from '../../../maps/userMap';
import creditScoreApi from "../../../apis/creditScoreApi";

/**
 * 信用积分管理
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
				{title: '操作人', data: 'manageName', render:(data) =>(data == '' ?'系统自动':data)},
				{title: '奖惩类型', data: 'unit', render: this.renderIntegral.bind(this)},
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
        remark: '',
      }
		}
	}
  renderIntegral(data, type, row){
		if(row.unit == 0){
			return `<span>${dtUtils.renderMap(data, rewardType)}</span>`
		}else{
			return `<span class="label label-danger">${dtUtils.renderMap(data, rewardType)}</span>`
		}
  }
  
	render() {
    let awardType = {
      8: '其他',
      16: '违停扣错积分返还'
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
           <Select label="奖惩类型" model="query.awardPunishType" options={rewardType} whole={false} validation={{required: true}} width={250}  onChange={this.change.bind(this)}/>
           <Select label="处理类型" model="query.creditScoreType" options={query.awardPunishType==1?punishType:awardType} whole={false} validation={{required: true}} width={250} onChange={this.change.bind(this)}/>
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
    // 积分奖励都+10
    if(this.state.query.awardPunishType==0){
      this.setState({
        query: {
          awardPunishType: 0,
          creditScoreType:e.target.value,
          creditScoreCount: 10,
          remark: '',
        }
      })
      // 违停扣分和轻度划伤-10
    }else if(this.state.query.creditScoreType==9||this.state.query.creditScoreType==10){
      this.setState({
        query: {
          awardPunishType: 1,
          creditScoreType:e.target.value,
          creditScoreCount: -10,
          remark: '',
        }
      })
      // 其余积分处罚-30
    }else if(this.state.query.awardPunishType==1&&(this.state.query.creditScoreType==11||this.state.query.creditScoreType==12||this.state.query.creditScoreType==13||this.state.query.creditScoreType==14)){
      this.setState({
        query: {
          awardPunishType: 1,
          creditScoreType:e.target.value,
          creditScoreCount: -30,
          remark: '',
        }
      })
      // 积分处罚中的其他为空，由客服填写
    }else{
      this.setState({
        query: {
          awardPunishType: 1,
          creditScoreType:e.target.value,
          creditScoreCount: '',
          remark: '',
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
      },
      query: {
        userId: data.id,
        awardPunishType: 1,
        creditScoreType: 9,
        creditScoreCount: -10,
        remark: '',
      }
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
    let {query, queryTable} = this.state
    if(query.creditScoreCount==''){
      msgBox.warning("奖惩积分不能为空")
      return
    }
    if(query.awardPunishType==0&&query.creditScoreCount<0){
      msgBox.warning("积分奖励应为正数")
      return
    }
    if(query.awardPunishType==1&&query.creditScoreCount>0){
      msgBox.warning("积分处罚应为负数")
      return
    }
    if(parseInt(query.creditScoreCount) != Number(query.creditScoreCount)){
      msgBox.warning("奖惩积分必须为整数");
      return
    }
    if(query.remark==''){
      msgBox.warning("备注不能为空")
      return
    }
    let result = await creditScoreApi.insertScore({
      userId: queryTable.userId,
      creditScoreCount: query.creditScoreCount,
      remark: query.remark,
      creditScoreType: query.creditScoreType,
    })
    if(result.resultCode==1){
      msgBox.success("奖惩积分操作成功！")
      this.hide(true)
    }
	}

}
