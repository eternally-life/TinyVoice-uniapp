module.exports = {
	saveData,
	grouping,
	timeAnalysis,
	dataDeposit,
	getSingleDayData,
	dayDataUnpacking
	// getWeekNum,
}

// 数据
// 时间基准点（每个学期的第一天）
// var timeNode = 1645977600; //86400一天
/**获取当前周数
 * 	及周几
 * */
/* function getWeekNum() {
	let timeNum = new Date();
	let timeA = Math.round(timeNum / 1000);
	let num = ((timeA - timeNode) / 86400) / 7;
	let week = timeNum.getDay() == 0 ? timeNum.getDay() + 6 : timeNum.getDay() - 1;
	return [parseInt(num), week];
} */

/**分析当前时间
 *  - timeNode 开学时间戳
 * 	- anyTime	指定时间对象
 *	——默认模式  缺省anyTime
 *	根据传入开学的时间戳timeNode 进行计算
 *	返回 当前 第几周周数 及 周几
 *++++++++++++++++++++++++++++++++	
 *	——手动模式	两个参数均需要
 *	anyTime  可以是时间戳(10位、13位均可)，也可以是构建的 Date对象
 *	返回 指定日期 处于第几周 周几
 *--------------------------------
 *	传入的时间戳 仅anyTime无需/1000
 *	以上两个模式返回值需要解构   索引均从0 开始计数 而非1开始
 * */
function timeAnalysis(timeNode, anyTime) {
	if (timeNode == undefined) {
		throw "should time para";
	} else if (typeof timeNode !== 'number') {
		throw "timeNode should number";
	} else {
		// 模式匹配	默认<-->手动
		let timeNum = anyTime == undefined ? new Date() : anyTime;

		if (typeof anyTime == 'number') {
			console.log("num->obj");
			timeNum = timeNum.toString().length == 13 ? timeNum : timeNum * 1000;
			timeNum = new Date(timeNum);
		}
		let timeA = Math.round(timeNum / 1000);
		let num = ((timeA - timeNode) / 86400) / 7,
			week = timeNum.getDay() == 0 ? 6 : timeNum.getDay() - 1;
		return [parseInt(num), week];
	}
}

/**初始化课表数据
 * 参数：
 * 	schData从数据库拿到的一手数据
 * 	cutData 经过处理的空课表
 * 结果参数：
 * 	allData：最终的处理完 一个学期课表（按周分好）
 * */
function grouping(schData) {
	let cutData = cutIni(schData);
	let [sourceData, allData] = [schData, cutData];
	allData.forEach(function(endV, endI) {
		sourceData.forEach(function(souV, souI) {
			if (souV.StartWeek <= endI && endI <= souV.EndWeek) {
				endV.push(souV);
			}
		})
	});
	allData.shift();
	return allData;
}

/**创建空课表
 *  一共20周
 * */
function cutIni(schData) {
	/* 	schData.forEach((v, i, arr) => {
			if (v.EndWeek <= maxWeek) return;
			maxWeek = v.EndWeek;
			console.log(v.Cname);
		}) */
	let maxWeek = 0;
	for (var i = 0; i < schData.length; i++) {
		if (schData[i].EndWeek <= maxWeek) continue;
		maxWeek = schData[i].EndWeek;
	}

	let cousArr = [];
	for (let a = 0; a <= maxWeek; a++) {
		cousArr.push([]);
	}
	return cousArr;
}

/**课表精细切割
 * 参数：
 * 	全部课表数据	allData
 * 	需要划分的周	week
 *返回指定week一周的数据
 * */
function dataDeposit(allData, week) {
	let Data = allData[week];
	/* 	let weekContainer = [];
		// 描绘空课表框
		for (let i = 0; i < 7; i++) {
			weekContainer.push([]);
			for (let j = 0; j < 6; j++) {
				weekContainer[i].push([]);
			}
		} */
	// let weekContainer = new Array(7).fill(new Array(6).fill([]));
	let weekContainer = new Array(7).fill([]).map(item => new Array(6).fill([]))
	// 对空框填入课表数据
	Data.forEach(function(v, index, arr) {
		if (v.Seq == 7) return; //特殊情况直接跳过
		if (weekContainer[v.Week - 1][v.Seq - 1] == false) { //判断是否有课填充（冲突的情况）
			weekContainer[v.Week - 1][v.Seq - 1] = v;
		} else if (weekContainer[v.Week - 1][v.Seq - 1].length > 1) { //当已存入2个以上课程时
			weekContainer[v.Week - 1][v.Seq - 1].push(v);
		} else { //已存入一个，开始存第二个
			let oldData = weekContainer[v.Week - 1][v.Seq - 1];
			weekContainer[v.Week - 1][v.Seq - 1] = [];
			weekContainer[v.Week - 1][v.Seq - 1].push(oldData);
			weekContainer[v.Week - 1][v.Seq - 1].push(v)
		}
	})
	return weekContainer;
}

/**渲染一天数据
 * 渲染数据根据数组排列index获取
 * 而不是Date().getDay()
 * ！！！必须先渲染一周的数据 才能渲染该周指定的一天
 * */
function getSingleDayData(weekData, dayNum) {
	return weekData[dayNum];
}

/**课表数据解包 
 * 接收一天的数据
 * 返回数据类型：数组
 * 解开所有重修的冲突内容  单独显示*/
function dayDataUnpacking(singleDay) {
	let tempContainer = [];
	// 展开一天的数据
	for (var i = 0; i < singleDay.length; i++) {
		// 跳过没课
		if (singleDay[i].length == 0) continue;
		// 遍历冲突包 并展开依次填充
		if (singleDay[i].length > 1) {
			singleDay[i].forEach((vv, ii, arr) => {
				tempContainer.push(vv);
			});
		} else if (singleDay[i].length == undefined) {
			//正常课程对象.length 返回undefined
			tempContainer.push(singleDay[i]);
		}
	}
	return tempContainer;
}

// 异步存储课表数据
function saveData(key, value) {
	if (value == 0 || value == null || value == undefined) {
		console.error(key + "缓存数据读取异常：", value);
		return false;
	}
	try {
		uni.setStorage({
			key: key,
			data: value,
			success: function() {
				console.log('键:' + key, '值:' + value, '以成功缓存');
			}
		})
	} catch (e) {
		return false;
	}
	return true;
}
