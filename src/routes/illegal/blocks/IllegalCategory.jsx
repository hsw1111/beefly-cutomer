import React from 'react';
import {observer} from 'mobx-react';
import {Box, Field, Form, Text} from "beefly-common";
import ReplaceOrderModal from "../modals/ReplaceOrderModal";
import IntegralModal from "../modals/IntegralModal";
import SymsModal from "../modals/SymsModal";
import orderApi from "../../../apis/orderApi";
import creditScoreApi from "../../../apis/creditScoreApi";
import symsApi from "../../../apis/symsApi";
import beefly from "../../../js/beefly";
import illegalStore from "../stores/illegalStore";

/**
 * 违规类别
 */
@observer
export default class IllegalCategory extends React.Component {

	componentWillMount() {
        // 获取订单详情
        illegalStore.fetchOrderDetail();
        // 获取收到违停短信次数
		illegalStore.fetchSmsCount();
        // 获取已扣信用分次数
		illegalStore.fetchBuckleCount();
    }


    render() {
        let {detail, orderDetail, smsCount, buckleCount, misreport} = illegalStore;
        name = '(订单里程<100米时，存在误报风险，需要处罚的有可能是上一次订单)';
        return (
            <Box>
                <Form className={'form-label-150'} horizontal>
                    <Text label="违规类别" value={detail.content.includes('双人骑行') ? '双人骑行' : '违停'}/>
                    <Field label="当前订单">
                        {orderDetail && <div>
                            <ul className="list-unstyled">
                                <li><span className="margin-r-20">{orderDetail.id}</span>
                                    <a href="javascript:" onClick={this.replace.bind(this)}>更换订单</a>{misreport === 1 ? <span className="margin-l-20" style={{backgroundColor: 'yellow'}}>{name}</span> : ''}</li>
                                <li>订单状态：{orderDetail.state || '无'}，里程：{orderDetail.mileage || 0}米，时长：{orderDetail.timeInOrder || 0}分，结束时间：{orderDetail.endTime || '-'}</li>
                                <li>还车地点：{orderDetail.backLocation || '-'}</li>
                            </ul>
                        </div>}
                    </Field>
                    <Text label="违规人手机号">
                        {orderDetail && <span>{orderDetail.mobile}</span>}
                    </Text>
                    <Field label="已扣信用分次数">
                        <a href="javascript:" onClick={this.integral.bind(this)}>{buckleCount}次</a>
                    </Field>
                    <Field label="收到违停短信次数">
                        <a href="javascript:" onClick={this.syms.bind(this)}>{smsCount}次</a>
                    </Field>
                </Form>
                <ReplaceOrderModal ref={(e) => this._replaceModal = e} onChange={this.changeOrder.bind(this)}/>
                <IntegralModal ref={(e) => this._integralModal = e}/>
                <SymsModal ref={(e) => this._symesModal = e}/>
            </Box>
        )
    }

    // 更改订单
    replace() {
        let {detail} = illegalStore;
        this._replaceModal.show({
            bikeCode: detail.bikeCode,
            beginDate: detail.lastReportTime
        });
    }

    //信用积分
    integral() {
        let {detail, orderDetail} = illegalStore;
        if (orderDetail) {
            this._integralModal.show({
                userId: detail.userId,
                mobile: orderDetail.mobile
            })
        } else {
            beefly.bootbox.alert('')
        }
    }

    //违停短信
    syms() {
        let {detail} = illegalStore;
        this._symesModal.show({
            mobile: detail.mobile,
            userId: detail.userId,
        })
    }

    changeOrder(orderId) {
		illegalStore.fetchOrderDetail(orderId)
    }

}
