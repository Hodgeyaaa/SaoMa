/* 注册 登录 */
const router = require('koa-router')()
// 引入给前端返回统一格式的文件
const result = require('../../config/res_result.js')
// 提交数据到数据库
const {getToken, addUrl, queryUrl, updateUrl, subscribeUrl} = require('../../config/database_api.js')
//校验前端传输数据
const {regCheck, shopInfoCheck, categoryCheck, dishUnitCheck, putOnCheck} = require('../../config/checking.js')
// 生成token方法
const {createToken} = require('../../token/jwt.js')
// 获取验证前端传来的token的合法性
const {Auth} = require('../../token/auth.js')
// 图片上传
const {upload, cosfun} = require('../../cos_upload/cos.js')
//时间模块
const moment = require('moment')
moment.locale('zh-cn')
// 价格格式化
const Price = require('e-commerce_price')


// 获取订单接口
router.get('/obtainorder', new Auth().m, async (ctx) => {
	let {page, transac_status} = ctx.query;
	let sk = Number(page) * 10;
	let param = {};
	if(transac_status != '') {
		param['transac_status'] = transac_status;
	}else {
		delete param.transac_status;
	}
	let paramObj = JSON.stringify(param);
	const query = `db.collection('order-data')
	.where(${paramObj}).orderBy('order_time', 'desc').field({menu: false}).limit(10).skip(${sk}).get()`
	try{
		const res = await new getToken().postEve(queryUrl, query);
		const data = res.data.map(item => {return JSON.parse(item)});
		const tatal = {tatal: res.pager.Total}
		const array = {...{result: data}, ...tatal}
		// console.log("整合后的数据：", array)
		new result(ctx, 'SUCCESS', 200, array).answer()
		
	}catch(e){
		console.log(e)
		new result(ctx, '服务器发生错误', 500).answer()
	}
})
// 查看菜单详情接口
router.get('/vieworder', new Auth().m, async (ctx) => {
	let {id} = ctx.query;
	const query = `db.collection('order-data').doc('${id}').field({menu: true}).get()`;
	try{
		const res = await new getToken().postEve(queryUrl, query);
		const data = res.data.map(item => {return JSON.parse(item)})
		new result(ctx, 'SUCCESS', 200, data[0]).answer()
	}catch(e){
		console.log(e)
		new result(ctx, '服务器发生错误', 500).answer()
	}
})
// 商家接单接口
router.get('/receiving', new Auth().m, async (ctx) => {
	let {id} = ctx.query;
	const query = `db.collection('order-data').doc('${id}').update({data: {order_receiving: 'rec_order'}})`;
	try{
		const res = await new getToken().postEve(updateUrl, query);
		new result(ctx, '已成功接单', 200, ).answer()
		
	}catch(e){
		console.log(e)
		new result(ctx, '服务器发生错误', 500).answer()
	}
})
// 结账及推送消息接口
router.get('/checkout', new Auth().m, async ctx => {
	let {id, openid, sett_amount, order_no} = ctx.query;
	let order_time = moment().utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
	let finalPrice = Price(Number(sett_amount))
	let subscribeObj = {
		'amount1': {'value': finalPrice},
		'time2': {'value': order_time},
		'character_string3': {'value': order_no}
	}
	const query = `db.collection('order-data').doc('${id}').update({data: {transac_status: 'success'}})`;
	try{
		await new getToken().subscribe(openid, subscribeObj)
		const res = await new getToken().postEve(updateUrl, query);
		new result(ctx, '已成功结账', 200, ).answer()
	}catch(e){
		console.log('推送消息接口错误：', e)
		new result(ctx, '服务器发生错误', 500).answer()
	}
})

module.exports = router.routes()