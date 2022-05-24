const router = require('koa-router')()
// 引入给前端返回统一格式的文件
const result = require('../../config/res_result.js')
// 提交数据到数据库
const {getToken, addUrl, queryUrl, updateUrl, createQrUrl} = require('../../config/database_api.js')
//校验前端传输数据
const {tableCheck} = require('../../config/checking.js')
// 生成token方法
const {createToken} = require('../../token/jwt.js')
// 获取验证前端传来的token的合法性
const {Auth} = require('../../token/auth.js')
// 图片上传
const {upload, cosBuffer} = require('../../cos_upload/cos.js')
//时间模块
const moment = require('moment')
moment.locale('zh-cn')

// 添加桌号接口
router.post('/qrcode', new Auth().m, async ctx => {
	let {table} = ctx.request.body;
	new tableCheck(ctx, table).toCheck()
	try{
		// 查询桌号是否存在
		const query = `db.collection('table_qr_code').where({table: '${table}'}).get()`;
		const table_data = await new getToken().postEve(queryUrl, query);
		if(table_data.data.length > 0) {
			new result(ctx, "桌号已存在", 202).answer()
		}
		else {
			let res = await new getToken().createQRCode(table)
			console.log("resCode: ", res)
			// 二进制图片命名
			function createImgName() {
				let imgName = ''
				for (var i = 0; i < 5; i++) {
					imgName += Math.floor(Math.random() * 10)
				}
				return imgName + table + '.jpg'
			}
			let img = createImgName()
			let time = moment().utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
			const res_img = await cosBuffer(img, res.data)
			let qrCodeUrl = 'https://' + res_img
			const addQuery = `db.collection('table_qr_code').add({data: {time: '${time}', table: '${table}', code: '${qrCodeUrl}'}})`
			await new getToken().postEve(addUrl, addQuery)
			new result(ctx, "添加成功", 200).answer()
			console.log("imageUrl: ", res_img)
		}
	}catch(e){
		new result(ctx, "服务器发生错误", 500).answer()
	}
})

// 请求桌号接口
	router.get('/getqrcode', new Auth().m, async ctx => {
		let {page} = ctx.query
		let sk = Number(page) * 10
		const query = `db.collection('table_qr_code').orderBy('table', 'desc').limit(10).skip(${sk}).get()`
		try{
			let res = await new getToken().postEve(queryUrl, query)
			console.log(res)
			const data = res.data.map(item => {return JSON.parse(item)})
			const tatal = {tatal: res.pager.Total}
			const array = {...{result: data}, ...tatal}
			// const array = {result: data, tatal: res.pager.Total}
			new result(ctx, 'SUCCESS', 200, array).answer()
		}catch(e){
			new result(ctx, "服务器发生错误", 500).answer()
		}
		
	})

// 7天销售额数据可视化接口
router.get('/salesvolume', new Auth().m, async ctx => {
	// 返回给前端的数据格式
	// [{time: '2022-02-22', sales_volume: 66}, {}]
	// let time = moment().utcOffset(8).subtract(0).format('YYYY-MM-DD')
	try{
		let catedays = []
		for(let i = 6; i >= 0; i--) {
			var curTime = moment().utcOffset(8).subtract(i, 'day').format('YYYY-MM-DD')
			catedays.push(curTime)
		}
		// console.log("时间：", catedays)
		let str = JSON.stringify(catedays)
		const query = `db.collection('seven-day-sales')
		.where({time: db.command.in(${str})}).orderBy('time', 'asc').field({time: true, sales_volume: true}).get()`;
		let res = await new getToken().postEve(queryUrl, query)
		const res_data = res.data.map(item => {
			return {
				sales_volume: JSON.parse(item).sales_volume,
				time: JSON.parse(item).time,
				unix: moment(JSON.parse(item).time).unix()
			}
		})
		console.log(res_data)
		let allDays = catedays.map(item => {
			return {
					sales_volume: 0,
					time: item,
					unix: moment(item).unix()
				}
		})
		// 去重
		let obj = {}
		let arr = [...res_data, ...allDays].reduce((pre, next) => {
			if(!obj[next.time]) {
				pre.push(next)
				obj[next.time] = true
			}
			return pre
		}, [])
		// 排序
		let finalData = arr.sort((a, b) => {
			return (a.unix - b.unix);
		})
		console.log("jj: ", finalData)
		new result(ctx, 'SUCCESS', 200, finalData).answer()
	}catch(e){
		// new result(ctx, "服务器发生错误", 500).answer()
		console.log(e)
	}
})


module.exports = router.routes();