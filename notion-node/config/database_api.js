const axios = require('axios')
const qs = require('querystring')//此模块nodeJs自带无需下载
const errorChild = require('./handle.js')

// 拼接token地址
let param = qs.stringify({
	grant_type: 'client_credential',
	appid: 'wx1b4c6568533bdfa0',
	secret: '54c7703dd99d6dd7a6b990bc345a9a26'
})


// 获取token地址：得到token才有权限操作云开发数据库
let url = 'https://api.weixin.qq.com/cgi-bin/token?' + param
// 云环境ID
let env = 'notion-code-7gz3u668b0a47416'
// 数据库插入记录url
let addUrl = 'https://api.weixin.qq.com/tcb/databaseadd?access_token='
// 数据库查询记录url
let queryUrl = 'https://api.weixin.qq.com/tcb/databasequery?access_token='
//数据库更新记录url
let updateUrl = 'https://api.weixin.qq.com/tcb/databaseupdate?access_token='
// 订阅消息url
let subscribeUrl = 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token='
// 生成小程序码url
let createQrUrl = 'https://api.weixin.qq.com/wxa/getwxacode?access_token='

class getToken{
	constructor() {}
	async gettoken() {
		try{
			let token = await axios.get(url)
			if(token.status == 200) {
				return token.data.access_token;
			}
			else {
				throw '获取token错误';
			}
		}catch(e){
			throw new errorChild(e, 500);
		}
	}
	
	//调用云开发http api接口
	 async postEve(dataUrl, query) {
		 try{
		 	let token = await this.gettoken();
			let data = await axios.post(dataUrl + token, {env,query});
			if(data.data.errcode == 0) {
				return data.data
			}else {
				throw '请求错误';
			}
		 }catch(e){
		 	throw new errorChild(e, 500);
		 }
	 }
	 // 订阅消息
	 async subscribe(touser, data) {
		 try{
		 	let token = await this.gettoken();
			let Obj = {
					touser, //接收者（用户）的 openid
					template_id: 'h36MiW4ZBuZ-yy9wLRdqehnsz7h3IZcnx7nah4vzs7Y', //所需下发的订阅模板id
					page: 'pages/myOrder/myOrder' ,//点击模板卡片后的跳转页面
					data,//模板内容
					miniprogram_state:  'developer', //跳转小程序类型 developer为开发版
				}
			let colldata = await axios.post(subscribeUrl + token, Obj)
			// console.log("colldata: ", colldata)
		 }catch(e){
		 	console.log(e)
			throw new errorChild(e, 500);
		 }
	 }
	 // 生成小程序码
	 async createQRCode(num) {
		 let Obj = JSON.stringify({path: 'pages/index/index?number=' + num})
		 try{
		 	let token = await this.gettoken();
			let codeData = await axios.post(createQrUrl + token, Obj, {responseType: 'arraybuffer'})
			return codeData
		 }catch(e){
		 	console.log(e)
		 	throw new errorChild(e, 500);
		 }
	 }
}

module.exports = {getToken, addUrl, queryUrl, updateUrl, subscribeUrl, createQrUrl};