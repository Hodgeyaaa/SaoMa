/* 注册 登录 */
const router = require('koa-router')()
// 引入给前端返回统一格式的文件
const result = require('../../config/res_result.js')
// 提交数据到数据库
const {getToken, addUrl, queryUrl, updateUrl} = require('../../config/database_api.js')
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

router.post('/uploadres',upload.single('file'), async ctx => {
	// 接收到前端上传的静态资源：ctx.file
	// console.log("ctx.file:", ctx.file)
	try{
		const fileUrl = await cosfun(ctx.file.filename, ctx.file.path)
		new result(ctx, '上传成功', 200, 'https://' + fileUrl).answer()
	}catch(e){
		new result(ctx, '上传失败', 500).answer()
	}
	
})

// 商家信息上传接口
router.post('/uploadshop',new Auth().m, async ctx => {
		const {id, name, address, logo} = ctx.request.body
		console.log("前端提交的信息：", ctx.request.body)
		// 校验信息
		new shopInfoCheck(ctx, name, address, logo).toCheck()
		// 信息有效，提交到数据库
		let addQuery = `db.collection('merchant-info').add({data:{name: '${name}', address: '${address}', logo: ${logo}}})`
		try{
			await new getToken().postEve(addUrl, addQuery);
			new result(ctx, '提交成功', 200).answer()
		}catch(e){
			new result(ctx, '提交失败，服务器发生错误', 500).answer()
		}
		
		
})

// 获取商家信息接口
router.get('/obtainshop',new Auth().m, async ctx => {
		let query = `db.collection("merchant-info").get()`
		try{
			let res = await new getToken().postEve(queryUrl, query);
			const data = res.data.map(item => {return JSON.parse(item)})
			new result(ctx, 'SUCCESS', 200, data).answer()
		}catch(e){
			new result(ctx, '服务器发生错误', 500).answer()
		}
})

// 商家信息修改接口
router.post('/modifyshop',new Auth().m, async ctx => {
		const {id, name, address, logo} = ctx.request.body
		new shopInfoCheck(ctx, name, address, logo).toCheck()
		let updateQuery = `db.collection("merchant-info").where({_id: '${id}'}).update({data:{name: '${name}', address: '${address}', logo: ${logo}}})`
		// let updateQuery = `db.collection("merchant-info").doc('${id}').update({data:{name: '${name}', address: '${address}', logo: ${logo}}})`
		try{
			await new getToken().postEve(updateUrl, updateQuery);
			new result(ctx, '修改成功', 200).answer()
		}catch(e){
			new result(ctx, '修改失败，服务器发生错误', 500).answer()
		}
})

// 商品类目上传接口
router.post('/addcategory',new Auth().m, async ctx => {
		const {category} = ctx.request.body
		new categoryCheck(ctx, category).toCheck()
		//查询数据库是否存在该类目
		let cid = 'a' + Date.now()
		let query = `db.collection("dishes-category").where({value: '${category}'}).get()`
		let addQuery = `db.collection('dishes-category').add({data:{cid: '${cid}', count: 0, 
		value: '${category}', label: '${category}', sele_quantity: 0}})`
		
		try{
			const res = await new getToken().postEve(queryUrl, query);
			
			if(res.data.length === 0) {
				await new getToken().postEve(addUrl, addQuery)
				new result(ctx, '添加成功', 200).answer()
			}else {
				new result(ctx, '商品类目已存在', 202).answer()
			}
		}catch(e){
			console.log(e)
			new result(ctx, '服务器发生错误', 500).answer()
		}
		
})

// 获取菜品类目接口
router.get('/obtaincate', new Auth().m, async (ctx) => {
	let {page} = ctx.query
	let skipNum = page * 10
	let query = `db.collection("dishes-category").orderBy('cid', 'desc').limit(10).skip(${skipNum}).get()`
	
	try{
		const res = await new getToken().postEve(queryUrl, query)
		// console.log("获取到的数据：", res)
		const data = res.data.map((item) => {return JSON.parse(item)})
		const tatal = {tatal: res.pager.Total}
		const array = {...{result: data}, ...tatal}
		// console.log("整合后的数据：", array)
		new result(ctx, 'SUCCESS', 200, array).answer()
	}catch(e){
		console.log(e)
		new result(ctx, '服务器发生错误', 500).answer()
	}
})

// 获取菜品单位接口
router.get('/obtainunit', new Auth().m, async (ctx) => {
	const query = `db.collection("dishes-cate").get()`
	try{
		const res = await new getToken().postEve(queryUrl, query)
		const data = res.data.map((item) => {return JSON.parse(item)})
		new result(ctx, 'SUCCESS', 200, data).answer()
	}catch(e){
		new result(ctx, '服务器发生错误', 500).answer()
	}
})

//添加菜品单位接口
router.post('/dishunit', new Auth().m, async (ctx) => {
	const {unit} = ctx.request.body
	new dishUnitCheck(ctx, unit).toCheck()
	let query = `db.collection("dishes-cate").where({value: '${unit}'}).get()`
	let addQuery = `db.collection('dishes-cate').add({data:{unid: '${Date.now()}', value: '${unit}', label: '${unit}'}})` 
	try{
		const res = await new getToken().postEve(queryUrl, query);
		
		if(res.data.length === 0) {
			await new getToken().postEve(addUrl, addQuery)
			new result(ctx, '添加成功', 200).answer()
		}else {
			new result(ctx, '商品单位已存在', 202).answer()
		}
	}catch(e){
		console.log(e)
		new result(ctx, '服务器发生错误', 500).answer()
	}
})

//上架商品接口
router.post('/uploaddishes', new Auth().m, async (ctx) => {
	// 前端传来的value为cid, 价格,单位,口味包含在spec，口味属性在att_name,是否添加了口味att_hide
	const {id, category, name, att_hide, att_name, specs, image, value} = ctx.request.body
	// console.log("att_hide:", att_hide)
	let specsArray = JSON.parse(specs)
	// console.log(specsArray)
	// 校验
	new putOnCheck(ctx, category, name, specsArray, image, att_name, att_hide).toCheck()
	//当前时间
	let time = moment().format('YYYY-MM-DD HH:mm:ss')
	// let imageUrl = JSON.parse(image)
	let query = `db.collection("shelves-list").where({name: '${name}'}).get()`
	let addQuery = `db.collection("shelves-list").add({data:{cid: '${value}', 
	category: '${category}', name: '${name}', specsArray: ${specs}, image: ${image}, 
	time: '${time}', att_name: '${att_name}', att_hide: '${att_hide}', monthlysale: 0, quantity: 0, onsale: true}})`
	//重新上架
	let updateQuery = `db.collection("shelves-list").where({_id: '${id}'}).update({data:{cid: '${value}', 
	category: '${category}', name: '${name}', specsArray: ${specs}, image: ${image}, 
	time: '${time}', att_name: '${att_name}', att_hide: '${att_hide}', monthlysale: 0, quantity: 0, onsale: true}})`
	//修改
	let modifyQuery = `db.collection("shelves-list").where({_id: '${id}'})
	.update({data:{cid: '${value}', category: '${category}', name: '${name}', 
	specsArray: ${specs}, image: ${image}, time: '${time}', att_name: '${att_name}', 
	att_hide: '${att_hide}', quantity: 0, onsale: true}})`
	//对应类目下count字段自增
	let incQuery = `db.collection("dishes-category").where({cid: '${value}'}).update({data: {count: db.command.inc(1)}})`
	try{
		const res = await new getToken().postEve(queryUrl, query)
		if(res.data.length === 0) {
			await new getToken().postEve(addUrl, addQuery)
			await new getToken().postEve(updateUrl, incQuery)
			new result(ctx, '上架成功', 200).answer()
		}else {
			if(JSON.parse(res.data).onsale) {
				await new getToken().postEve(updateUrl, modifyQuery)
				new result(ctx, '修改成功', 200).answer()
			}
			else {
				await new getToken().postEve(updateUrl, updateQuery)
				await new getToken().postEve(updateUrl, incQuery)
				new result(ctx, '已重新上架', 200).answer()
			}
		}
		
	}catch(e){
		console.log(e)
		new result(ctx, '服务器发生错误', 500).answer()
	}
	
})

// 获取菜品接口
router.get('/obtaindishes', new Auth().m, async ctx => {
	let {page} = ctx.query
	let ski = page * 10
	let query = `db.collection("shelves-list").orderBy('time', 'desc').limit(10).skip(${ski}).get()`
	try{
		const res = await new getToken().postEve(queryUrl, query)
		const tatal = {tatal: res.pager.Total}
		const data = res.data.map(item => {
			return JSON.parse(item)
		})
		const obj = {...{result: data}, ...tatal}
		new result(ctx, 'SUCCESS', 200, obj).answer()
	}catch(e){
		console.log(e)
		new result(ctx, '服务器发生错误', 500).answer()
	}
	
})
//下架商品接口
router.get('/fromsale', new Auth().m, async ctx => {
	const {id, value} = ctx.query
	const query = `db.collection("shelves-list").doc('${id}').update({data: {onsale: false}})`
	// 对应类目count字段自减
	const incQuery = `db.collection("dishes-category").where({cid: '${value}'}).update({data: {count: db.command.inc(-1)}})`
	try{
		await new getToken().postEve(updateUrl, query)
		await new getToken().postEve(updateUrl, incQuery)
		new result(ctx, '下架成功', 200).answer()
	}catch(e){
		console.log(e)
		new result(ctx, '服务器发生错误', 500).answer()
	}
})
module.exports = router.routes()