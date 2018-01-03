import React from 'react';
import {Box, Content} from "beefly-common";

/**
 * 违停上报详情
 */
export default class IllegalDetails extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Content>
				<Box theme="query">
					<div style={{marginTop:'30px'}}>
						<p>上报编号：29953</p>
						<p>上报人员姓名：张三</p>
						<p>上报人员手机号：1387777777</p>
						<p>上报时间：2017-10-10 10：11：11</p>
						<p>上报车辆编号：100212</p>
						<p>城市：合肥市</p>
						<p>上报信息：这里上报的信息</p>
						<p>车辆故障图片：</p>
						<div>
							<div style={{float:"left",marginRight:'10px'}}><img src="http://mfcxbj.img-cn-qingdao.aliyuncs.com/mifengApp/reportPic/2017/12/14/1513229484990.jpg" alt="" style={{width:"200px",height:'200px'}}/></div>
							<div style={{float:"left",marginRight:'10px'}}><img src="http://mfcxbj.img-cn-qingdao.aliyuncs.com/mifengApp/reportPic/2017/12/14/1513229484990.jpg" alt="" style={{width:"200px",height:'200px'}}/></div>
							<div style={{float:"left",marginRight:'10px'}}><img src="http://mfcxbj.img-cn-qingdao.aliyuncs.com/mifengApp/reportPic/2017/12/14/1513229484990.jpg" alt="" style={{width:"200px",height:'200px'}}/></div>
						</div>
						<div style={{clear:'both'}}></div>
						<p style={{marginTop:'10px'}}>上报人员角色:用户</p>
						<div>
							<p>
								<div style={{width:'800px',border:'1px soild red'}}>
									<div style={{width:'300px',float:"left"}}>接单处理时间：2011-12-12 12:12:12</div>
									<div style={{width:'300px',float:"left"}}>发送地勤确定时间：2011-12-12 12:12:12</div>
								</div>
							</p>
							<p>
								<div style={{width:'800px'}}>
									<div style={{width:'300px',float:"left"}}>接受处理人员：邢鹏</div>
									<div style={{width:'300px',float:"left"}}>发送地勤确认人员：邢鹏</div>
								</div>
							</p>
                            <p>
								<div style={{width:'800px'}}>
									<div style={{width:'300px',float:"left"}}>处理完成时间：2011-12-12 12:12:12</div>
									<div style={{width:'300px',float:"left"}}>处理完成人员：邢鹏</div>
								</div>
							</p>
						</div>
						<div style={{clear:'both'}}></div>
						<p style={{marginTop:'10px'}}><b>备注：</b></p>
						<div>

							<p>
								<div style={{float:"left",width:'100%'}}>
									<div style={{float:"left",width:'100px'}}>张三</div>
									<div style={{float:"left",width:'200px'}}>2011-12-12 12:12:12</div>
									<div style={{float:"left",}}>备注内容: 啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
								</div>
							</p>
                            <p>
								<div style={{float:"left",width:'100%'}}>
									<div style={{float:"left",width:'100px'}}>张三</div>
									<div style={{float:"left",width:'200px'}}>2011-12-12 12:12:12</div>
									<div style={{float:"left",}}>备注内容: 啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
								</div>
							</p>
							<p>
								<div style={{float:"left",width:'100%'}}>
									<div style={{float:"left",width:'100px'}}>张三</div>
									<div style={{float:"left",width:'200px'}}>2011-12-12 12:12:12</div>
									<div style={{float:"left",}}>备注内容: 啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
								</div>
							</p>

						</div>
						<div style={{clear:'both'}}></div>
						<div style={{float:'right',marginTop:'80px'}}>
							<button>驳回处理</button>
							<button>确认处理</button>
							<button>关闭</button>
						</div>
					</div>
				</Box>
			</Content>
		)
	}

}
