/* 注册 登录 */
const router = require('koa-router')()
// 引入给前端返回统一格式的文件
const result = require('../../config/res_result.js')
const {getToken, addUrl, queryUrl} = require('../../config/database_api.js')
//校验前端传输数据
const {regCheck} = require('../../config/checking.js')
// 生成token方法
const {createToken} = require('../../token/jwt.js')
// 获取验证前端传来的token的合法性
const {Auth} = require('../../token/auth.js')


// 注册接口
router.post('/register', async (ctx) => {
	console.log('注册接口被访问');
	// new result(ctx).answer();
	let {account, password} = ctx.request.body;
	// 校验注册输入数据
	new regCheck(ctx, account, password).toCheck();
	// 校验手机号是否已注册
	let query = `db.collection("merchant-list").where({account: '${account}'}).get()`
	try{
		const userContent = await new getToken().postEve(queryUrl, query)
		if (userContent.data.length > 0) {
			// 已注册
			new result(ctx, '手机号已注册', 202).answer()
		}else {
			// account password uid 
			const uid = JSON.stringify(new Date().getTime())
			const obj = {account, password, uid}
			const userObj = JSON.stringify(obj)
			let addQuery = `db.collection('merchant-list').add({data: ${userObj}})`
			await new getToken().postEve(addUrl, addQuery);
			new result(ctx, '注册成功', 200).answer();
		}
	}catch(e){
		 new result(ctx, '注册失败，服务器发生错误', 500).answer()
	}
	
	
})

// 登录接口
router.post('/login', async (ctx) => {
	console.log('登录接口被访问');
	let {account, password} = ctx.request.body;
	let query = `db.collection("merchant-list").where({account: '${account}', password: '${password}'}).get()`
	let userInfo = await new getToken().postEve(queryUrl, query)
	let token = ''
	try{
		if(userInfo.data.length == 0) {
			new result(ctx, '登录失败，请输入正确的账号或密码', 202).answer()
		}
		else {
			console.log(JSON.parse(userInfo.data))
			token = createToken(JSON.parse(userInfo.data).uid)
			console.log("生成token:", token)
			new result(ctx, '登录成功', 200, {'token': token}).answer()
		}
	}catch(e){
		//TODO handle the exception
		new result(ctx, '服务器发生错误', 500).answer()
	}
})

router.get('/test', new Auth().m, async ctx => {
	console.log("auth类的中间件已成功执行")
})
// 暴露给接口文件
module.exports = router.routes();
