import React from 'react';
import {Box, Field, Form, Text, utils} from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
import ReplaceOrderModal from "../modals/ReplaceOrderModal";
import IntegralModal from "../modals/IntegralModal";
import SymsModal from "../modals/SymsModal";
import orderApi from "../../../apis/orderApi";
import creditScoreApi from "../../../apis/creditScoreApi";
import symsApi from "../../../apis/symsApi";

/**
 * 违规类别
 */
export default class IllegalCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            orderDetail: null,  // 订单详情
            buckleCount: 0,     // 已扣信用分次数
            smsCount: 0,        // 收到违停短信次数
        }
    }

    async componentWillMount() {
        // 获取订单详情
        this.fetchOrderDetail();

        // 获取收到违停短信次数
        this.fetchSmsCount();

        // 获取已扣信用分次数
        this.fetchBuckleCount();
    }

    // 订单详情
    async fetchOrderDetail(orderId) {
        let {detail, onOrderChange} = this.props;
        if (!orderId) {
            let result = await orderApi.page({
                bikeCode: detail.bikeCode,
                pageSize: 1,
            });
            if (result.resultCode === 1) {
                orderId = result.data[0].id
            }
        }

        let result = await orderApi.detail({
            orderId
        });
        if (result.resultCode === 1) {
            let orderDetail = result.data;
            this.setState({
                orderDetail
            });

            onOrderChange && onOrderChange(orderDetail);
        } else {
            utils.alert(result.message)
        }
    }

    // 已扣信用分次数
    async fetchBuckleCount() {
        let {detail} = this.props;
        let result = await creditScoreApi.count({
            userId: detail.userId,
            count: detail.count
        });
        if (result.resultCode === 1) {
            this.setState({
                buckleCount: result.data
            })
        } else {
            utils.alert(result.message)
        }
    }

    // 已扣信用分次数
    async fetchSmsCount() {
        let {detail} = this.props;
        let result = await symsApi.countSms({
            userId: detail.userId
        });
        if (result.resultCode === 1) {
            this.setState({
                smsCount: result.data
            })
        } else {
            utils.alert(result.message)
        }
    }

    render() {
        let {detail} = this.props;
        let {orderDetail, smsCount, buckleCount} = this.state;
        return (
            <Box>
                <Form className={'form-label-150'} horizontal>
                    <Text label="违规类别" value={detail.content.includes('双人骑行') ? '双人骑行' : '违停'}/>
                    <Field label="当前订单">
                        {orderDetail && <div>
                            <ul className="list-unstyled">
                                <li><span className="margin-r-20">{orderDetail.id}</span>
                                    <a href="javascript:" onClick={this.replace.bind(this)}>更换订单</a></li>
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
        let {detail} = this.props;
        this._replaceModal.show({
            bikeCode: detail.bikeCode,
            beginDate: detail.lastReportTime
        });
    }

    //信用积分
    integral() {
        let {detail} = this.props;
        let {orderDetail} = this.state;
        if (orderDetail) {
            this._integralModal.show({
                userId: detail.userId,
                mobile: orderDetail.mobile
            })
        } else {
            utils.alert('')
        }
    }

    //违停短信
    syms() {
        let {detail} = this.props;
        this._symesModal.show({
            mobile: detail.mobile,
            userId: detail.userId,
        })
    }

    changeOrder(orderId) {
        this.fetchOrderDetail(orderId)
    }

}
