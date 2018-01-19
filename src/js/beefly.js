
let beefly = {

	DateMinus(date1,date2){
		let type1 =new Date( date1);
		let type2 =new Date( date2);
		let s1 = type1.getTime();
		let s2 = type2.getTime();
		let total = (s2 - s1)/1000;

		let day = total / (24*60*60);//计算整数天数
		return day
	}

};

window.beefly = beefly;
export default beefly;
