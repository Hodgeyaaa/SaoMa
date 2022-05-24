const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
const {security} = require('./tokenInfo.js')
// const result = require('../config/res_result.js')
const errorChild = require('../config/handle.js')

class Auth{
	constructor() {
	    
	}
	
	//取值函数get，存值函数set
	get m() {//中间件
		return async (ctx, next) => {
			const token = basicAuth(ctx.req)//在header中传来的数据就在ctx.req中
			if(!token || !token.name) {
				throw new errorChild('没有权限访问', 401)
			}
			// 有token，验证合法性
			try{
				var authCode = jwt.verify(token.name, security.secretkey)
				// console.log(authCode)
			}catch(e){
				if(e.name === 'TokenExpiredError') {
					throw new errorChild({
						msg: '账号已过期，请重新登录',
						errCode: 401
					}, 401)
				}else {
					throw new errorChild({
						msg: '没有权限访问',
						errCode: 401
					}, 401)
				}
			}
			ctx.auth = {
				uid: authCode.uid
			}
			await next()
		}
	}
}

module.exports = {Auth}