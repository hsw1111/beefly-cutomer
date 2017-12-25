const mapUtils = {

	// 过滤无效坐标点
	filterInvalidPoint(longitude, latitude) {

		// 方法兼容重载
		if (arguments.length === 1) {
			let obj = arguments[0];
			if (obj.hasOwnProperty('longitude') && obj.hasOwnProperty('latitude')) {
				longitude = obj.longitude;
				latitude = obj.latitude;
			} else if (obj.hasOwnProperty('lon') && obj.hasOwnProperty('lat')) {
				longitude = obj.lon;
				latitude = obj.lat;
			} else if (obj.hasOwnProperty('lng') && obj.hasOwnProperty('lng')) {
				longitude = obj.lng;
				latitude = obj.lng;
			} else if (obj.hasOwnProperty('x') && obj.hasOwnProperty('y')) {
				longitude = obj.y;
				latitude = obj.x;
			} else if (obj.hasOwnProperty('gpsX') && obj.hasOwnProperty('gpsY')) {
				longitude = obj.gpsY;
				latitude = obj.gpsX;
			} else if (obj.hasOwnProperty('gpsXy')) {
				return mapUtils.filterInvalidPoint(obj.gpsXy);
			} else {
				return false;
			}
		}

		return longitude > 73 && longitude < 136 && latitude > 3 && latitude < 54;
	}

};

export default mapUtils
