import React from 'react';
import {Box, Button, CitySelect, Form, Input, Map, MapCity} from "beefly-common";
import {dateUtils} from 'jeselvmo';
import {InfoWindow, Marker, Polygon} from 'react-amap';
import bikeMonitorApi from "../../apis/bikeMonitorApi";
import cityApi from "../../apis/cityApi";
import {bikePoliceReasonMap} from "../../js/maps";
import {POLYGON_STYLE_1, POLYGON_STYLE_2} from "../../js/styles";
import mapUtils from "../../utils/mapUtils";

const iconLost = require('../../images/icon-lost.png');
const iconNormal = require('../../images/icon-normal.png');
const iconPolice = require('../../images/icon-police.png');

/**
 * 车辆监控系统
 */
export default class BikeMonitor extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			city: '',							// 当前地图城市定位
			regionList: [],						// 运营区域列表
			reverseRegionList: [],				// 运营区域中的违停区域列表
			bikeList: [],						// 车辆列表
			infoWindow: {						// 信息框
				visible: false
			}
		}
	}

	markerEvents = {
		mousedown: (e) => {
			this.setState({
				infoWindow: {
					visible: true,
					position: e.lnglat,
					content: this.getMarkerInfoHtml(e.target.getExtData())
				}
			})

		}
	};

	infoWindowEvents = {
		close: (e) => {
			this.setState({
				infoWindow: {
					visible: false
				}
			})
		}
	};

	render() {
		let {city, regionList, reverseRegionList, bikeList, infoWindow} = this.state;
		return (
			<Box theme="map">
				<div className='b_map'>
					<Form inline={true}>
						<div className='b_top'>一共有 {bikeList.length} 辆</div>
						<CitySelect ref={(e) => this._citySelect = e}/>
						<Input ref={(e) => this._biekNumber = e} placeholder="车牌号"/>
						<Button icon="search" onClick={this.search.bind(this)}>查询</Button>
					</Form>
				</div>
				<div style={{width: '100%', height: 800}}>
					<Map>
						<MapCity city={city}/>
						{regionList.map((p) => (
							<Polygon path={p.fenceGpsList} style={POLYGON_STYLE_1}/>
						))}
						{reverseRegionList.map((p) => (
							<Polygon path={p.fenceGpsList} style={POLYGON_STYLE_2}/>
						))}
						{bikeList.map((b) => (
							<Marker position={{longitude: b.gpsXy.lon, latitude: b.gpsXy.lat}}
									extData={b}
									icon={b.isOnline == 0 ? iconLost : b.isPolice == 1 ? iconPolice : iconNormal}
									events={this.markerEvents}/>
						))}
						{infoWindow.visible && (
							<InfoWindow {...infoWindow} events={this.infoWindowEvents}/>
						)}
					</Map>
				</div>
			</Box>
		)
	}


	async search() {

		let cityCode = this._citySelect.cityCode;
		let bikeCode = this._biekNumber.value;

		this.setCity(cityCode);
		this.fetchCityRegionList({cityCode});
		this.fetchBikeList({cityCode, bikeCode});

	}


	async fetchCityRegionList(params) {
		const result = await
			cityApi.queryCityRegionList(params);

		if (result.code === 0) {
			let data = result.data;
			this.setState({
				regionList: data.regionList,
				reverseRegionList: data.reverseRegionList
			})
		}
	}

	async fetchBikeList(params) {
		const result = await
			bikeMonitorApi.getBikeListAll(params);

		if (result.code === 0) {
			let data = result.data;
			this.setState({
				bikeList: data.filter((b) => mapUtils.filterInvalidPoint(b))
			})
		}
	}

	setCity(city) {
		this.setState({
			city
		})
	}


	getMarkerInfoHtml(marker) {
		let info = [];
		info.push('车牌号：' + marker.code + '');
		info.push('终端编号：' + marker.boxCode + '');
		info.push('详细地址：' + marker.localCity + '');
		info.push('地址更新时间：' + dateUtils.format(marker.gpsTime, dateUtils.patterns.datetime));
		info.push('报警类型：' + (bikePoliceReasonMap[marker.policeReason] || '无'));
		return info.join('<br/>');
	}

}
