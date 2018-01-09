import React from 'react';
import {Box, Field, Form, Text} from "beefly-common";

/**
 * 违规类别
 */
export default class IllegalCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Box>
                <Form horizontal>
                    <Text label="违规类别" value="双人骑行"/>
                    <Field label="当前订单">
                        <div>
                            <ul className="list-unstyled">
                                <li><a href="javascript:" className="margin-r-20">121313</a>
                                    <a href="javascript:">更换订单</a></li>
                                <li>订单状态：已结束，里程：23232米，时长：12分，结束时间：2017-10-10 10：10：10</li>
                                <li>还车地点：合肥市</li>
                            </ul>
                        </div>
                    </Field>
                    <Text label="违规人手机号" value="13876551213"/>
                    <Field label="已扣信用分次数">
                        <a href="javascript:" onClick={()=>alert('1次')}>1次</a>
                    </Field>
                    <Field label="收到违停短信次数">
                        <a href="javascript:" onClick={()=>alert('1次')}>1次</a>
                    </Field>
                </Form>
            </Box>
        )
    }

}
