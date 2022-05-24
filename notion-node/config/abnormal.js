// 自定义全局异常处理

const errorChild = require('./handle.js');

const abnormal = async(ctx, next) => {
	try{
		await next() //等待到下一步
	}catch(err){
		console.log(err);
		const isResult = err instanceof errorChild;
		if(isResult) {
			// 是已知错误
			ctx.body = {
				msg: err.msg
			}
			ctx.status = err.code
		}
		else {
			// 未知错误
			ctx.body = {
				msg: '服务器发生错误'
			}
			ctx.status = 500
		}
	}
}



module.exports = abnormal;