import React from 'react';
import {Box, Field, Form, Text} from "beefly-common";
import tripProblemApi from "../../../apis/tripProblemApi";
import ReplaceOrderModal from "../modals/ReplaceOrderModal";
import IntegralModal from "../modals/IntegralModal";
import SymsModal from "../modals/SymsModal";
/**
 * 违规类别
 */
export default class IllegalCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
			detailed: {},
			smsCounts: '',
			buckle: '',
			val: ''
		}
    }

	async componentWillMount() {
    	let {detail} = this.props;
    	let parms = {
    		bikeCode: detail.bikeCode,
    		pageSize: 1,
    	};
    	//违停数据
		let result = await tripProblemApi.orderPage(parms);
        //收到违停短信次数
		let resultSms = await tripProblemApi.countSms({userId: detail.userId});
		//已扣信用分次数
		let resultBuck = await tripProblemApi.count({userId: detail.userId, count: detail.count});

		this.setState({
			detailed: result.data[0],
			smsCounts: resultSms.data,
			buckle: resultBuck.data
		});

		//违规类型
		if(detail.content.indexOf('双人骑行')==-1){
			this.setState({
				val: "违停"
			})
		}else{
			this.setState({
				val: "双人骑行"
			})
		}
	}

    render() {
    	let {detailed, smsCounts, buckle, val} = this.state;
        return (
            <Box>
                <Form horizontal>
                    <Text label="违规类别" value={val}/>
                    <Field label="当前订单">
                        <div>
                            <ul className="list-unstyled">
                                <li><a href="javascript:" className="margin-r-20">{detailed.id}</a>
                                    <a href="javascript:" onClick={this.replace.bind(this)}>更换订单</a></li>
								<li>订单状态：{detailed.state}，里程：{detailed.mileage}米，时长：{detailed.timeInOrder}分，结束时间：{detailed.endTime}</li>
                                <li>还车地点：{detailed.backLocation}</li>
                            </ul>
                        </div>
                    </Field>
                    <Text label="违规人手机号" value={detailed.mobile}/>
                    <Field label="已扣信用分次数">
                        <a href="javascript:" onClick={this.integral.bind(this)}>{buckle}次</a>
                    </Field>
                    <Field label="收到违停短信次数">
                        <a href="javascript:" onClick={this.syms.bind(this)}>{smsCounts}次</a>
                    </Field>
                </Form>
				<ReplaceOrderModal ref={(e) => this._replaceModal = e}/>
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
	integral(){
		let {detail} = this.props;
		let {detailed} = this.state;
		this._integralModal.show({
			userId: detail.userId,
			mobile: detailed.mobile
		})
	}
	//违停短信
	syms(){
		let {detail} = this.props;
		this._symesModal.show({
			mobile: detail.mobile,
			userId: detail.userId,
		})
	}

}
