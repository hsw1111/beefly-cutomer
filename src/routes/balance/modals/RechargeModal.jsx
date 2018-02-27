import React from 'react';
import {Form, Modal, msgBox, Row, Col, Text, Box, DataTable, dtUtils } from "beefly-common";
import transRecordApi from "../../../apis/transRecordApi";
import {channelType} from "../../../maps/balanceMap";

/**
 * 充值明细
 */
export default class BalanceModal extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      show: false,
      detail: '',
      columns: [
				{title: '时间', data: 'tradeTime', render: dtUtils.renderDateTime},
				{title: '充值金额', data: 'money',},
				{title: '当前剩余充值余额', data: 'currentAmount'},
				{title: '充值方式', data: 'channel', render: (data) => dtUtils.renderMap(data, channelType)},
      ],
      queryTable: {
        appUserId: '',
        type: 2   //交易类型为充值
      }
		}
	}

	render() {
    let {show, detail, columns, queryTable} = this.state;
		return (
			<Modal show={show} title="充值金额充值明细" size='lg' onHide={this.hide.bind(this)}>
      {show &&
				<Modal.Body style={{height: 660}}>
					<Form className="form-label-100" horizontal>
            <Row>
              <Col md={5}>
                <Text label="用户编号" value={detail.id}/>
              </Col>
              <Col md={5}>
                <Text label="手机号" value={detail.mobile}/>
              </Col>
            </Row>
            <p style={{margin: '10px 14px'}}>用户当前充值余额：<span className='text-orange'>{detail.rechargeBalance}</span></p>
					</Form>
          <div  className='margin-t-20'>
            <Box title='充值金额的充值记录'>
              <DataTable ref={(e) => this._dataTable = e}
                  columns={columns} api={transRecordApi.page} query={queryTable}/>
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
      detail: data,
      queryTable: {
        appUserId: data.id,
        type: 2
      },
    })
	}

	hide() {
		this.setState({
      show: false,
    });
	}
}
