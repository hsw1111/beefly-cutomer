import React from 'react';
import {observer} from 'mobx-react';
import {Button, Content, Box, DateRange, Input, Form, Field, DataTable, dtUtils, Text, msgBox} from "beefly-common";
import $ from 'jquery';
import couponApi from "../../apis/couponApi";


/**
 * 用户管理 群发出行券
 */

@observer
export default class userVoucher extends React.Component {
  constructor(props){
    super(props);

    this.state = {
		rewardCoupon: {
			couponAmout: '',
			num: '',
			expireTime: '',
			mobiles: []
		},
		cont:''
    }
  }

  render() {
    let {columns,cont,rewardCoupon} = this.state;
    console.log(rewardCoupon.mobiles,888);
    return(
      <Content>
        <Box>
			<Form ref={e => this.form = e} horizontal>
				<a class="glyphicon glyphicon-remove btn form-control-feedback" style={{'pointer-events':"auto"}}></a>
				<Input label="出行券金额" model="rewardCoupon.couponAmout" type="number" width={150} validation={{required: true}}/>
				<Input label="出行券张数" model="rewardCoupon.num" type="number" width={150}  validation={{required: true}}/>
				<Input label="过期时间" model="rewardCoupon.expireTime" type="date" width={250} validation={{required: true}}/>
				<Text label="发送对象" validation={{required: true}}>
						{/*<input ref={e => this.file = e} type="file" name="file" onChange={this.fileChange.bind(this)}/>*/}
						<input ref={e => this.file = e} type="file" name="file" onChange={e =>this.fileChange(e)}/>
				</Text>
				<Text>
					只支持".xls/.xlsx"格式；表格中只需包含"手机号"。<a href="files/initBike.xlsx">模板下载</a>
				</Text>
				<div className="margin-t-30">
					<div style={{float:'left'}}>
						<span className="h4">发送人员名单</span><span className="h6 margin-l-20">共计{cont}人</span>
					</div>
					<div style={{float:'right'}}>
						<a href="javascript:void(0)">清空</a>
					</div>
				</div>
				<div className="clear" style={{borderTop:"1px solid"}}>
				</div>
			</Form>
			<div>
				{/*<span className="label label-default margin-r-5" >Default <i className="fa fa-fw fa-close"></i></span>*/}
				{/*<span className="label label-default margin-r-5">Default <i className="fa fa-fw fa-close"></i></span>*/}
				{/*<span className="label label-default margin-r-5">Default <i className="fa fa-fw fa-close"></i></span>*/}
				{/*{noPunishLis.map((d) => (*/}
					{/*<li className={cs({'text-red': d.value})}>{d.text}</li>*/}
				{/*))}*/}
				{this.renderPrize()}
			</div>
			<div className="margin-t-80" style={{float:'right'}}>
				<Button value="确定发送" onClick={this.ok.bind(this)}/>
			</div>
        </Box>
      </Content>
    )
  }
	async ok() {

		let {rewardCoupon} = this.state;

		if (rewardCoupon.couponAmout == '') {
			msgBox.warning('出行券金额不能为空');
			return;
		}

		if (rewardCoupon.num == '') {
			msgBox.warning('出行券张数不能为空');
			return;
		}

		if (rewardCoupon.expireTime == '') {
			msgBox.warning('过期时间不能为空');
			return;
		}

		if (this.file.files.length == 0) {
			msgBox.warning('请选择上传文件');
			return;
		}

		let mobiles=JSON.stringify(rewardCoupon.mobiles);
		let formData={
			couponAmout:rewardCoupon.couponAmout,
			num:rewardCoupon.num,
			expireTime:rewardCoupon.expireTime,
			mobile:mobiles,
		};

		let result = await couponApi.massCoupon(formData);

	}

    //上传文件改变
	fileChange(e) {

		let {rewardCoupon} = this.state;
		rewardCoupon.mobiles=[];

		let files = e.target.files;
		let persons;
        let workbook;
		let fileReader = new FileReader();

		fileReader.onload = function(ev) {
			try {
				let data = ev.target.result,
					workbook = XLSX.read(data, {
						type: 'binary'
					}), // 以二进制流方式读取得到整份excel表格对象
					persons = []; // 存储获取到的数据
				console.log('workbook:', workbook, workbook.Sheets);


				// 表格的表格范围，可用于判断表头是否数量是否正确
				let fromTo = '';
				// 遍历每张表读取
				for (let sheet in workbook.Sheets) {
					if (workbook.Sheets.hasOwnProperty(sheet)) {
						fromTo = workbook.Sheets[sheet]['!ref'];
						console.log(fromTo, sheet);
						persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
						// break; // 如果只取第一张表，就取消注释这行
					}
				}


				$.each(persons,function(index,data)
				{
					rewardCoupon.mobiles.push(data.mobile);
					console.log(rewardCoupon.mobiles);
				});

			} catch (e) {
				msgBox.warning('文件类型不正确');
				return;
			}

		};
		// 以二进制方式打开文件
		fileReader.readAsBinaryString(files[0]);


	}

	renderPrize(){
		// return (
		// 	<div className="contented">
		// 		<div>分享后将自动放入</div>
		// 		<div>“个人中心”-“我的钱包”中</div>
		// 		<div>再骑一次 中大奖概率翻倍</div>
		// 	</div>
		// )
	}

}
