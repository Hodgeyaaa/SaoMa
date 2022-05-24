const db = wx.cloud.database()
const seven = db.collection('seven-day-sales')
const _ = db.command

class analysis {
	constructor(arg) {}
	
	async sameDay(time, sales_volume) {
		try{
			let query = await seven.where({time}).get()
			console.log("查询到的当天销售额：", query)
			// 浮点数处理
			let final_price = parseFloat(sales_volume.toFixed(10))
			if(query.data.length == 0) {
				await seven.add({data: {time, sales_volume: final_price}})
			}else {
				let total_amount = Number(query.data[0].sales_volume) + final_price;
				await seven.doc(query.data[0]._id).update({data: {
					sales_volume: total_amount
				}})
			}
		}catch(e){
			throw "analysis类sameDay方法发生错误"
		}
	}
}

export{analysis}