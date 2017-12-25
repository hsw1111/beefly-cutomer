import React from 'react';
import {Box, Content, Form, Map ,CitySelect ,Button ,Input} from "beefly-common";
import {dateUtils} from 'jeselvmo';


const icon1 = require('../../images/icon-lost.png');

const icon2 = require('../../images/icon-normal.png');

const icon3 = require('../../images/icon-police.png');

const icon4 = require('../../images/battery_not.png');

const icon5 = require('../../images/battery_zai.png');


/**
 * 风控监控系统
 */
export default class BikeMonitor extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			markerPosition: {
				longitude: 116.481215,
				latitude: 39.990162
			},
			markersed:[],
			polygonsed:[],
			totals:'',
			city:''
		};
	}

	render() {
		let {markersed,totals,city,polygonsed} = this.state;
		return (
			<Box theme="map">
				<div className='b_map'>
					<Form inline={true}>
						<div className='b_top'>一共多少{totals}辆</div>
						<div className='b_top'>请输入车辆编号：</div>
						<Input ref={(e) => this._biekNumber = e}/>
						<Button icon="search"  onClick={this.search.bind(this)}>查询</Button>
					</Form>
			    </div>
				<Map ref={(e) => this._map = e} width="100%" height="800" markers={markersed} polygons={polygonsed}  citys={city} onShowMarkerInfo={this.onShowMarkerInfo.bind(this)} />
			</Box>
		)
	}


	async search() {
		//获取点坐标
		let params ={
			'bikeCode':this._biekNumber.value,
		};
        // //定位城市
		this.setState({
			city: "北京市"
		});

	}

	onShowMarkerInfo(marker){
		let datas = marker.datas;
		console.log(dateUtils.format(datas.gpsTime, dateUtils.patterns.datetime),777)
		let info = [];
        info.push('电池编号：'+datas.batteryNo+'');
		info.push('终端编号：'+datas.boxCode+'');
		info.push('地址更新时间：'+ dateUtils.format(datas.gpsTime, dateUtils.patterns.datetime));
		info.push('详细地址：'+datas.localCity+'');
        return info.join('<br/>');
	}

}
