//公共参数校验文件
const errorChild = require('./handle.js')
class checking {
	constructor(ctx, ...obj) {
	    this.ctx = ctx
		this.obj = obj
		// console.log("校验的属性：", obj)
	}
	// 前端传来的值是否为undefined
	udfErr() {
		let res = this.obj.indexOf(undefined)
		if(res != -1) {
			throw new errorChild('参数填写错误', 400);
		}
	}
	// 校验手机号
	phoneErr(errText, index) {
		let reg = /^1[3456789]\d{9}$/
		if(!reg.test(this.obj[index])) {
			throw new errorChild(errText, 202)
		}
	}
	// 校验密码
	pwdErr(errText, index) {
		let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
		if(!reg.test(this.obj[index])) {
			throw new errorChild(errText, 202)
		}
	}
	//校验空数组
	emptyArr(errText, index) {
		if(JSON.parse(this.obj[index]).length == 0) {
			throw new errorChild(errText, 202)
		}
	}
	// 校验空值
	emptyErr(errText, index) {
		if(this.obj[index] == '') {
			throw new errorChild(errText, 202);
		}
		
	}
	//校验空格
	spaceErr(errText, index) {
		if(this.obj[index].substr(0, 1) == ' ') {
			
			throw new errorChild(errText, 202)
		}
	}
	//校验上架商品时的规格属性
	atrEmpErr() {
		// if(this.obj[2].length == 0) {
		// 	throw new errorChild('商品规格不能为空', 202)
		// }
		let isTrue = JSON.parse(this.obj[5])
		function objEmpCheck(Obj) {
			for(var key in Obj) {
				if(key === 'attribute' && Obj[key] === '' && isTrue) {
					throw new errorChild('口味名不能为空', 202)
				}
				if(key === 'attribute' && Obj[key].substr(0, 1) == ' ' && isTrue) {
					throw new errorChild('口味名不能以空格开头', 202)
				}
				if(key === 'unitprice' && Obj[key] === '') {
					throw new errorChild('价格不能为空', 202)
				}
				if(key === 'unit' && Obj[key] === '') {
					throw new errorChild('单位名不能为空', 202)
				}
			}
		}
		if(isTrue) {
			if(this.obj[4] === '') {
				throw new errorChild('属性名不能为空', 202)
			}
			if(this.obj[4].substr(0, 1) == ' ') {
				throw new errorChild('属性名不能以空格开头', 202)
			}
		} 
		this.obj[2].forEach((item) => {
			objEmpCheck(item)
		})
	}
	
	
}
//注册校验
class regCheck extends checking {
		toCheck() {
			super.udfErr();
			super.phoneErr('手机号填写错误', 0);
			super.pwdErr('请输入6-20位数字，字母组成的密码', 1)
		}
		
	}

// 商家信息上传校验
class shopInfoCheck extends checking {
	toCheck() {
		super.udfErr();
		super.emptyErr('店铺名称不能为空', 0)
		super.spaceErr('店铺名称不能以空格开头', 0)
		super.emptyErr('店铺地址不能为空', 1)
		super.spaceErr('店铺地址不能以空格开头', 1)
		super.emptyArr('店铺logo不能为空', 2)
	}
}

// 类目上传校验
class categoryCheck extends checking {
	toCheck() {
		super.udfErr()
		super.emptyErr('类目名称不能为空', 0)
		super.spaceErr('类目名称不能以空格开头', 0)
	}
}

// 菜品单位校验
class dishUnitCheck extends checking {
	toCheck() {
		super.udfErr()
		super.emptyErr('单位名称不能为空', 0)
		super.spaceErr('单位名称不能以空格开头', 0)
	}
}

// 上架商品校验
class putOnCheck extends checking {
	toCheck() {
		super.udfErr()
		super.emptyErr('商品类目不能为空', 0)
		super.spaceErr('商品类目不能以空格开头', 0)
		super.emptyErr('商品名称不能为空', 1)
		super.spaceErr('商品名称不能以空格开头', 1)
		super.atrEmpErr()
		super.emptyArr('商品Logo不能为空', 3)
	}
}
// 添加桌号校验
class tableCheck extends checking {
	toCheck() {
		super.udfErr()
		super.emptyErr('桌号不能为空', 0)
		super.spaceErr('桌号不能以空格开头', 0)
	}
}
module.exports = {regCheck, shopInfoCheck, categoryCheck, dishUnitCheck, putOnCheck, tableCheck}